/**
 * PlayerManager
 */
class PlayerManager {

    private player: ECS.Entity;
    private playerTranslateComponent: ECS.ComponentTransform;
    private playerMeshComponent: ECS.ComponentAbstractMesh;
    private playerSpeed: number = 0.004;
    private playerT: number = 0;
    private _scene: BABYLON.Scene;
    private animationState: PlayerAnimationState = PlayerAnimationState.NotStarted;
    private roadManager: RoadManager;
    private pickupsCollected: number = 0;
    private jumpManager: ComponentJumpCurve;
    private audio: audioManager;
    private gameUI: GameUI;

    //player dieing
    private playing: boolean = true;
    private playerDead: boolean = false;
    private _playerDiedAnimStarted: boolean = false;
    private _playerDiedAnimDone: boolean = false;
    private playerDiedT: number = 0;
    private endScreenOpened = false;

    // lane
    private previousLane: ComponentLaneBase;
    private currentLane: ComponentLaneBase;
    private moveLeftRight: number = 0;

    // lane tween
    private inLaneTween: boolean = false;
    private inLaneTweenLeft: boolean = false;
    private inLaneTweenRight: boolean = false;
    private laneTweenInterpolation: number = 0;
    private laneSwitchSpeed: number = 0.002;

    // collision
    private firstFrame: boolean = true;

    // touch
    private playerMovedCurrentTouch: boolean;
    private touchStart: BABYLON.Vector2;
    private touchEnd: BABYLON.Vector2;

    private abstractMeshComponetType: string;

    private _walkSoundRepeatTime: number = 200;
    private _walkSoundRepeatTimer: number = 0;

    // frame time correction 24/30
    private ftc: number = 0.8;

    /**
     * @param scene the scene which contains the player
     * @param the games entity component system
     * @param the games RoadManager
     * @param the games AudioManager
     * @param gameUI the games ui
     */
    constructor(scene: BABYLON.Scene, ECSengine: ECS.Engine, roadManager: RoadManager, audioManager: audioManager, gameUI: GameUI) {
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
        let mesh: BABYLON.Mesh = BABYLON.Mesh.CreateBox("CollBox", 0.2, this._scene, false);
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
    setPlaying(state: boolean) {
        this.playing = state;
    }

    /**
     * Returns the players interpontation(t or dictance in game).
     * @returns players distance in the game
     */
    getplayerT(): number {
        return this.playerT;
    }

    /**
     * Sets the players interpontation(t or dictance in game).
     * @param T T to be set
     */
    setplayerT(T: number): void {
        this.playerT = T;
    }

    /**
     * returns the amout of pickups collected
     * @returns the amount of pickups collected
     */
    getPickupsCollected(): number {
        return this.pickupsCollected;
    }

    /**
     * Returns the players position
     * @returns players position
     */
    getplayerPosition(): BABYLON.Vector3 {
        return this.playerTranslateComponent.getPosition;
    }

    /**
     * get touch start position
     */
    onTouchStart(touchEvt: TouchEvent) {
        this.playerMovedCurrentTouch = false;
        this.touchStart = new BABYLON.Vector2(touchEvt.touches[0].screenX, touchEvt.touches[0].screenY);
    }

    onTouchEnd(touchEvt: TouchEvent) {

    }

    /**
     * check for swipe
     */
    onTouchMove(touchEvt: TouchEvent) {
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
                if (this.jumpManager.jumping == false && this.playing) {
                    this.jumpManager.jump(this.playerT);
                    this.audio.playSound(Sounds.Jump);
                }
                //case 82:
                //throw 0;
                break;
        }
    }

    private movePlayerLeft() {
        if (this.currentLane.getLeftLaneAvalable && this.playing) {
            if (!this.inLaneTween) {
                this.previousLane = this.currentLane;
                this.currentLane = this.currentLane.getLeftLane;
                this.inLaneTweenLeft = true;
                this.startPlayerLaneTween();
                this.moveLeftRight = 0;
            } else {
                this.moveLeftRight = -1;
            }
        }
    }

    private movePlayerRight() {
        if (this.currentLane.getRightLaneAvalable && this.playing) {
            if (!this.inLaneTween) {
                this.previousLane = this.currentLane;
                this.currentLane = this.currentLane.getRightLane;
                this.inLaneTweenRight = true;
                this.startPlayerLaneTween();
                this.moveLeftRight = 0;
            } else {
                this.moveLeftRight = 1;
            }
        }
    }

    private startPlayerLaneTween() {
        this.inLaneTween = true;
        this.updateAnimation();
        this.laneTweenInterpolation = 0;
        this.audio.playSound(Sounds.LaneSwitch);

    }

    private playerFallbackAnimationTime() {
        return ((((420 - 360) * this.ftc) / 24) * 1000);
    }

