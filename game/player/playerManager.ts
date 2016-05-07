/**
 * PlayerManager
 */
class PlayerManager {

    player: ECS.Entity;
    playerTranslateComponent: ECS.ComponentTransform;
    playerMeshComponent: ECS.ComponentAbstractMesh;
    playerSpeed:number = 0.005;
    playerT:number;
    scene:BABYLON.Scene;
    animationStarted:boolean = false;
    roadManager:RoadManager;
    currentLane:ComponentLaneBase;
    
    constructor(scene: BABYLON.Scene, ECSengine: ECS.Engine, roadManager:RoadManager) {
        this.roadManager = roadManager;
        this.scene = scene;
        this.player = ECSengine.createEntity();
        this.playerTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.004, 0.004, 0.004));
        this.player.addComponent(this.playerTranslateComponent);
        this.playerMeshComponent = new ECS.ComponentAbstractMesh(this.playerTranslateComponent, "assets/models/", "Matthew_Full.babylon");
        this.player.addComponent(this.playerMeshComponent);
        this.playerTranslateComponent.setPosition = this.playerTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 0));
        this.playerMeshComponent.meshRotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 2);
        this.playerMeshComponent.meshRotate(new BABYLON.Vector3(0, 0, 1), Math.PI);
        this.playerT = 0;
        
        //playerTranslateComponent.setScale = new BABYLON.Vector3(0.1, 0.1, 0.1);
        console.log(this.playerTranslateComponent.getPosition);
        console.log("componentPosition instance type:" + this.playerTranslateComponent.componentType());
        
        this.currentLane = this.roadManager.getStartLane;
    }
    
    /**
     * Returns the players interpontation(t or dictance in game).
     * @returns players t
     */
    getplayerT():number{
        return this.playerT;
    }

    onKeyDown(keyEvent: KeyboardEvent): void {
        switch (keyEvent.keyCode) {
            case 68: //'D'
                //house.translate(new BABYLON.Vector3(0, 0, 1), 3.5);
                this.playerTranslateComponent.setPosition = this.playerTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 10));
                break;
            case 82: //'R'
                //house.rotate(BABYLON.Vector3.Up(), Math.PI / 4);
                this.playerTranslateComponent.setPosition = this.playerTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 10));
                break;
        }
    }

    update(deltaTime: number): void {
        
        if(!this.animationStarted && this.playerMeshComponent.meshState == ECS.MeshLoadState.Loaded){
            this.animationStarted = true;
            // set run animation
            this.scene.beginAnimation(this.playerMeshComponent.babylonSkeleton,2,18,true,1);
        }
        
        this.playerT += (deltaTime*this.playerSpeed);
        
        // spawn lane if needed
        if(!this.currentLane.getNextLaneAvalable){
            this.roadManager.createRaodPart();
        }
        
        // set next lane if at end of current lane
        if(this.playerT > this.currentLane.getEndT()){
            this.currentLane = this.currentLane.getNextLane;
        }
        
        let laneInputT:number = (this.playerT-this.currentLane.getStartT)/this.currentLane.getLaneLength();
        //console.log(laneInputT);
        this.playerTranslateComponent.setPosition = this.currentLane.getPointAtT(laneInputT);
        //this.playerTranslateComponent.setPosition = this.playerTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, this.playerT));
    }
}