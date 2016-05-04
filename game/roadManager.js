/**
 * RoadManager
 */
var RoadManager = (function () {
    function RoadManager(engine, scene, cameraComponent) {
        this.clonesCreated = false;
        this.roadMeshes = [];
        this.engine = engine;
        var raodParts;
        var house = this.engine.createEntity();
        var housePositionComponent = new ECS.ComponentTransform(new BABYLON.Vector3(5, 0, 20), new BABYLON.Vector3(0.2, 0.2, 0.2));
        house.addComponent(housePositionComponent);
        house.addComponent(new ECS.ComponentAbstractMesh(housePositionComponent, "assets/models/", "house.babylon"));
        for (var i = 0; i < 10; i++) {
            var road = this.engine.createEntity();
            var roadPositionComponent = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, i * 14), new BABYLON.Vector3(1, 1, 1));
            road.addComponent(roadPositionComponent);
            this.roadMeshes[i] = new ECS.ComponentAbstractMesh(roadPositionComponent, "assets/models/", "Road_02.babylon");
            road.addComponent(this.roadMeshes[i]);
            road.addComponent(new ComponentStraightLane(this.roadMeshes[i], new BABYLON.Vector3(0, 0, i * 14), BABYLON.Vector3.Zero(), scene));
        }
    }
    RoadManager.prototype.update = function () {
        for (var i = 0; i < this.roadMeshes.length; i++) {
            var element = this.roadMeshes[i];
            var roadPos = element.positionComponent.getPosition;
            //element.positionComponent.setPosition = roadPos.add(new BABYLON.Vector3(0, 0, -0.2));
            if (element.positionComponent.getPosition.z < -20) {
                var roadPos_1 = element.positionComponent.getPosition;
            }
        }
    };
    return RoadManager;
}());
//# sourceMappingURL=roadManager.js.map