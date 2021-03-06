/**
 * PlayerManager
 * Managers the player position, animation, and collision.
 */
class PlayerManager {

    private _gameBase: GameBase;
    private _player: ECS.Entity;
    private _playerTranslateComponent: ECS.ComponentTransform;
    private _playerMeshComponent: ECS.ComponentAbstractMesh;
    private _playerSpeed: number = 0.004;
    private _playerT: number = 0;
    private _scene: BABYLON.Scene;
    private _animationState: PlayerAnimationState = PlayerAnimationState.NotStarted;
    private _roadManager: RoadManager;
    private _pickupsCollected: number = 0;
    private _jumpManager: ComponentJumpCurve;
    private _audio: audioManager;
    private _gameUI: GameUI;

    //player dieing
    private _playing: boolean = true;
    private _playerDead: boolean = false;
    private _playerDiedAnimStarted: boolean = false;
    private _playerDiedAnimDone: boolean = false;
    private _playerDiedT: number = 0;
    private _fallingBack: boolean = true;
    private _endScreenOpened = false;

    // lane
    private _previousLane: ComponentLaneBase;
    private _currentLane: ComponentLaneBase;
    private _moveLeftRight: number = 0;

    // lane tween
    private _inLaneTween: boolean = false;
    private _inLaneTweenLeft: boolean = false;
    private _inLaneTweenRight: boolean = false;
    private _laneTweenInterpolation: number = 0;
    private _laneSwitchSpeed: number = 0.002;
    private _laneTweenAnimationTime: number = 0;

    // collision
    private _firstFrame: boolean = true;

    // touch
    private _playerMovedCurrentTouch: boolean;
    private _touchStart: BABYLON.Vector2;
    private _touchEnd: BABYLON.Vector2;

    private _abstractMeshComponetType: string;

    private _walkSoundRepeatTime: number = 200;
    private _walkSoundRepeatTimer: number = 0;

    // frame time correction 24/30
    private ftc: number = 0.8;

    /**
     * @param gameBase the gameBase that has created this manager.
     * @param scene the scene which contains the player
     * @param ECSengine the games entity component system
     * @param roadManager the games RoadManager
     * @param audioManager the games AudioManager
     * @param gameUI the games ui
     */
    constructor(gameBase: GameBase, scene: BABYLON.Scene, ECSengine: ECS.Engine, roadManager: RoadManager, audioManager: audioManager, gameUI: GameUI) {
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
        let mesh: BABYLON.Mesh = BABYLON.Mesh.CreateBox("CollBox", 0.2, this._scene, false);
        mesh.scaling = new BABYLON.Vector3(1, 2, 1);
        this._playerMeshComponent.setColliderOffset = new BABYLON.Vector3(0, 0.25, 0);
        this._playerMeshComponent.setCollision(mesh);

        this._jumpManager = new ComponentJumpCurve();

        this._currentLane = this._roadManager.getStartLane;
        this._previousLane = this._roadManager.getStartLane;

        this._abstractMeshComponetType = new ECS.ComponentAbstractMesh(null, null, null).componentType();
    }

    /**
     * Sets the players play state
     * @param state the state that the game will be set in.
     */
    setPlaying(state: boolean) {
        this._playing = state;
    }

    /**
     * Returns the players interpontation(t or dictance in game).
     * @returns players distance in the game
     */
    getplayerT(): number {
        return this._playerT;
    }

    /**
     * Sets the players interpontation(t or dictance in game).
     * @param T T to be set
     */
    setplayerT(T: number): void {
        this._playerT = T;
    }

    /**
     * returns the amout of pickups collected
     * @returns the amount of pickups collected
     */
    getPickupsCollected(): number {
        return this._pickupsCollected;
    }

    /**
     * Returns the players position
     * @returns players position
     */
    getplayerPosition(): BABYLON.Vector3 {
        return this._playerTranslateComponent.getPosition;
    }

    /**
     * get touch start position
     * @param touchEvt data about the touchevent.
     */
    onTouchStart(touchEvt: TouchEvent) {
        this._playerMovedCurrentTouch = false;
        this._touchStart = new BABYLON.Vector2(touchEvt.touches[0].screenX, touchEvt.touches[0].screenY);
    }

    /**
     * get touch end position
     * @param touchEvt data about the touchevent.
     */
    onTouchEnd(touchEvt: TouchEvent) {
    }

    /**
     * get touch position when touch gets moved.
     * @param touchEvt data about the moved touchevent.
     */
    onTouchMove(touchEvt: TouchEvent) {
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
    }

    /**
     * pass the key down event on to the player
     * @param keyEvent the key down event
     */
    onKeyDown(keyEvent: KeyboardEvent): void {

        switch (keyEvent.keyCode) {
            case 65: //'Left'
            case 37: //'Left'
                this.movePlayerLeft();
                break;
            case 68: //'Right'
            case 39: //'Right'
                this.movePlayerRight();
                break;
            case 38: //'Jump'
            case 32: //'Jump'
            case 87: //'Jump'
                if (this._jumpManager.jumping == false && this._playing) {
                    this._jumpManager.jump(this._playerT);
                    this._audio.playSound(Sounds.Jump);
                }
                break;
        }
    }

