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
        this.playerSpeed = 0.004;
        this.playerT = 0;
        this.animationState = PlayerAnimationState.NotStarted;
        this.pickupsCollected = 0;
        //player dieing
        this.playing = true;
        this.playerDead = false;
        this._playerDiedAnimStarted = false;
        this._playerDiedAnimDone = false;
        this.playerDiedT = 0;
        this.endScreenOpened = false;
        this.moveLeftRight = 0;
        // lane tween
        this.inLaneTween = false;
        this.inLaneTweenLeft = false;
        this.inLaneTweenRight = false;
        this.laneTweenInterpolation = 0;
        this.laneSwitchSpeed = 0.001;
        // collision
        this.firstFrame = true;
        this._walkSoundRepeatTime = 200;
        this._walkSoundRepeatTimer = 0;
        // frame time correction 24/30
        this.ftc = 0.8;
        //prevent to much recursion
        this.MAX_RECURSIONS = 3;
        this.recursions = 0;
        this.roadManager = roadManager;
        this.gameUI = gameUI;
        this._scene = scene;
        this.player = ECSengine.createEntity();
        this.playerTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.0013, 0.0013, 0.0013), new BABYLON.Quaternion(0, 1, 0, 0));
        this.player.addComponent(this.playerTranslateComponent);
        this.playerMeshComponent = new ECS.ComponentAbstractMesh(this.playerTranslateComponent, "assets/models/", "Explorer_Rig_AllAnimations.babylon");
        this.player.addComponent(this.playerMeshComponent);
        this.audio = audioManager;
        // setup collision
        var mesh = BABYLON.Mesh.CreateBox("CollBox", 0.2, this._scene, false);
        mesh.scaling = new BABYLON.Vector3(1, 2, 1);
        this.playerMeshComponent.setColliderOffset = new BABYLON.Vector3(0, 0.25, 0);
        this.playerMeshComponent.setCollision(mesh);
        this.jumpManager = new ComponentJumpCurve();
        //playerTranslateComponent.setScale = new BABYLON.Vector3(0.1, 0.1, 0.1);
        console.log(this.playerTranslateComponent.getPosition);
        console.log("componentPosition instance type:" + this.playerTranslateComponent.componentType());
        this.currentLane = this.roadManager.getStartLane;
        this.previousLane = this.roadManager.getStartLane;
        this.abstractMeshComponetType = new ECS.ComponentAbstractMesh(null, null, null).componentType();
    }
    /**
     * Sets the players speed
     * @param playerSpeed the new speed of the player.
     */
    PlayerManager.prototype.setPlaying = function (state) {
        this.playing = state;
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
        if (this.touchEnd.y - this.touchStart.y < -screen.height * 0.2 && this.jumpManager.jumping == false && this.playing) {
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
            case 65: //'Left'
            case 37:
                this.movePlayerLeft();
                break;
            case 68: //'Right'
            case 39:
                this.movePlayerRight();
                break;
            case 38: //'Jump'
            case 32: //'Jump'
            case 87:
                if (this.jumpManager.jumping == false && this.playing) {
                    this.jumpManager.jump(this.playerT);
                    this.audio.playSound(Sounds.Jump);
                }
                //case 82:
                //throw 0;
                break;
        }
    };
    PlayerManager.prototype.movePlayerLeft = function () {
        if (this.currentLane.getLeftLaneAvalable && this.playing) {
            if (!this.inLaneTween) {
                this.previousLane = this.currentLane;
                this.currentLane = this.currentLane.getLeftLane;
                this.inLaneTweenLeft = true;
                this.startPlayerLaneTween();
                this.moveLeftRight = 0;
            }
            else {
                this.moveLeftRight = -1;
            }
        }
    };
    PlayerManager.prototype.movePlayerRight = function () {
        if (this.currentLane.getRightLaneAvalable && this.playing) {
            if (!this.inLaneTween) {
                this.previousLane = this.currentLane;
                this.currentLane = this.currentLane.getRightLane;
                this.inLaneTweenRight = true;
                this.startPlayerLaneTween();
                this.moveLeftRight = 0;
            }
            else {
                this.moveLeftRight = 1;
            }
        }
    };
    PlayerManager.prototype.startPlayerLaneTween = function () {
        this.inLaneTween = true;
        this.updateAnimation();
        this.laneTweenInterpolation = 0;
        this.audio.playSound(Sounds.LaneSwitch);
    };
    PlayerManager.prototype.playerFallbackAnimationTime = function () {
        return ((((420 - 360) * this.ftc) / 24) * 1000);
    };
    PlayerManager.prototype.updateDead = function (deltaTime) {
        this.playerDiedT += deltaTime;
        if (this.playerDiedT > this.playerFallbackAnimationTime() && !this._playerDiedAnimDone) {
            this._playerDiedAnimDone = true;
            this.updateAnimation();
        }
        // end screen 1.5 second after animation is done
        if (!this.endScreenOpened && this.playerDiedT > this.playerFallbackAnimationTime() + 1500) {
            //window.alert("sometext");
            this.gameUI.closeInGame();
            this.endScreenOpened = true;
            this.gameUI.openEndScreen();
        }
    };
    /**
     * updates the player
     */
    PlayerManager.prototype.update = function (deltaTime) {
        if (this.playing) {
            this.updateAudio(deltaTime);
            this.updateAnimation();
            this.updateRoadLane();
            this.updatePlayerMovment(deltaTime);
            this.updateCollision();
        }
        if (this.firstFrame) {
            this.firstFrame = false;
        }
        if (this.playerDead) {
            this.updateDead(deltaTime);
        }
    };
    PlayerManager.prototype.updateAnimation = function () {
        if (this.playerMeshComponent.meshState == ECS.MeshLoadState.Loaded) {
            if (this.playerDead && !this._playerDiedAnimStarted) {
                // play fall back animation
                this.animationState = PlayerAnimationState.FallingBack;
                this._playerDiedAnimStarted = true;
                this._scene.beginAnimation(this.playerMeshComponent.babylonMesh.skeleton, 360 * this.ftc, 420 * this.ftc, true, 1);
            }
            else {
                switch (this.animationState) {
                    case PlayerAnimationState.NotStarted:
                        // play run animation
                        this._scene.beginAnimation(this.playerMeshComponent.babylonMesh.skeleton, 0, 21 * this.ftc, true, 1.4);
                        this.animationState = PlayerAnimationState.Running;
                        break;
                    case PlayerAnimationState.Running:
                        if (this.jumpManager.jumping) {
                            // play jump animation
                            this._scene.beginAnimation(this.playerMeshComponent.babylonMesh.skeleton, 110 * this.ftc, 140 * this.ftc, true, 1);
                            this.animationState = PlayerAnimationState.Jumping;
                        }
                        else if (this.inLaneTweenLeft) {
                            // play move left animation
                            this.animationState = PlayerAnimationState.LaneSwitchL;
                            this._scene.beginAnimation(this.playerMeshComponent.babylonMesh.skeleton, 25 * this.ftc, 39 * this.ftc, true, 1.2);
                        }
                        else if (this.inLaneTweenRight) {
                            // play move right animation
                            this.animationState = PlayerAnimationState.LaneSwitchR;
                            this._scene.beginAnimation(this.playerMeshComponent.babylonMesh.skeleton, 45 * this.ftc, 57 * this.ftc, true, 1.2);
                        }
                        break;
                    case PlayerAnimationState.Jumping:
                        if (!this.jumpManager.jumping) {
                            // play run animation
                            this._scene.beginAnimation(this.playerMeshComponent.babylonMesh.skeleton, 0, 21 * this.ftc, true, 1.4);
                            this.animationState = PlayerAnimationState.Running;
                        }
                        break;
                    case PlayerAnimationState.FallingBack:
                        if (this._playerDiedAnimDone) {
                            // loop end of deat animation
                            this._scene.beginAnimation(this.playerMeshComponent.babylonMesh.skeleton, 419 * this.ftc, 420 * this.ftc, true, 1);
                        }
                        break;
                    case PlayerAnimationState.FallingBackDone:
                        break;
                    case PlayerAnimationState.LaneSwitchL:
                        if (!this.inLaneTween) {
                            // play run animation
                            this._scene.beginAnimation(this.playerMeshComponent.babylonMesh.skeleton, 0, 21 * this.ftc, true, 1.4);
                            this.animationState = PlayerAnimationState.Running;
                        }
                        break;
                    case PlayerAnimationState.LaneSwitchR:
                        if (!this.inLaneTween) {
                            // play run animation
                            this._scene.beginAnimation(this.playerMeshComponent.babylonMesh.skeleton, 0, 21 * this.ftc, true, 1.4);
                            this.animationState = PlayerAnimationState.Running;
                        }
                        break;
                    case PlayerAnimationState.Idle:
                        break;
                    default:
                        break;
                }
            }
        }
    };
    PlayerManager.prototype.updateAudio = function (deltaTime) {
        this._walkSoundRepeatTimer += deltaTime;
        if (this._walkSoundRepeatTimer > this._walkSoundRepeatTime && this.jumpManager.jumping == false) {
            this._walkSoundRepeatTimer = 0;
            this.audio.playSound(Sounds.Walk);
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
        if (!this.inLaneTween) {
            if (this.moveLeftRight < -0.5) {
                this.movePlayerLeft();
                this.moveLeftRight = 0;
            }
            else if (this.moveLeftRight > 0.5) {
                this.movePlayerRight();
                this.moveLeftRight = 0;
            }
        }
        if (this.playerSpeed != 0) {
            if (deltaTime > 0.1 && this.recursions < this.MAX_RECURSIONS) {
                this.playerT += (0.1 * this.playerSpeed);
                deltaTime -= 0.1;
                this.recursions++;
                this.updatePlayerMovment(deltaTime);
            }
            else {
                this.recursions = 0;
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
                this.inLaneTweenRight = false;
                this.inLaneTweenLeft = false;
            }
            var targetLanePosition = pos;
            var previousLanePosition = this.previousLane.getPointAtT(laneInputT);
            pos = BABYLON.Vector3.Lerp(previousLanePosition, targetLanePosition, this.laneTweenInterpolation);
        }
        // jumping
        if (this.jumpManager.jumping) {
            if (this.jumpManager.getPointAtT(this.playerT, 1.5, deltaTime).y < 0) {
                this.jumpManager.jumping = false;
                this.audio.playSound(Sounds.JumpLand);
            }
            else {
                pos = pos.add(this.jumpManager.getPointAtT(this.playerT, 1.5, deltaTime));
            }
        }
        this.playerTranslateComponent.setPosition = pos;
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
                                    case CollisionMeshType.pillar:
                                    case CollisionMeshType.spike:
                                        this.audio.playSound(Sounds.Stop);
                                        var deathPos = new BABYLON.Vector3(this.getplayerPosition().x, this.getplayerPosition().y, this.roadManager.sceneObjects[i].meshCollider.position.z - 0.2);
                                        this.playerTranslateComponent.setPosition = deathPos;
                                        this.playing = false;
                                        this.playerDead = true;
                                        this.updateAnimation();
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
    PlayerAnimationState[PlayerAnimationState["FallingBack"] = 5] = "FallingBack";
    PlayerAnimationState[PlayerAnimationState["FallingBackDone"] = 6] = "FallingBackDone";
    PlayerAnimationState[PlayerAnimationState["FallingForward"] = 7] = "FallingForward";
    PlayerAnimationState[PlayerAnimationState["FallingForwardDone"] = 8] = "FallingForwardDone";
    PlayerAnimationState[PlayerAnimationState["LaneSwitchL"] = 9] = "LaneSwitchL";
    PlayerAnimationState[PlayerAnimationState["LaneSwitchR"] = 10] = "LaneSwitchR";
})(PlayerAnimationState || (PlayerAnimationState = {}));
//# sourceMappingURL=playerManager.js.map