    private updateDead(deltaTime: number) {
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
    }

    /**
     * updates the player
     */
    update(deltaTime: number): void {
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
    }

    private updateAnimation() {

        if (this.playerMeshComponent.meshState == ECS.MeshLoadState.Loaded) {
            if (this.playerDead && !this._playerDiedAnimStarted) {
                // play fall back animation
                this.animationState = PlayerAnimationState.FallingBack;
                this._playerDiedAnimStarted = true;
                this._scene.beginAnimation(this.playerMeshComponent.babylonMesh.skeleton, 360 * this.ftc, 420 * this.ftc, true, 1);
            } else {
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
                        } else if (this.inLaneTweenLeft) {
                            // play move left animation
                            this.animationState = PlayerAnimationState.LaneSwitchL;
                            this._scene.beginAnimation(this.playerMeshComponent.babylonMesh.skeleton, 25 * this.ftc, 39 * this.ftc, true, 1.2);
                        } else if (this.inLaneTweenRight) {
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
    }

    private updateAudio(deltaTime: number) {
        this._walkSoundRepeatTimer += deltaTime;
        if (this._walkSoundRepeatTimer > this._walkSoundRepeatTime && this.jumpManager.jumping == false) {
            this._walkSoundRepeatTimer = 0;
            this.audio.playSound(Sounds.Walk);
        }
    }

    private updateRoadLane() {
        // set next lane if at end of current lane
        if (this.playerT > this.currentLane.getEndT()) {
            this.currentLane = this.currentLane.getNextLane;
            this.previousLane = this.previousLane.getNextLane;
        }
    }

    //prevent to much recursion
    private MAX_RECURSIONS: number = 3;
    private recursions: number = 0;

    /**
     * updats the movement of the player
     * @param deltaTime time delta this update and previous update
     */
    private updatePlayerMovment(deltaTime: number) {
        if (!this.inLaneTween) {
            if (this.moveLeftRight < -0.5) {
                this.movePlayerLeft();
                this.moveLeftRight = 0;
            } else if (this.moveLeftRight > 0.5) {
                this.movePlayerRight();
                this.moveLeftRight = 0;
            }
        }

        if (this.playerSpeed != 0) {
            if (deltaTime > 0.1 && this.recursions < this.MAX_RECURSIONS) {
                this.playerT += (0.1 * this.playerSpeed);
                deltaTime -= 0.1;
                this.recursions++;
                this.updateCollision();
                this.updatePlayerMovment(deltaTime);
            }
            else {
                this.recursions = 0;
                this.playerT += (deltaTime * this.playerSpeed);
            }
        }

        let laneInputT: number = (this.playerT - this.currentLane.getStartT) / this.currentLane.getLaneLength();
        let pos: BABYLON.Vector3 = this.currentLane.getPointAtT(laneInputT);

        // lane switch interpolation
        if (this.inLaneTween) {
            this.laneTweenInterpolation += deltaTime * this.laneSwitchSpeed;
            if (this.laneTweenInterpolation > 1) {
                this.laneTweenInterpolation = 1;
                this.inLaneTween = false;
                this.inLaneTweenRight = false;
                this.inLaneTweenLeft = false;
            }
            let targetLanePosition: BABYLON.Vector3 = pos;
            let previousLanePosition: BABYLON.Vector3 = this.previousLane.getPointAtT(laneInputT);
            pos = BABYLON.Vector3.Lerp(previousLanePosition, targetLanePosition, this.laneTweenInterpolation);

        }

        // jumping
        if (this.jumpManager.jumping) {
            if (this.jumpManager.getPointAtT(this.playerT,1.5,deltaTime).y < 0) {
                this.jumpManager.jumping = false;
                this.audio.playSound(Sounds.JumpLand);
            }else{
                pos = pos.add(this.jumpManager.getPointAtT(this.playerT,1.5,deltaTime));
            }
        }

        this.playerTranslateComponent.setPosition = pos;
    }

    private updateCollision() {
        this.playerMeshComponent.updateCollision();
        if (!this.firstFrame) {
            for (var i: number = 0; i < this.roadManager.sceneObjects.length; i++) {
                if (this.roadManager.sceneObjects[i].hasCollider) {
                    let meshLoaded: boolean = ((<ECS.ComponentAbstractMesh>this.roadManager.sceneObjects[i].entity.getComponent(this.abstractMeshComponetType)).meshState == ECS.MeshLoadState.Loaded);
                    if (meshLoaded) {
                        if (this.roadManager.sceneObjects[i] != null) {
                            var coll: boolean = this.playerMeshComponent.getCollider.intersectsMesh(this.roadManager.sceneObjects[i].meshCollider);
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