    /**
     * Checks if the player can move left, and starts it.
     */
    private movePlayerLeft() {
        if (this._currentLane.getLeftLaneAvalable && this._playing) {
            if (!this._inLaneTween) {
                this._previousLane = this._currentLane;
                this._currentLane = this._currentLane.getLeftLane;
                this._inLaneTweenLeft = true;
                this.startPlayerLaneTween();
                this._moveLeftRight = 0;
            } else {
                this._moveLeftRight = -1;
            }
        }
    }

    /**
      * Checks if the player can move right, and starts it.
      */
    private movePlayerRight() {
        if (this._currentLane.getRightLaneAvalable && this._playing) {
            if (!this._inLaneTween) {
                this._previousLane = this._currentLane;
                this._currentLane = this._currentLane.getRightLane;
                this._inLaneTweenRight = true;
                this.startPlayerLaneTween();
                this._moveLeftRight = 0;
            } else {
                this._moveLeftRight = 1;
            }
        }
    }

    /**
     * moves the player between lanes.
     */
    private startPlayerLaneTween() {
        this._inLaneTween = true;
        this.updateAnimation();
        this._laneTweenInterpolation = 0;
        this._audio.playSound(Sounds.LaneSwitch);
        this._laneTweenAnimationTime = this.framesToAnimationTime(10);
    }

    /**
     * convert an amout of frames to the time it takes to play the animation at normals speed
     * @param frames number of frames you need the playback time of
     * @returns animation time at normal speed in milliseconds
     */
    private framesToAnimationTime(frames: number): number {
        return (((frames * this.ftc) / 24) * 1000);
    }

    /**
     * plays the death animation when death, and calls the endscreen.
     * @param deltaTime the deltaTime between this and last update.
     */
    private updateDead(deltaTime: number) {
        this._playerDiedT += deltaTime;
        if (this._playerDiedT > this.framesToAnimationTime(420 - 360) && !this._playerDiedAnimDone) {
            this._playerDiedAnimDone = true;
            this.updateAnimation();
        }
        // end screen 1.5 second after animation is done
        if (!this._endScreenOpened && this._playerDiedT > this.framesToAnimationTime(420 - 360) + 1500) {
            //window.alert("sometext");
            this._gameUI.closeInGame();
            this._endScreenOpened = true;
            this._gameUI.openEndScreen();
        }
    }

    /**
     * updates the player
     * @param deltaTime the deltaTime between this and last update.
     */
    update(deltaTime: number): void {
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
    }

