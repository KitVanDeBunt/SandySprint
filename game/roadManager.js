/**
 * RoadManager
 */
var RoadManager = (function () {
    function RoadManager(engine, scene, cameraComponent) {
        this.clonesCreated = false;
        this.roadMeshesCount = 0;
        this.lanes = [];
        this.roadMeshes = [];
        this.engine = engine;
        this.scene = scene;
        var house = this.engine.createEntity();
        var housePositionComponent = new ECS.ComponentTransform(new BABYLON.Vector3(5, 0, 20), new BABYLON.Vector3(0.2, 0.2, 0.2));
        house.addComponent(housePositionComponent);
        house.addComponent(new ECS.ComponentAbstractMesh(housePositionComponent, "assets/models/", "house.babylon"));
        this.createRaodPart();
        this.createRaodPart();
    }
    RoadManager.prototype.createRaodPart = function () {
        var roadN = this.roadMeshesCount;
        var road = this.engine.createEntity();
        var roadPositionComponent = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, roadN * 14), new BABYLON.Vector3(1, 1, 1));
        road.addComponent(roadPositionComponent);
        this.roadMeshes[roadN] = new ECS.ComponentAbstractMesh(roadPositionComponent, "assets/models/", "Road_02.babylon");
        road.addComponent(this.roadMeshes[roadN]);
        this.lanes[roadN] = [
            new ComponentStraightLane(this.roadMeshes[roadN], new BABYLON.Vector3(-0.25, 0, roadN * 14), BABYLON.Vector3.Zero(), this.scene, roadN * 14),
            new ComponentStraightLane(this.roadMeshes[roadN], new BABYLON.Vector3(0, 0, roadN * 14), BABYLON.Vector3.Zero(), this.scene, roadN * 14),
            new ComponentStraightLane(this.roadMeshes[roadN], new BABYLON.Vector3(0.25, 0, roadN * 14), BABYLON.Vector3.Zero(), this.scene, roadN * 14)
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
        road.addComponent(this.lanes[roadN][0]);
        road.addComponent(this.lanes[roadN][1]);
        road.addComponent(this.lanes[roadN][2]);
        this.roadMeshesCount++;
    };
    Object.defineProperty(RoadManager.prototype, "getStartLane", {
        get: function () {
            return this.lanes[0][1];
        },
        enumerable: true,
        configurable: true
    });
    RoadManager.prototype.update = function (playerT) {
        //console.log("playerT: "+playerT);
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