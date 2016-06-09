/**
 * PlayerManager
 */
var PlayerManager = (function () {
    /**
     * @param scene the scene which contains the player
     * @param the games entity component system
     * @param the games RoadManager
     * @param the games AudioManager
     * @param gameUI the games ui
     */
    function PlayerManager(scene, ECSengine, roadManager, audioManager, gameUI) {
        this.playerSpeed = 0.006;
        this.playerT = 0;
        this.animationState = PlayerAnimationState.NotStarted;
        this.pickupsCollected = 0;
        // lane tween
        this.inLaneTween = false;
        this.laneTweenInterpolation = 0;
        this.laneSwitchSpeed = 0.01;
        // collision
        this.firstFrame = true;
        // frame time correction 24/30
        this.ftc = 0.8;
        this.roadManager = roadManager;
        this.gameUI = gameUI;
        this._scene = scene;
        this.player = ECSengine.createEntity();
        this.playerTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.0013, 0.0013, 0.0013), new BABYLON.Quaternion(0, 1, 0, 0));
        this.player.addComponent(this.playerTranslateComponent);
        this.playerMeshComponent = new ECS.ComponentAbstractMesh(this.playerTranslateComponent, "assets/models/", "Explorer_Rig_AllAnimations.babylon");
        this.player.addComponent(this.playerMeshComponent);
        this.audio = audioManager;
        this.playing = true;
        // setup collision
        var mesh = BABYLON.Mesh.CreateBox("CollBox", 0.2, this._scene, false);
        mesh.scaling = new BABYLON.Vector3(1, 2, 1);
        this.playerMeshComponent.setColliderOffset = new BABYLON.Vector3(0, 0.25, 0);
        this.playerMeshComponent.setCollision(mesh);
        this.jumpManager = new ComponentJumpLane(this.playerMeshComponent, BABYLON.Vector3.Zero(), this._scene, this.playerT);
        //playerTranslateComponent.setScale = new BABYLON.Vector3(0.1, 0.1, 0.1);
        console.log(this.playerTranslateComponent.getPosition);
        console.log("componentPosition instance type:" + this.playerTranslateComponent.componentType());
        this.currentLane = this.roadManager.getStartLane;
        this.previousLane = this.roadManager.getStartLane;
        this.abstractMeshComponetType = new ECS.ComponentAbstractMesh(null, null, null).componentType();
    }
    /**
     * starts the player forwared movement by setting its speed
     */
    PlayerManager.prototype.startRunning = function () {
        this.playerSpeed = 0.006;
    };
    /**
     * Returns the players interpontation(t or dictance in game).
     * @returns players distance in the game
     */
    PlayerManager.prototype.getplayerT = function () {
        return this.playerT;
    };
    /**
     * Sets the players interpontation(t or dictance in game).
     * @param T T to be set
     */
    PlayerManager.prototype.setplayerT = function (T) {
        this.playerT = T;
    };
    /**
     * returns the amout of pickups collected
     * @returns the amount of pickups collected
     */
    PlayerManager.prototype.getPickupsCollected = function () {
        return this.pickupsCollected;
    };
    /**
     * Returns the players position
     * @returns players position
     */
    PlayerManager.prototype.getplayerPosition = function () {
        return this.playerTranslateComponent.getPosition;
    };
    /**
     * get touch start position
     */
    PlayerManager.prototype.onTouchStart = function (touchEvt) {
        this.playerMovedCurrentTouch = false;
        this.touchStart = new BABYLON.Vector2(touchEvt.touches[0].screenX, touchEvt.touches[0].screenY);
    };
    PlayerManager.prototype.onTouchEnd = function (touchEvt) {
    };
    // TODO : if swipe > screen.width*0.5 move 2 lanes? 
    /**
     * check for swipe
     */
    PlayerManager.prototype.onTouchMove = function (touchEvt) {
        this.touchEnd = new BABYLON.Vector2(touchEvt.touches[0].screenX, touchEvt.touches[0].screenY);
        //swipe right
        if (this.touchEnd.x - this.touchStart.x > screen.width * 0.1 && this.currentLane.getRightLaneAvalable && !this.playerMovedCurrentTouch) {
            this.movePlayerRight();
            this.playerMovedCurrentTouch = true;
        }
        //swipe left
        if (this.touchEnd.x - this.touchStart.x < -screen.width * 0.1 && this.currentLane.getLeftLaneAvalable && !this.playerMovedCurrentTouch) {
            this.movePlayerLeft();
            this.playerMovedCurrentTouch = true;
        }
        //swipe up
        if (this.touchEnd.y - this.touchStart.y < -screen.height * 0.2 && this.jumpManager.jumping == false && this.playing == true) {
            this.jumpManager.jump(this.playerT);
            this.audio.playSound(Sounds.Jump);
        }
    };
    /**
     * pass the key down event on to the player
     * @param keyEvent the key down event
     */
    PlayerManager.prototype.onKeyDown = function (keyEvent) {
        switch (keyEvent.keyCode) {
            case 37:
                this.movePlayerLeft();
                break;
            case 39:
                this.movePlayerRight();
                break;
            case 32:
                if (this.jumpManager.jumping == false && this.playing == true) {
                    this.jumpManager.jump(this.playerT);
                    this.audio.playSound(Sounds.Jump);
                }
                break;
        }
    };
    PlayerManager.prototype.movePlayerLeft = function () {
        if (this.currentLane.getLeftLaneAvalable && !this.inLaneTween) {
            this.previousLane = this.currentLane;
            this.currentLane = this.currentLane.getLeftLane;
            this.startPlayerLaneTween();
        }
    };
    PlayerManager.prototype.movePlayerRight = function () {
        if (this.currentLane.getRightLaneAvalable && !this.inLaneTween) {
            this.previousLane = this.currentLane;
            this.currentLane = this.currentLane.getRightLane;
            this.startPlayerLaneTween();
        }
    };
    PlayerManager.prototype.startPlayerLaneTween = function () {
        this.inLaneTween = true;
        this.laneTweenInterpolation = 0;
        this.audio.playSound(Sounds.LaneSwitch);
    };
    /**
     * updates the player
     */
    PlayerManager.prototype.update = function (deltaTime) {
        if (this.playing == true) {
            //console.log("updatePLayer");
            this.updateAnimation();
            this.updateRoadLane();
            this.updatePlayerMovment(deltaTime);
        }
        // this.updateCollision();
        if (this.firstFrame) {
            this.firstFrame = false;
        }
    };
    PlayerManager.prototype.updateAnimation = function () {
        if (this.playerMeshComponent.meshState == ECS.MeshLoadState.Loaded) {
            switch (this.animationState) {
                case PlayerAnimationState.NotStarted:
                    this._scene.beginAnimation(this.playerMeshComponent.babylonMesh.skeleton, 0, 21 * this.ftc, true, 1.4);
                    this.animationState = PlayerAnimationState.Running;
                    break;
                case PlayerAnimationState.Running:
                    if (this.jumpManager.jumping) {
                        this._scene.beginAnimation(this.playerMeshComponent.babylonMesh.skeleton, 80 * this.ftc, 110 * this.ftc, true, 1);
                        this.animationState = PlayerAnimationState.Jumping;
                    }
                    break;
                case PlayerAnimationState.Jumping:
                    if (!this.jumpManager.jumping) {
                        this._scene.beginAnimation(this.playerMeshComponent.babylonMesh.skeleton, 0 * this.ftc, 21 * this.ftc, true, 1.4);
                        this.animationState = PlayerAnimationState.Running;
                    }
                    break;
                default:
                    break;
            }
        }
    };
    PlayerManager.prototype.updateRoadLane = function () {
        // set next lane if at end of current lane
        if (this.playerT > this.currentLane.getEndT()) {
            this.currentLane = this.currentLane.getNextLane;
            this.previousLane = this.previousLane.getNextLane;
        }
    };
    /**
     * updats the movement of the player
     * @param deltaTime time delta this update and previous update
     */
    PlayerManager.prototype.updatePlayerMovment = function (deltaTime) {
        if (this.playerSpeed != 0) {
            if (deltaTime > 100) {
                this.playerT += (100 * this.playerSpeed);
                deltaTime -= 100;
                this.updatePlayerMovment(deltaTime);
            }
            else {
                this.playerT += (deltaTime * this.playerSpeed);
            }
        }
        var laneInputT = (this.playerT - this.currentLane.getStartT) / this.currentLane.getLaneLength();
        var pos = this.currentLane.getPointAtT(laneInputT);
        // lane switch interpolation
        if (this.inLaneTween) {
            this.laneTweenInterpolation += deltaTime * this.laneSwitchSpeed;
            if (this.laneTweenInterpolation > 1) {
                this.laneTweenInterpolation = 1;
                this.inLaneTween = false;
            }
            var targetLanePosition = pos;
            var previousLanePosition = this.previousLane.getPointAtT(laneInputT);
            pos = BABYLON.Vector3.Lerp(previousLanePosition, targetLanePosition, this.laneTweenInterpolation);
        }
        // jumping
        if (this.jumpManager.jumping) {
            var jumpInputT = (this.playerT - this.jumpManager.getT()) / (this.jumpManager.getLaneLength() / 2.5);
            if (jumpInputT > 1) {
                this.jumpManager.jumping = false;
                this.audio.playSound(Sounds.JumpLand);
            }
            pos = pos.add(this.jumpManager.getPointAtT(jumpInputT));
        }
        this.playerTranslateComponent.setPosition = pos;
        this.updateCollision();
    };
    PlayerManager.prototype.updateCollision = function () {
        this.playerMeshComponent.updateCollision();
        if (!this.firstFrame) {
            for (var i = 0; i < this.roadManager.sceneObjects.length; i++) {
                if (this.roadManager.sceneObjects[i].hasCollider) {
                    var meshLoaded = (this.roadManager.sceneObjects[i].entity.getComponent(this.abstractMeshComponetType).meshState == ECS.MeshLoadState.Loaded);
                    if (meshLoaded) {
                        if (this.roadManager.sceneObjects[i] != null) {
                            var coll = this.playerMeshComponent.getCollider.intersectsMesh(this.roadManager.sceneObjects[i].meshCollider);
                            if (coll) {
                                switch (this.roadManager.sceneObjects[i].meshType) {
                                    case CollisionMeshType.pillar || CollisionMeshType.spike:
                                        this.audio.playSound(Sounds.Stop);
                                        this.gameUI.closeInGame();
                                        this.gameUI.openEndScreen();
                                        this.playing = false;
                                        break;
                                    case CollisionMeshType.scarab:
                                        this.audio.playSound(Sounds.Pickup);
                                        this.pickupsCollected++;
                                        this.roadManager.sceneObjects[i].entity.destroy();
                                        this.roadManager.sceneObjects.splice(i, 1);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    return PlayerManager;
}());
var PlayerAnimationState;
(function (PlayerAnimationState) {
    PlayerAnimationState[PlayerAnimationState["NotStarted"] = 0] = "NotStarted";
    PlayerAnimationState[PlayerAnimationState["Running"] = 1] = "Running";
    PlayerAnimationState[PlayerAnimationState["Sliding"] = 2] = "Sliding";
    PlayerAnimationState[PlayerAnimationState["Jumping"] = 3] = "Jumping";
    PlayerAnimationState[PlayerAnimationState["Idle"] = 4] = "Idle";
    PlayerAnimationState[PlayerAnimationState["Falling"] = 5] = "Falling";
})(PlayerAnimationState || (PlayerAnimationState = {}));
//# sourceMappingURL=playerManager.js.map