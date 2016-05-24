/**
 * PlayerManager
 */
class PlayerManager {

    private player: ECS.Entity;
    private playerTranslateComponent: ECS.ComponentTransform;
    private playerMeshComponent: ECS.ComponentAbstractMesh;
    private playerSpeed: number = 0.006;
    private playerT: number = 0;
    private scene: BABYLON.Scene;
    private animationStarted: boolean = false;
    private roadManager: RoadManager;
    private pickupsCollected: number = 0;
    private jumpManager: ComponentJumpLane;

    // lane
    private previousLane: ComponentLaneBase;
    private currentLane: ComponentLaneBase;

    // lane tween
    private inLaneTween: boolean = false;
    private laneTweenInterpolation: number = 0;
    private laneSwitchSpeed: number = 0.01;

    // collision
    private firstFrame: boolean = true;

    // touch
    private playerMovedCurrentTouch: boolean;
    private touchStart: BABYLON.Vector2;
    private touchEnd: BABYLON.Vector2;

    constructor(scene: BABYLON.Scene, ECSengine: ECS.Engine, roadManager: RoadManager) {
        this.roadManager = roadManager;
        this.scene = scene;
        this.player = ECSengine.createEntity();
        this.playerTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.0013, 0.0013, 0.0013), new BABYLON.Quaternion(0, 1, 0, 0));
        this.player.addComponent(this.playerTranslateComponent);
        this.playerMeshComponent = new ECS.ComponentAbstractMesh(this.playerTranslateComponent, "assets/models/", "explorer_rig_running.babylon");
        this.player.addComponent(this.playerMeshComponent);

        // setup collision
        let mesh: BABYLON.Mesh = BABYLON.Mesh.CreateBox("CollBox", 0.2, this.scene, false);
        mesh.scaling = new BABYLON.Vector3(1, 2, 1);
        this.playerMeshComponent.setColliderOffset = new BABYLON.Vector3(0, 0.25, 0);
        this.playerMeshComponent.setCollision(mesh);

        this.jumpManager = new ComponentJumpLane(this.playerMeshComponent, BABYLON.Vector3.Zero(), this.scene, this.playerT);


        //playerTranslateComponent.setScale = new BABYLON.Vector3(0.1, 0.1, 0.1);
        console.log(this.playerTranslateComponent.getPosition);
        console.log("componentPosition instance type:" + this.playerTranslateComponent.componentType());

        this.currentLane = this.roadManager.getStartLane;
        this.previousLane = this.roadManager.getStartLane;
    }

    /**
     * Returns the players interpontation(t or dictance in game).
     * @returns players t
     */
    getplayerT(): number {
        return this.playerT;
    }
    
    getPickupsCollected():number{
        return this.pickupsCollected;
    }

    /**
     * Returns the players position
     * @returns players position
     */
    getplayerPosition(): BABYLON.Vector3 {
        return this.playerTranslateComponent.getPosition;
    }

    //get touch start position
    onTouchStart(touchEvt: TouchEvent) {
        this.playerMovedCurrentTouch = false;
        this.touchStart = new BABYLON.Vector2(touchEvt.touches[0].screenX, touchEvt.touches[0].screenY);
    }

    onTouchEnd(touchEvt: TouchEvent) {

    }

    //check for swipe
    // TODO : if swipe > screen.width*0.5 move 2 lanes? 
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
        if (this.touchEnd.y - this.touchStart.y < -screen.height * 0.1 && this.jumpManager.jumping == false) {
            this.jumpManager.jump(this.playerT);
        }
    }

    onKeyDown(keyEvent: KeyboardEvent): void {

        switch (keyEvent.keyCode) {
            case 65: //'A'
                this.movePlayerLeft();
                break;
            case 68: //'D'
                this.movePlayerRight();
                break;
            case 32: //'Space'
                if (this.jumpManager.jumping == false) {
                    this.jumpManager.jump(this.playerT);
                }
                break;
        }
    }

    private movePlayerLeft() {
        if (this.currentLane.getLeftLaneAvalable && !this.inLaneTween) {
            this.previousLane = this.currentLane;
            this.currentLane = this.currentLane.getLeftLane;
            this.startPlayerLaneTween();
        }
    }

    private movePlayerRight() {
        if (this.currentLane.getRightLaneAvalable && !this.inLaneTween) {
            this.previousLane = this.currentLane;
            this.currentLane = this.currentLane.getRightLane;
            this.startPlayerLaneTween();
        }
    }

    private startPlayerLaneTween() {
        this.inLaneTween = true;
        this.laneTweenInterpolation = 0;
    }

    update(deltaTime: number): void {

        this.updateAnimation();
        this.updateRoadLane();
        this.updatePlayerMovment(deltaTime);
       // this.updateCollision();

        if (this.firstFrame) {
            this.firstFrame = false;
        }
    }

    private updateAnimation() {
        if (!this.animationStarted && this.playerMeshComponent.meshState == ECS.MeshLoadState.Loaded) {
            this.animationStarted = true;
            // set run animation
            this.scene.beginAnimation(this.playerMeshComponent.babylonSkeleton, 0, 21, true, 1);
        }
    }

    private updateRoadLane() {
        // spawn road if needed
        if (!this.currentLane.getNextLaneAvalable) {
            if (!this.currentLane.getNextLane.getNextLaneAvalable) {
                this.roadManager.createRaodPart();
            }
        } else {
            if (!this.currentLane.getNextLane.getNextLaneAvalable) {
                this.roadManager.createRaodPart();
            }
        }

        // set next lane if at end of current lane
        if (this.playerT > this.currentLane.getEndT()) {
            this.currentLane = this.currentLane.getNextLane;
            this.previousLane = this.previousLane.getNextLane;
        }
    }


    private updatePlayerMovment(deltaTime: number) {
        if (this.playerSpeed != 0) {
            // TODO : add max speed
            if(deltaTime>5){
                this.playerT += ((5 * (this.playerSpeed+(this.playerT / 280000))));
                deltaTime-=5;
                this.updatePlayerMovment(deltaTime);
            }
            else{
                this.playerT += ((deltaTime * (this.playerSpeed+(this.playerT / 280000))));
            }
        }

        let laneInputT: number = (this.playerT - this.currentLane.getStartT) / this.currentLane.getLaneLength();
        let pos: BABYLON.Vector3 = this.currentLane.getPointAtT(laneInputT);
        
        // lane switch interpolation
        if (this.inLaneTween){
            this.laneTweenInterpolation += deltaTime*this.laneSwitchSpeed;
            if(this.laneTweenInterpolation > 1){
                this.laneTweenInterpolation = 1;
                this.inLaneTween = false;
            }
            let targetLanePosition: BABYLON.Vector3 = pos;
            let previousLanePosition: BABYLON.Vector3 = this.previousLane.getPointAtT(laneInputT);
            pos = BABYLON.Vector3.Lerp(previousLanePosition, targetLanePosition, this.laneTweenInterpolation);
        }
        
        // jumping
        if (this.jumpManager.jumping) {
            let jumpInputT: number = (this.playerT - this.jumpManager.getT()) / (this.jumpManager.getLaneLength()/2.5);
            if (jumpInputT > 1) {
                this.jumpManager.done();
            }
            pos = pos.add(this.jumpManager.getPointAtT(jumpInputT));
        }
        
        this.playerTranslateComponent.setPosition = pos;
        this.updateCollision();
    }

    private updateCollision() {
        this.playerMeshComponent.updateCollision();
        // check collision with obstacles
        if (!this.firstFrame) {
            for (var index: number = 0; index < this.roadManager.obstacles.length; index++) {
                if (this.roadManager.obstacles[index] != null) {
                    var coll: boolean = this.playerMeshComponent.getCollider.intersectsMesh(this.roadManager.obstacles[index].meshCollider);
                    if (coll) {
                        switch (this.roadManager.obstacles[index].meshType) {
                            case CollisionMeshType.pillar:
                                this.playerSpeed = 0;
                                break;
                            case CollisionMeshType.scarab:
                                console.log("scarab collision");
                                this.pickupsCollected++;
                                this.roadManager.obstacles[index].entity.destroy();
                                this.roadManager.obstacles.splice(index, 1);
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