/**
 * the RoadManager manages road and the lanes and al the objects spawned on and around it
 */
var RoadManager = (function () {
    function RoadManager(engine, scene) {
        this._clonesCreated = false;
        this._roadesSpawned = 0;
        this._lanes = [];
        this._roadMeshes = [];
        //this.obstacles = [];
        this.sceneObjects = [];
        this._engine = engine;
        this._scene = scene;
        this._abstractMeshComponetType = new ECS.ComponentAbstractMesh(null, null, null).componentType();
        // initialize scene object factory
        this._sceneObjectFactory = new SceneObjectSpawnTemplateSetFactory(this, engine);
        this.createRaodPart();
        this.createRaodPart();
    }
    Object.defineProperty(RoadManager.prototype, "getLanes", {
        /**
         * @returns returns the lanes currently in game
         */
        get: function () {
            return this._lanes;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * spawns a new road section
     */
    RoadManager.prototype.createRaodPart = function () {
        var roadN = this._lanes.length;
        var road = this._engine.createEntity();
        var roadPositionComponent = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, this._roadesSpawned * 14), new BABYLON.Vector3(1, 1, 1), BABYLON.Quaternion.Identity());
        road.addComponent(roadPositionComponent);
        this._roadMeshes[roadN] = new ECS.ComponentAbstractMesh(roadPositionComponent, "assets/models/", "road_river.babylon");
        road.addComponent(this._roadMeshes[roadN]);
        this._lanes[roadN] = [
            new ComponentStraightLane(this._roadMeshes[roadN], new BABYLON.Vector3(-0.25, 0, this._roadesSpawned * 14), BABYLON.Vector3.Zero(), this._scene, this._roadesSpawned * 14),
            new ComponentStraightLane(this._roadMeshes[roadN], new BABYLON.Vector3(0, 0, this._roadesSpawned * 14), BABYLON.Vector3.Zero(), this._scene, this._roadesSpawned * 14),
            new ComponentStraightLane(this._roadMeshes[roadN], new BABYLON.Vector3(0.25, 0, this._roadesSpawned * 14), BABYLON.Vector3.Zero(), this._scene, this._roadesSpawned * 14)
        ];
        // set right en left lanes
        this._lanes[roadN][1].setRightLane = this._lanes[roadN][2];
        this._lanes[roadN][1].setLeftLane = this._lanes[roadN][0];
        this._lanes[roadN][0].setRightLane = this._lanes[roadN][1];
        this._lanes[roadN][2].setLeftLane = this._lanes[roadN][1];
        // set new lanes as next lanes to previous spawned lanes
        if (roadN > 0.1) {
            this._lanes[roadN - 1][0].setNextLane = this._lanes[roadN][0];
            this._lanes[roadN - 1][1].setNextLane = this._lanes[roadN][1];
            this._lanes[roadN - 1][2].setNextLane = this._lanes[roadN][2];
        }
        // add lane components to road entity
        road.addComponent(this._lanes[roadN][0]);
        road.addComponent(this._lanes[roadN][1]);
        road.addComponent(this._lanes[roadN][2]);
        this.createLaneObject(roadN, "assets/models/", "pillar.babylon", CollisionMeshType.pillar, new BABYLON.Vector3(0.14, 0.14, 0.14), BABYLON.Quaternion.Identity(), new BABYLON.Vector3(0, 0, 0), BABYLON.Vector3.Zero(), 0.2, 2, this.randomLane(), Math.random());
        this.createLaneObject(roadN, "assets/models/", "Obstacle_Spikes.babylon", CollisionMeshType.spike, new BABYLON.Vector3(0.5, 0.5, 0.5), BABYLON.Quaternion.Identity(), new BABYLON.Vector3(0, 0, 0), BABYLON.Vector3.Zero(), 0.2, 0.5, this.randomLane(), Math.random());
        for (var i = 0; i < 5; i++) {
            this.createLaneObject(roadN, "assets/models/", "pickup_scarab.babylon", CollisionMeshType.scarab, new BABYLON.Vector3(2.5, 2.5, 2.5), new BABYLON.Quaternion(0, 0, 0, 1), new BABYLON.Vector3(0, 0.5, 0), BABYLON.Vector3.Zero(), 0.2, 0.5, this.randomLane(), Math.random());
        }
        this._sceneObjectFactory.createRandomTemplateSet(roadN, this._scene);
        this._roadesSpawned++;
    };
    /**
     * creates Obstacle or pickup on a lane
     */
    RoadManager.prototype.createLaneObject = function (roadN, path, file, type, scale, rotation, obstacleDisplacement, collisionMeshOffset, colliderWidth, colliderHeight, lane, tOnLane) {
        var obstacle = this._engine.createEntity();
        var obstacleTransformComponent = new ECS.ComponentTransform(this._lanes[roadN][lane].getPointAtT(tOnLane), scale, rotation);
        obstacleTransformComponent.setPosition = obstacleTransformComponent.getPosition.add(obstacleDisplacement);
        obstacle.addComponent(obstacleTransformComponent);
        var obstacleMesh = new ECS.ComponentAbstractMesh(obstacleTransformComponent, path, file);
        obstacle.addComponent(obstacleMesh);
        // collision
        obstacleMesh.setCollision(BABYLON.Mesh.CreateCylinder("LaneObject Collider", colliderHeight, colliderWidth, colliderWidth, 0, 0, this._scene));
        obstacleMesh.setColliderOffset = collisionMeshOffset;
        obstacleMesh.updateCollision();
        var arrayPosition = this.sceneObjects.length;
        this.sceneObjects[arrayPosition] = new SceneObject(obstacle, this._lanes[roadN][lane].getDistanceAtT(tOnLane));
        this.sceneObjects[arrayPosition].meshCollider = obstacleMesh.getCollider;
        this.sceneObjects[arrayPosition].meshType = type;
    };
    /**
     * returns a random lane of the road
     */
    RoadManager.prototype.randomLane = function () {
        return Math.floor((Math.random() * 3));
    };
    Object.defineProperty(RoadManager.prototype, "getStartLane", {
        /**
         * returns the first lane used in the game
         */
        get: function () {
            return this._lanes[0][1];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * updates the roadMAnager
     * @param playerT distance the player has traveled
     */
    RoadManager.prototype.update = function (playerT) {
        // spawn road if needed
        if (playerT + 60 > this._lanes[this._lanes.length - 1][1].getEndT()) {
            this.createRaodPart();
        }
        // delete road if of screen
        for (var i_1 = 0; i_1 < this._lanes.length; i_1++) {
            if (this._lanes[i_1][0].getStartT < playerT - 20) {
                this._roadMeshes[i_1].getParentEntity.destroy();
                this._roadMeshes.splice(i_1, 1);
                this._lanes.splice(i_1, 1);
            }
        }
        // delete obstacles if out of view
        /*for (var i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].spawnDistance < playerT - 10) {
                // check if object mesh is loaded before destroying it
                let meshLoaded: boolean = ((<ECS.ComponentAbstractMesh>this.obstacles[i].entity.getComponent(this._abstractMeshComponetType)).meshState == ECS.MeshLoadState.Loaded);
                if (meshLoaded) {
                    this.obstacles[i].entity.destroy();
                    this.obstacles.splice(i, 1);
                }
            }
        }*/
        // delete sceneObjects if out of view
        for (var i = 0; i < this.sceneObjects.length; i++) {
            if (this.sceneObjects[i].spawnDistance < playerT - 5) {
                // check if object mesh is loaded before destroying it
                var meshLoaded = (this.sceneObjects[i].entity.getComponent(this._abstractMeshComponetType).meshState == ECS.MeshLoadState.Loaded);
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