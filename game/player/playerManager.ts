/**
 * PlayerManager
 */
class PlayerManager {

    private player: ECS.Entity;
    private playerTranslateComponent: ECS.ComponentTransform;
    private playerMeshComponent: ECS.ComponentAbstractMesh;
    private playerSpeed: number = 0.01;
    private playerT: number;
    private scene: BABYLON.Scene;
    private animationStarted: boolean = false;
    private roadManager: RoadManager;
    private currentLane: ComponentLaneBase;
    private jumpManager: ComponentJumpLane;

    private firstFrame: boolean = true;

    constructor(scene: BABYLON.Scene, ECSengine: ECS.Engine, roadManager: RoadManager) {
        this.roadManager = roadManager;
        this.scene = scene;
        this.player = ECSengine.createEntity();
        this.playerTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.0015, 0.0015, 0.0015), new BABYLON.Quaternion(0, 1, 0, 0));
        this.player.addComponent(this.playerTranslateComponent);
        this.playerMeshComponent = new ECS.ComponentAbstractMesh(this.playerTranslateComponent, "assets/models/", "explorer_rig_running.babylon");
        this.player.addComponent(this.playerMeshComponent);

        // setup collision
        let mesh: BABYLON.Mesh = BABYLON.Mesh.CreateBox("CollBox", 0.2, this.scene, false);
        mesh.scaling = new BABYLON.Vector3(1, 2, 1);
        this.playerMeshComponent.setColliderOffset = new BABYLON.Vector3(0, 0.25, 0);
        this.playerMeshComponent.setCollision(mesh);

        this.playerT = 0;
        this.jumpManager = new ComponentJumpLane(this.playerMeshComponent, BABYLON.Vector3.Zero(), this.scene, this.playerT)


        //playerTranslateComponent.setScale = new BABYLON.Vector3(0.1, 0.1, 0.1);
        console.log(this.playerTranslateComponent.getPosition);
        console.log("componentPosition instance type:" + this.playerTranslateComponent.componentType());

        this.currentLane = this.roadManager.getStartLane;
    }

    /**
     * Returns the players interpontation(t or dictance in game).
     * @returns players t
     */
    getplayerT(): number {
        return this.playerT;
    }

    /**
     * Returns the players position
     * @returns players position
     */
    getplayerPosition(): BABYLON.Vector3 {
        return this.playerTranslateComponent.getPosition;
    }

    onKeyDown(keyEvent: KeyboardEvent): void {

        switch (keyEvent.keyCode) {
            case 65: //'A'
                if (this.currentLane.getLeftLaneAvalable) {
                    this.currentLane = this.currentLane.getLeftLane;
                }
                break;
            case 68: //'D'
                if (this.currentLane.getRightLaneAvalable) {
                    this.currentLane = this.currentLane.getRightLane;
                }
                break;
            case 32: //'Space'
                if (this.jumpManager.jumping == false) {
                    this.jumpManager.jump(this.playerT);
                }
                break;
        }
    }

    update(deltaTime: number): void {

        if (!this.animationStarted && this.playerMeshComponent.meshState == ECS.MeshLoadState.Loaded) {
            this.animationStarted = true;
            // set run animation
            this.scene.beginAnimation(this.playerMeshComponent.babylonSkeleton, 2, 18, true, 1);
        }

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
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }

        this.playerT += (deltaTime * this.playerSpeed);

        // spawn lane if needed
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
        }

        let laneInputT: number = (this.playerT - this.currentLane.getStartT) / this.currentLane.getLaneLength();
        let pos: BABYLON.Vector3 = this.currentLane.getPointAtT(laneInputT);

        if (this.jumpManager.jumping == true) {
            let jumpInputT: number = (this.playerT - this.jumpManager.getT()) / this.jumpManager.getLaneLength();
            if (jumpInputT > 1) {
                this.jumpManager.done();
            }
            pos = pos.add(this.jumpManager.getPointAtT(jumpInputT));
        }

        this.playerTranslateComponent.setPosition = pos;
        this.playerMeshComponent.updateCollision();

        if (this.firstFrame) {
            this.firstFrame = false;
        }
    }
}