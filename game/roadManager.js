/**
 * RoadManager
 */
var RoadManager = (function () {
    function RoadManager(engine, scene) {
        this.clonesCreated = false;
        this.roadesSpawned = 0;
        this.lanes = [];
        this.roadMeshes = [];
        this.obstacles = [];
        this.sceneObjects = [];
        this.engine = engine;
        this.scene = scene;
        this.abstractMeshComponetType = new ECS.ComponentAbstractMesh(null, null, null).componentType();
        // initialize scene object factory
        this.sceneObjectFactory = new SceneObjectSpawnTemplateSetFactory(this, engine);
        this.createRaodPart();
        this.createRaodPart();
    }
    Object.defineProperty(RoadManager.prototype, "getLanes", {
        get: function () {
            return this.lanes;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * spawns a new road section
     */
    RoadManager.prototype.createRaodPart = function () {
        var roadN = this.lanes.length;
        var road = this.engine.createEntity();
        var roadPositionComponent = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, this.roadesSpawned * 14), new BABYLON.Vector3(1, 1, 1), BABYLON.Quaternion.Identity());
        road.addComponent(roadPositionComponent);
        this.roadMeshes[roadN] = new ECS.ComponentAbstractMesh(roadPositionComponent, "assets/models/", "road_river.babylon");
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
        this.createLaneObject(roadN, "assets/models/", "pillar.babylon", CollisionMeshType.pillar, new BABYLON.Vector3(0.14, 0.14, 0.14), BABYLON.Quaternion.Identity(), new BABYLON.Vector3(0, 0, 0), BABYLON.Vector3.Zero(), 0.2, 2, this.randomLane());
        for (var i = 0; i < 5; i++) {
            this.createLaneObject(roadN, "assets/models/", "pickup_scarab.babylon", CollisionMeshType.scarab, new BABYLON.Vector3(2.5, 2.5, 2.5), new BABYLON.Quaternion(0, 0, 0, 1), new BABYLON.Vector3(0, 0.5, 0), BABYLON.Vector3.Zero(), 0.2, 0.5, this.randomLane());
        }
        this.sceneObjectFactory.createRandomTemplateSet(roadN);
        this.roadesSpawned++;
    };
    /**
     * creates Obstacle or pickup on a lane
     */
    RoadManager.prototype.createLaneObject = function (roadN, path, file, type, scale, rotation, obstacleDisplacement, collisionMeshOffset, colliderWidth, colliderHeight, lane) {
        var randomT = Math.random();
        var obstacle = this.engine.createEntity();
        var obstacleTransformComponent = new ECS.ComponentTransform(this.lanes[roadN][lane].getPointAtT(randomT), scale, rotation);
        obstacleTransformComponent.setPosition = obstacleTransformComponent.getPosition.add(obstacleDisplacement);
        obstacle.addComponent(obstacleTransformComponent);
        var obstacleMesh = new ECS.ComponentAbstractMesh(obstacleTransformComponent, path, file);
        obstacle.addComponent(obstacleMesh);
        // collision
        obstacleMesh.setCollision(BABYLON.Mesh.CreateCylinder("LaneObject Collider", colliderHeight, colliderWidth, colliderWidth, 0, 0, this.scene));
        obstacleMesh.setColliderOffset = collisionMeshOffset;
        obstacleMesh.updateCollision();
        var arrayPosition = this.obstacles.length;
        this.obstacles[arrayPosition] = new RoadObstacle(obstacleMesh.getCollider, type, obstacle, this.lanes[roadN][lane].getDistanceAtT(randomT));
    };
    RoadManager.prototype.randomLane = function () {
        return Math.floor((Math.random() * 3));
    };
    Object.defineProperty(RoadManager.prototype, "getStartLane", {
        get: function () {
            return this.lanes[0][1];
        },
        enumerable: true,
        configurable: true
    });
    RoadManager.prototype.update = function (playerT) {
        // spawn road if needed
        if (playerT + 60 > this.lanes[this.lanes.length - 1][1].getEndT()) {
            this.createRaodPart();
        }
        // delete road if of screen
        for (var i_1 = 0; i_1 < this.lanes.length; i_1++) {
            if (this.lanes[i_1][0].getStartT < playerT - 20) {
                this.roadMeshes[i_1].getParentEntity.destroy();
                this.roadMeshes.splice(i_1, 1);
                this.lanes.splice(i_1, 1);
            }
        }
        // delete obstacles if out of view
        for (var i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].spawnDistance < playerT - 10) {
                // check if object mesh is loaded before destroying it
                var meshLoaded = (this.obstacles[i].entity.getComponent(this.abstractMeshComponetType).meshState == ECS.MeshLoadState.Loaded);
                if (meshLoaded) {
                    this.obstacles[i].entity.destroy();
                    this.obstacles.splice(i, 1);
                }
            }
        }
        // delete sceneObjects if out of view
        for (var i = 0; i < this.sceneObjects.length; i++) {
            if (this.sceneObjects[i].spawnDistance < playerT - 5) {
                // check if object mesh is loaded before destroying it
                var meshLoaded = (this.sceneObjects[i].entity.getComponent(this.abstractMeshComponetType).meshState == ECS.MeshLoadState.Loaded);
                if (meshLoaded) {
                    this.sceneObjects[i].entity.destroy();
                    this.sceneObjects.splice(i, 1);
                }
            }
        }
    };
    return RoadManager;
}());
//# sourceMappingURL=roadManager.js.map