/**
 * RoadManager
 */
class RoadManager {

    private engine: ECS.Engine;
    private scene: BABYLON.Scene;
    private clonesCreated: boolean = false;
    private roadMeshes: ECS.ComponentAbstractMesh[];
    private lanes:ComponentStraightLane[][];
    private roadesSpawned = 0;

    constructor(engine: ECS.Engine, scene: BABYLON.Scene) {
        this.lanes = [];
        this.roadMeshes = [];
        this.engine = engine;
        this.scene = scene;
        
        let house: ECS.Entity = this.engine.createEntity();
        let housePositionComponent = new ECS.ComponentTransform(new BABYLON.Vector3(5, 0, 20), new BABYLON.Vector3(0.2, 0.2, 0.2));
        house.addComponent(housePositionComponent);
        house.addComponent(new ECS.ComponentAbstractMesh(housePositionComponent, "assets/models/", "house.babylon"));
        
        this.createRaodPart();
        this.createRaodPart();
    }
    
    createRaodPart(){
        let roadN = this.lanes.length;
        let road: ECS.Entity = this.engine.createEntity();
        let roadPositionComponent = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, this.roadesSpawned * 14), new BABYLON.Vector3(1, 1, 1));
        road.addComponent(roadPositionComponent);
        this.roadMeshes[roadN] = new ECS.ComponentAbstractMesh(roadPositionComponent, "assets/models/", "Road_02.babylon");
        road.addComponent(this.roadMeshes[roadN]);
        this.lanes[roadN] = [
            new ComponentStraightLane(this.roadMeshes[roadN], new BABYLON.Vector3(-0.25, 0, this.roadesSpawned * 14), BABYLON.Vector3.Zero(), this.scene,this.roadesSpawned*14),
            new ComponentStraightLane(this.roadMeshes[roadN], new BABYLON.Vector3(0, 0, this.roadesSpawned * 14), BABYLON.Vector3.Zero(), this.scene,this.roadesSpawned*14),
            new ComponentStraightLane(this.roadMeshes[roadN], new BABYLON.Vector3(0.25, 0, this.roadesSpawned * 14), BABYLON.Vector3.Zero(), this.scene,this.roadesSpawned*14)
        ];
        
        // set right en left lanes
        this.lanes[roadN][1].setRightLane = this.lanes[roadN][2];
        this.lanes[roadN][1].setLeftLane = this.lanes[roadN][0];
        this.lanes[roadN][0].setRightLane = this.lanes[roadN][1];
        this.lanes[roadN][2].setLeftLane = this.lanes[roadN][1];
        
        // set new lanes as next lanes to previous spawned lanes
        if(roadN>0.1){
            this.lanes[roadN-1][0].setNextLane = this.lanes[roadN][0];
            this.lanes[roadN-1][1].setNextLane = this.lanes[roadN][1];
            this.lanes[roadN-1][2].setNextLane = this.lanes[roadN][2];
        }
        
        // add lane components to road entity
        road.addComponent(this.lanes[roadN][0]);
        road.addComponent(this.lanes[roadN][1]);
        road.addComponent(this.lanes[roadN][2]);
        
        this.roadesSpawned++;
    }
    
    public get getStartLane():ComponentLaneBase{
        return this.lanes[0][1];
    }

    update(playerT:number) {
        for (var i = 0; i < this.lanes.length; i++) {
            if(this.lanes[i][0].getStartT < playerT-20){
                this.roadMeshes[i].getParentEntity.destroy();
                this.roadMeshes.splice(i,1);
                this.lanes.splice(i,1);
            }
        }
    }
}