/**
 * RoadManager
 */
class RoadManager {

    // TODO : delete spawned objects

    private engine: ECS.Engine;
    private scene: BABYLON.Scene;
    private clonesCreated: boolean = false;
    private roadMeshes: ECS.ComponentAbstractMesh[];
    obstacles: BABYLON.Mesh[];
    private lanes: ComponentStraightLane[][];
    private roadesSpawned = 0;

    constructor(engine: ECS.Engine, scene: BABYLON.Scene) {
        this.lanes = [];
        this.roadMeshes = [];
        this.obstacles = [];
        this.engine = engine;
        this.scene = scene;

        this.createRaodPart();
        this.createRaodPart();
    }

    createRaodPart() {

        let roadN = this.lanes.length;

        let road: ECS.Entity = this.engine.createEntity();

        let roadPositionComponent: ECS.ComponentTransform = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, this.roadesSpawned * 14)
            , new BABYLON.Vector3(1, 1, 1)
            , BABYLON.Quaternion.Identity());

        road.addComponent(roadPositionComponent);
        this.roadMeshes[roadN] = new ECS.ComponentAbstractMesh(roadPositionComponent, "assets/models/", "Road_02.babylon");
        road.addComponent(this.roadMeshes[roadN]);

        this.lanes[roadN] = [
            new ComponentStraightLane(this.roadMeshes[roadN], new BABYLON.Vector3(-0.25, 0, this.roadesSpawned * 14), BABYLON.Vector3.Zero(), this.scene, this.roadesSpawned * 14),
            new ComponentStraightLane(this.roadMeshes[roadN], new BABYLON.Vector3(0, 0, this.roadesSpawned * 14), BABYLON.Vector3.Zero(), this.scene, this.roadesSpawned * 14),
            new ComponentStraightLane(this.roadMeshes[roadN], new BABYLON.Vector3(0.25, 0, this.roadesSpawned * 14), BABYLON.Vector3.Zero(), this.scene, this.roadesSpawned * 14)
        ];

        // set right en left lanes
        this.lanes[roadN][1].setRightLane = this.lanes[roadN][2];
        this.lanes[roadN][1].setLeftLane = this.lanes[roadN][0];
        this.lanes[roadN][0].setRightLane = this.lanes[roadN][1];
        this.lanes[roadN][2].setLeftLane = this.lanes[roadN][1];

        // set new lanes as next lanes to previous spawned lanes
        if (roadN > 0.1) {
            this.lanes[roadN - 1][0].setNextLane = this.lanes[roadN][0];
            this.lanes[roadN - 1][1].setNextLane = this.lanes[roadN][1];
            this.lanes[roadN - 1][2].setNextLane = this.lanes[roadN][2];
        }

        // add lane components to road entity
        road.addComponent(this.lanes[roadN][0]);
        road.addComponent(this.lanes[roadN][1]);
        road.addComponent(this.lanes[roadN][2]);

        // spike obstacles
     /*   let randomLane: number = Math.floor((Math.random() * 3));
        let spike: ECS.Entity = this.engine.createEntity();
        let spikePositionComponent: ECS.ComponentTransform = new ECS.ComponentTransform(this.lanes[roadN][randomLane].getPointAtT(Math.random())
            , new BABYLON.Vector3(0.14, 0.14, 0.14)
            , BABYLON.Quaternion.Identity());
        spike.addComponent(spikePositionComponent);
        let spikeMeshComponent = new ECS.ComponentAbstractMesh(spikePositionComponent, "assets/models/", "pillar.babylon");
        spike.addComponent(spikeMeshComponent);
        spikeMeshComponent.setCollision(BABYLON.Mesh.CreateCylinder("Pillar", 2, 0.2, 0.2, 0, 0, this.scene));
        spikeMeshComponent.updateCollision = spikePositionComponent.getPosition;
        this.obstacles[this.obstacles.length] = spikeMeshComponent.getCollider;

        // coin obstacles
        let randomLane2: number = Math.floor((Math.random() * 3));
        let coin: ECS.Entity = this.engine.createEntity();
        let coinTransformComponent: ECS.ComponentTransform = new ECS.ComponentTransform(
            this.lanes[roadN][randomLane2].getPointAtT(Math.random())
            , new BABYLON.Vector3(0.07, 0.07, 0.07)
            , new BABYLON.Quaternion(0, 1, 0, 0)
        );
        coinTransformComponent.setPosition = coinTransformComponent.getPosition.add(new BABYLON.Vector3(0, 0.5, 0));
        coin.addComponent(coinTransformComponent);
        let coinMeshComponent = new ECS.ComponentAbstractMesh(coinTransformComponent, "assets/models/", "pickup_scarab.babylon");
        coin.addComponent(coinMeshComponent);

        // house spawn
        let house: ECS.Entity = this.engine.createEntity();
        let housePositionComponent = new ECS.ComponentTransform(this.lanes[roadN][randomLane].getPointAtT(Math.random()).add(new BABYLON.Vector3(2.5, 0, 0)), new BABYLON.Vector3(0.2, 0.2, 0.2), BABYLON.Quaternion.Identity());
        house.addComponent(housePositionComponent);
        house.addComponent(new ECS.ComponentAbstractMesh(housePositionComponent, "assets/models/", "house.babylon"));
        // house spawn
        let house2: ECS.Entity = this.engine.createEntity();
        let housePositionComponent2 = new ECS.ComponentTransform(this.lanes[roadN][randomLane].getPointAtT(Math.random()).add(new BABYLON.Vector3(-2.5, 0, 0)), new BABYLON.Vector3(0.2, 0.2, 0.2), BABYLON.Quaternion.Identity());
        house2.addComponent(housePositionComponent2);
        house2.addComponent(new ECS.ComponentAbstractMesh(housePositionComponent2, "assets/models/", "house.babylon"));*/

        this.roadesSpawned++;
    }

    public get getStartLane(): ComponentLaneBase {
        return this.lanes[0][1];
    }

    update(playerT: number) {
        for (var i = 0; i < this.lanes.length; i++) {
            if (this.lanes[i][0].getStartT < playerT - 20) {
                this.roadMeshes[i].getParentEntity.destroy();
                this.roadMeshes.splice(i, 1);
                this.lanes.splice(i, 1);
                this.obstacles.splice(i, 1);
            }
        }
    }
}