    /**
     * Checks if an animation needs to be played, and does that if needed.
     */
    private updateAnimation() {
        if (this._playerMeshComponent.meshState == ECS.MeshLoadState.Loaded) {
            if (this._playerDead && !this._playerDiedAnimStarted) {
                if (this._fallingBack) {
                    // play fall back animation
                    this._animationState = PlayerAnimationState.FallingBack;
                    this._playerDiedAnimStarted = true;
                    this._scene.beginAnimation(this._playerMeshComponent.babylonMesh.skeleton, 360 * this.ftc, 420 * this.ftc, true, 1);
                }
                else {
                    // play fall back animation
                    this._animationState = PlayerAnimationState.FallingForward;
                    this._playerDiedAnimStarted = true;
                    this._scene.beginAnimation(this._playerMeshComponent.babylonMesh.skeleton, 280 * this.ftc, 350 * this.ftc, true, 1);
                }
            } else {
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
                        } else if (this._inLaneTweenLeft) {
                            // play move left animation
                            this._animationState = PlayerAnimationState.LaneSwitchL;
                            this._scene.beginAnimation(this._playerMeshComponent.babylonMesh.skeleton, 25 * this.ftc, 39 * this.ftc, true, 1);
                        } else if (this._inLaneTweenRight) {
                            // play move right animation
                            this._animationState = PlayerAnimationState.LaneSwitchR;
                            this._scene.beginAnimation(this._playerMeshComponent.babylonMesh.skeleton, 45 * this.ftc, 57 * this.ftc, true, 1);
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
                    case PlayerAnimationState.FallingForward:
                        if (this._playerDiedAnimDone) {
                            // loop end of deat animation
                            this._scene.beginAnimation(this._playerMeshComponent.babylonMesh.skeleton, 349 * this.ftc, 350 * this.ftc, true, 1);
                        }
                        break;
                    case PlayerAnimationState.LaneSwitchL:
                        if (!this._inLaneTween && this._laneTweenAnimationTime <= 0) {
                            // play run animation
                            this._scene.beginAnimation(this._playerMeshComponent.babylonMesh.skeleton, 0, 21 * this.ftc, true, 1.4);
                            this._animationState = PlayerAnimationState.Running;
                        }
                        break;
                    case PlayerAnimationState.LaneSwitchR:
                        if (!this._inLaneTween && this._laneTweenAnimationTime <= 0) {
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
    }

    /**
     * plays the walking sound
     * @param deltaTime the deltaTime between this and last update.
     */
    private updateAudio(deltaTime: number) {
        this._walkSoundRepeatTimer += deltaTime;
        if (this._walkSoundRepeatTimer > this._walkSoundRepeatTime && this._jumpManager.jumping == false) {
            this._walkSoundRepeatTimer = 0;
            this._audio.playSound(Sounds.Walk);
        }
    }

    /**
     * Checks if new roadparts need to be created.
     */
    private updateRoadLane() {
        // set next lane if at end of current lane
        if (this._playerT > this._currentLane.getEndT()) {
            this._currentLane = this._currentLane.getNextLane;
            this._previousLane = this._previousLane.getNextLane;
        }
    }

    //prevent to much recursion
    private MAX_RECURSIONS: number = 3;
    private recursions: number = 0;

    /**
     * updats the movement of the player
     * @param deltaTime the deltaTime between this and last update.
     */
    private updatePlayerMovment(deltaTime: number) {
        if (!this._inLaneTween) {
            if (this._moveLeftRight < -0.5) {
                this.movePlayerLeft();
                this._moveLeftRight = 0;
            } else if (this._moveLeftRight > 0.5) {
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

        let laneInputT: number = (this._playerT - this._currentLane.getStartT) / this._currentLane.getLaneLength();
        let pos: BABYLON.Vector3 = this._currentLane.getPointAtT(laneInputT);

        // lane switch interpolation
        if (this._inLaneTween) {
            this._laneTweenInterpolation += deltaTime * this._laneSwitchSpeed;
            if (this._laneTweenInterpolation > 1) {
                this._laneTweenInterpolation = 1;
                this._inLaneTween = false;
                this._inLaneTweenRight = false;
                this._inLaneTweenLeft = false;
            }
            let targetLanePosition: BABYLON.Vector3 = pos;
            let previousLanePosition: BABYLON.Vector3 = this._previousLane.getPointAtT(laneInputT);
            pos = BABYLON.Vector3.Lerp(previousLanePosition, targetLanePosition, this._laneTweenInterpolation);
        }
        if (this._laneTweenAnimationTime > 0) {
            this._laneTweenAnimationTime -= deltaTime;
        }
        // jumping
        if (this._jumpManager.jumping) {
            if (this._jumpManager.getPointAtT(deltaTime).y < 0) {
                this._jumpManager.jumping = false;
                this._audio.playSound(Sounds.JumpLand);
            } else {
                pos = pos.add(this._jumpManager.getPointAtT(deltaTime));
            }
        }

        this._playerTranslateComponent.setPosition = pos;
    }

    /**
     * Checks if the player is colliding.
     */
    private updateCollision() {
        this._playerMeshComponent.updateCollision();
        if (!this._firstFrame) {
            for (var i: number = 0; i < this._roadManager.sceneObjects.length; i++) {
                if (this._roadManager.sceneObjects[i].hasCollider) {
                    let meshLoaded: boolean = ((<ECS.ComponentAbstractMesh>this._roadManager.sceneObjects[i].entity.getComponent(this._abstractMeshComponetType)).meshState == ECS.MeshLoadState.Loaded);
                    if (meshLoaded) {
                        if (this._roadManager.sceneObjects[i] != null) {
                            var coll: boolean = this._playerMeshComponent.getCollider.intersectsMesh(this._roadManager.sceneObjects[i].meshCollider);
                            if (coll) {
                                switch (this._roadManager.sceneObjects[i].meshType) {
                                    case CollisionMeshType.pillar:
                                        this._audio.playSound(Sounds.Stop);
                                        var deathPos = new BABYLON.Vector3(this.getplayerPosition().x, this.getplayerPosition().y, this._roadManager.sceneObjects[i].meshCollider.position.z - 0.2);
                                        this._playerTranslateComponent.setPosition = deathPos;
                                        this._gameBase.PlayerCameraManager.Shake();
                                        this._playing = false;
                                        this._playerDead = true;
                                        this._fallingBack = true;
                                        this.updateAnimation();
                                        break;
                                    case CollisionMeshType.spike:
                                        this._audio.playSound(Sounds.Spike);
                                        this._gameBase.PlayerCameraManager.Shake();
                                        this._playing = false;
                                        this._playerDead = true;
                                        this._fallingBack = false;
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
    }

    /**
     * destroys the player
     */
    destroy() {
        this._player.destroy();
    }
}

enum PlayerAnimationState {
    NotStarted,
    Running,
    Sliding,
    Jumping,
    Idle,
    FallingBack,
    FallingBackDone,
    FallingForward,
    FallingForwardDone,
    LaneSwitchL,
    LaneSwitchR
}