/**
 * RoadManager
 */
class RoadManager {

    engine: ECS.Engine;
    clonesCreated: boolean = false;
    roadMeshes: ECS.ComponentAbstractMesh[];

    constructor(engine: ECS.Engine, scene: BABYLON.Scene, cameraComponent: ComponentCamera) {

        this.roadMeshes = [];

        this.engine = engine;

        let raodParts;

        let house: ECS.Entity = this.engine.createEntity();
        let housePositionComponent = new ECS.ComponentTransform(new BABYLON.Vector3(5, 0, 20), new BABYLON.Vector3(0.2, 0.2, 0.2));
        house.addComponent(housePositionComponent);
        house.addComponent(new ECS.ComponentAbstractMesh(housePositionComponent, "assets/models/", "house.babylon"));

        for (var i = 0; i < 10; i++) {
            let road: ECS.Entity = this.engine.createEntity();
            let roadPositionComponent = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, i * 14), new BABYLON.Vector3(1, 1, 1));
            road.addComponent(roadPositionComponent);
            this.roadMeshes[i] = new ECS.ComponentAbstractMesh(roadPositionComponent, "assets/models/", "Road_02.babylon");
            road.addComponent(this.roadMeshes[i]);

            road.addComponent(new ComponentStraightLane(this.roadMeshes[i], new BABYLON.Vector3(0, 0, i * 14), BABYLON.Vector3.Zero(), scene));
        }
    }

    update() {
        for (var i = 0; i < this.roadMeshes.length; i++) {
            var element: ECS.ComponentAbstractMesh = this.roadMeshes[i];

            let roadPos: BABYLON.Vector3 = element.positionComponent.getPosition;
            //element.positionComponent.setPosition = roadPos.add(new BABYLON.Vector3(0, 0, -0.2));

            if (element.positionComponent.getPosition.z < -20) {
                let roadPos: BABYLON.Vector3 = element.positionComponent.getPosition;
                //element.positionComponent.setPosition = roadPos.add(new BABYLON.Vector3(0, 0, 10*14));
            }
        }
    }
}