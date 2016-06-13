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
    function PlayerManager(gameBase, scene, ECSengine, roadManager, audioManager, gameUI) {
        this._playerSpeed = 0.004;
        this._playerT = 0;
        this._animationState = PlayerAnimationState.NotStarted;
        this._pickupsCollected = 0;
        //player dieing
        this._playing = true;
        this._playerDead = false;
        this._playerDiedAnimStarted = false;
        this._playerDiedAnimDone = false;
        this._playerDiedT = 0;
        this._endScreenOpened = false;
        this._moveLeftRight = 0;
        // lane tween
        this._inLaneTween = false;
        this._inLaneTweenLeft = false;
        this._inLaneTweenRight = false;
        this._laneTweenInterpolation = 0;
        this._laneSwitchSpeed = 0.002;
        // collision
        this._firstFrame = true;
        this._walkSoundRepeatTime = 200;
        this._walkSoundRepeatTimer = 0;
        // frame time correction 24/30
        this.ftc = 0.8;
        //prevent to much recursion
        this.MAX_RECURSIONS = 3;
        this.recursions = 0;
        this._gameBase = gameBase;
        this._roadManager = roadManager;
        this._gameUI = gameUI;
        this._scene = scene;
        this._player = ECSengine.createEntity();
        this._playerTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.0013, 0.0013, 0.0013), new BABYLON.Quaternion(0, 1, 0, 0));
        this._player.addComponent(this._playerTranslateComponent);
        this._playerMeshComponent = new ECS.ComponentAbstractMesh(this._playerTranslateComponent, "assets/models/", "Explorer_Rig_AllAnimations.babylon");
        this._player.addComponent(this._playerMeshComponent);
        this._audio = audioManager;
        // setup collision
        var mesh = BABYLON.Mesh.CreateBox("CollBox", 0.2, this._scene, false);
        mesh.scaling = new BABYLON.Vector3(1, 2, 1);
        this._playerMeshComponent.setColliderOffset = new BABYLON.Vector3(0, 0.25, 0);
        this._playerMeshComponent.setCollision(mesh);
        this._jumpManager = new ComponentJumpCurve();
        //playerTranslateComponent.setScale = new BABYLON.Vector3(0.1, 0.1, 0.1);
        console.log(this._playerTranslateComponent.getPosition);
        console.log("componentPosition instance type:" + this._playerTranslateComponent.componentType());
        this._currentLane = this._roadManager.getStartLane;
        this._previousLane = this._roadManager.getStartLane;
        this._abstractMeshComponetType = new ECS.ComponentAbstractMesh(null, null, null).componentType();
    }
    /**
     * Sets the players speed
     * @param playerSpeed the new speed of the player.
     */
    PlayerManager.prototype.setPlaying = function (state) {
        this._playing = state;
    };
    /**
     * Returns the players interpontation(t or dictance in game).
     * @returns players distance in the game
     */
    PlayerManager.prototype.getplayerT = function () {
        return this._playerT;
    };
    /**
     * Sets the players interpontation(t or dictance in game).
     * @param T T to be set
     */
    PlayerManager.prototype.setplayerT = function (T) {
        this._playerT = T;
    };
    /**
     * returns the amout of pickups collected
     * @returns the amount of pickups collected
     */
    PlayerManager.prototype.getPickupsCollected = function () {
        return this._pickupsCollected;
    };
    /**
     * Returns the players position
     * @returns players position
     */
    PlayerManager.prototype.getplayerPosition = function () {
        return this._playerTranslateComponent.getPosition;
    };
    /**
     * get touch start position
     */
    PlayerManager.prototype.onTouchStart = function (touchEvt) {
        this._playerMovedCurrentTouch = false;
        this._touchStart = new BABYLON.Vector2(touchEvt.touches[0].screenX, touchEvt.touches[0].screenY);
    };
    PlayerManager.prototype.onTouchEnd = function (touchEvt) {
    };
    /**
     * check for swipe
     */
    PlayerManager.prototype.onTouchMove = function (touchEvt) {
        this._touchEnd = new BABYLON.Vector2(touchEvt.touches[0].screenX, touchEvt.touches[0].screenY);
        //swipe right
        if (this._touchEnd.x - this._touchStart.x > screen.width * 0.1 && this._currentLane.getRightLaneAvalable && !this._playerMovedCurrentTouch) {
            this.movePlayerRight();
            this._playerMovedCurrentTouch = true;
        }
        //swipe left
        if (this._touchEnd.x - this._touchStart.x < -screen.width * 0.1 && this._currentLane.getLeftLaneAvalable && !this._playerMovedCurrentTouch) {
            this.movePlayerLeft();
            this._playerMovedCurrentTouch = true;
        }
        //swipe up
        if (this._touchEnd.y - this._touchStart.y < -screen.height * 0.2 && this._jumpManager.jumping == false && this._playing) {
            this._jumpManager.jump(this._playerT);
            this._audio.playSound(Sounds.Jump);
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
                if (this._jumpManager.jumping == false && this._playing) {
                    this._jumpManager.jump(this._playerT);
                    this._audio.playSound(Sounds.Jump);
                }
                //case 82:
                //throw 0;
                break;
        }
    };
    PlayerManager.prototype.movePlayerLeft = function () {
        if (this._currentLane.getLeftLaneAvalable && this._playing) {
            if (!this._inLaneTween) {
                this._previousLane = this._currentLane;
                this._currentLane = this._currentLane.getLeftLane;
                this._inLaneTweenLeft = true;
                this.startPlayerLaneTween();
                this._moveLeftRight = 0;
            }
            else {
                this._moveLeftRight = -1;
            }
        }
    };
    PlayerManager.prototype.movePlayerRight = function () {
        if (this._currentLane.getRightLaneAvalable && this._playing) {
            if (!this._inLaneTween) {
                this._previousLane = this._currentLane;
                this._currentLane = this._currentLane.getRightLane;
                this._inLaneTweenRight = true;
                this.startPlayerLaneTween();
                this._moveLeftRight = 0;
            }
            else {
                this._moveLeftRight = 1;
            }
        }
    };
    PlayerManager.prototype.startPlayerLaneTween = function () {
        this._inLaneTween = true;
        this.updateAnimation();
        this._laneTweenInterpolation = 0;
        this._audio.playSound(Sounds.LaneSwitch);
    };
    PlayerManager.prototype.playerFallbackAnimationTime = function () {
        return ((((420 - 360) * this.ftc) / 24) * 1000);
    };
    PlayerManager.prototype.updateDead = function (deltaTime) {
        this._playerDiedT += deltaTime;
        if (this._playerDiedT > this.playerFallbackAnimationTime() && !this._playerDiedAnimDone) {
            this._playerDiedAnimDone = true;
            this.updateAnimation();
        }
        // end screen 1.5 second after animation is done
        if (!this._endScreenOpened && this._playerDiedT > this.playerFallbackAnimationTime() + 1500) {
            //window.alert("sometext");
            this._gameUI.closeInGame();
            this._endScreenOpened = true;
            this._gameUI.openEndScreen();
        }
    };
    /**
     * updates the player
     */
    PlayerManager.prototype.update = function (deltaTime) {
        if (this._playing) {
            this.updateAudio(deltaTime);
            this.updateAnimation();
            this.updateRoadLane();
            this.updatePlayerMovment(deltaTime);
            this.updateCollision();
        }
        if (this._firstFrame) {
            this._firstFrame = false;
        }
        if (this._playerDead) {
            this.updateDead(deltaTime);
        }
    };
    PlayerManager.prototype.updateAnimation = function () {
        if (this._playerMeshComponent.meshState == ECS.MeshLoadState.Loaded) {
            if (this._playerDead && !this._playerDiedAnimStarted) {
                // play fall back animation
                this._animationState = PlayerAnimationState.FallingBack;
                this._playerDiedAnimStarted = true;
                this._scene.beginAnimation(this._playerMeshComponent.babylonMesh.skeleton, 360 * this.ftc, 420 * this.ftc, true, 1);
            }
            else {
                switch (this._animationState) {
                    case PlayerAnimationState.NotStarted:
                        // play run animation
                        this._scene.beginAnimation(this._playerMeshComponent.babylonMesh.skeleton, 0, 21 * this.ftc, true, 1.4);
                        this._animationState = PlayerAnimationState.Running;
                        break;
                    case PlayerAnimationState.Running:
                        if (this._jumpManager.jumping) {
                            // play jump animation
                            this._scene.beginAnimation(this._playerMeshComponent.babylonMesh.skeleton, 110 * this.ftc, 140 * this.ftc, true, 1);
                            this._animationState = PlayerAnimationState.Jumping;
                        }
                        else if (this._inLaneTweenLeft) {
                            // play move left animation
                            this._animationState = PlayerAnimationState.LaneSwitchL;
                            this._scene.beginAnimation(this._playerMeshComponent.babylonMesh.skeleton, 25 * this.ftc, 39 * this.ftc, true, 1.2);
                        }
                        else if (this._inLaneTweenRight) {
                            // play move right animation
                            this._animationState = PlayerAnimationState.LaneSwitchR;
                            this._scene.beginAnimation(this._playerMeshComponent.babylonMesh.skeleton, 45 * this.ftc, 57 * this.ftc, true, 1.2);
                        }
                        break;
                    case PlayerAnimationState.Jumping:
                        if (!this._jumpManager.jumping) {
                            // play run animation
                            this._scene.beginAnimation(this._playerMeshComponent.babylonMesh.skeleton, 0, 21 * this.ftc, true, 1.4);
                            this._animationState = PlayerAnimationState.Running;
                        }
                        break;
                    case PlayerAnimationState.FallingBack:
                        if (this._playerDiedAnimDone) {
                            // loop end of deat animation
                            this._scene.beginAnimation(this._playerMeshComponent.babylonMesh.skeleton, 419 * this.ftc, 420 * this.ftc, true, 1);
                        }
                        break;
                    case PlayerAnimationState.FallingBackDone:
                        break;
                    case PlayerAnimationState.LaneSwitchL:
                        if (!this._inLaneTween) {
                            // play run animation
                            this._scene.beginAnimation(this._playerMeshComponent.babylonMesh.skeleton, 0, 21 * this.ftc, true, 1.4);
                            this._animationState = PlayerAnimationState.Running;
                        }
                        break;
                    case PlayerAnimationState.LaneSwitchR:
                        if (!this._inLaneTween) {
                            // play run animation
                            this._scene.beginAnimation(this._playerMeshComponent.babylonMesh.skeleton, 0, 21 * this.ftc, true, 1.4);
                            this._animationState = PlayerAnimationState.Running;
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
        if (this._walkSoundRepeatTimer > this._walkSoundRepeatTime && this._jumpManager.jumping == false) {
            this._walkSoundRepeatTimer = 0;
            this._audio.playSound(Sounds.Walk);
        }
    };
    PlayerManager.prototype.updateRoadLane = function () {
        // set next lane if at end of current lane
        if (this._playerT > this._currentLane.getEndT()) {
            this._currentLane = this._currentLane.getNextLane;
            this._previousLane = this._previousLane.getNextLane;
        }
    };
    /**
     * updats the movement of the player
     * @param deltaTime time delta this update and previous update
     */
    PlayerManager.prototype.updatePlayerMovment = function (deltaTime) {
        if (!this._inLaneTween) {
            if (this._moveLeftRight < -0.5) {
                this.movePlayerLeft();
                this._moveLeftRight = 0;
            }
            else if (this._moveLeftRight > 0.5) {
                this.movePlayerRight();
                this._moveLeftRight = 0;
            }
        }
        if (this._playerSpeed != 0) {
            if (deltaTime > 0.1 && this.recursions < this.MAX_RECURSIONS) {
                this._playerT += (0.1 * this._playerSpeed);
                deltaTime -= 0.1;
                this.recursions++;
                this.updateCollision();
                this.updatePlayerMovment(deltaTime);
            }
            else {
                this.recursions = 0;
                this._playerT += (deltaTime * this._playerSpeed);
            }
        }
        var laneInputT = (this._playerT - this._currentLane.getStartT) / this._currentLane.getLaneLength();
        var pos = this._currentLane.getPointAtT(laneInputT);
        // lane switch interpolation
        if (this._inLaneTween) {
            this._laneTweenInterpolation += deltaTime * this._laneSwitchSpeed;
            if (this._laneTweenInterpolation > 1) {
                this._laneTweenInterpolation = 1;
                this._inLaneTween = false;
                this._inLaneTweenRight = false;
                this._inLaneTweenLeft = false;
            }
            var targetLanePosition = pos;
            var previousLanePosition = this._previousLane.getPointAtT(laneInputT);
            pos = BABYLON.Vector3.Lerp(previousLanePosition, targetLanePosition, this._laneTweenInterpolation);
        }
        // jumping
        if (this._jumpManager.jumping) {
            if (this._jumpManager.getPointAtT(this._playerT, 1.5, deltaTime).y < 0) {
                this._jumpManager.jumping = false;
                this._audio.playSound(Sounds.JumpLand);
            }
            else {
                pos = pos.add(this._jumpManager.getPointAtT(this._playerT, 1.5, deltaTime));
            }
        }
        this._playerTranslateComponent.setPosition = pos;
    };
    PlayerManager.prototype.updateCollision = function () {
        this._playerMeshComponent.updateCollision();
        if (!this._firstFrame) {
            for (var i = 0; i < this._roadManager.sceneObjects.length; i++) {
                if (this._roadManager.sceneObjects[i].hasCollider) {
                    var meshLoaded = (this._roadManager.sceneObjects[i].entity.getComponent(this._abstractMeshComponetType).meshState == ECS.MeshLoadState.Loaded);
                    if (meshLoaded) {
                        if (this._roadManager.sceneObjects[i] != null) {
                            var coll = this._playerMeshComponent.getCollider.intersectsMesh(this._roadManager.sceneObjects[i].meshCollider);
                            if (coll) {
                                switch (this._roadManager.sceneObjects[i].meshType) {
                                    case CollisionMeshType.pillar:
                                    case CollisionMeshType.spike:
                                        this._audio.playSound(Sounds.Stop);
                                        var deathPos = new BABYLON.Vector3(this.getplayerPosition().x, this.getplayerPosition().y, this._roadManager.sceneObjects[i].meshCollider.position.z - 0.2);
                                        this._playerTranslateComponent.setPosition = deathPos;
                                        this._gameBase.PlayerCameraManager.Shake();
                                        this._playing = false;
                                        this._playerDead = true;
                                        this.updateAnimation();
                                        break;
                                    case CollisionMeshType.scarab:
                                        this._audio.playSound(Sounds.Pickup);
                                        this._pickupsCollected++;
                                        this._roadManager.sceneObjects[i].entity.destroy();
                                        this._roadManager.sceneObjects.splice(i, 1);
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
    /**
     * destroys the player
     */
    PlayerManager.prototype.destroy = function () {
        this._player.destroy();
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