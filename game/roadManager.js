/**
 * the RoadManager manages road and the lanes and al the objects spawned on and around it
 */
var RoadManager = (function () {
    /**
     * @param engine entity component system engine
     * @param scene games scene
     */
    function RoadManager(engine, scene) {
        this._clonesCreated = false;
        this._roadesSpawned = 0;
        this._lanes = [];
        this._roadMeshes = [];
        this.sceneObjects = [];
        this._engine = engine;
        this._scene = scene;
        this._abstractMeshComponetType = new ECS.ComponentAbstractMesh(null, null, null).componentType();
        // initialize scene object factory
        this._sceneObjectFactory = new SceneObjectSpawnTemplateSetFactory(this, engine);
        this.createRaodPart(false);
        this.createRaodPart(false, 0);
        this.createRaodPart(false, 1);
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
     * @param spawnObstacles false if you dont whant obstacles on the raod
     * @param tutorialPart spawn obstacles for the tutorial if -1 no tutorial
     */
    RoadManager.prototype.createRaodPart = function (spawnObstacles, tutorialPart) {
        if (spawnObstacles === void 0) { spawnObstacles = true; }
        if (tutorialPart === void 0) { tutorialPart = -1; }
        var roadN = this._lanes.length;
        var road = this._engine.createEntity();
        var roadPositionComponent = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, this._roadesSpawned * 14), new BABYLON.Vector3(1, 1, 1), BABYLON.Quaternion.Identity());
        road.addComponent(roadPositionComponent);
        var riverRoad = Math.random() > 0.8 ? true : false;
        if (riverRoad) {
            this._roadMeshes[roadN] = new ECS.ComponentAbstractMesh(roadPositionComponent, "assets/models/", "road_river.babylon");
        }
        else {
            this._roadMeshes[roadN] = new ECS.ComponentAbstractMesh(roadPositionComponent, "assets/models/", "road_plain.babylon");
        }
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
        var distanceBrige = -1;
        if (spawnObstacles) {
            distanceBrige = this._sceneObjectFactory.createRandomRoadObjectTemplateSet(roadN, this._scene, riverRoad);
        }
        else if (tutorialPart == 0) {
            this._sceneObjectFactory.createTutorialRoadObjectTemplateSet(roadN, this._scene, riverRoad, tutorialPart);
        }
        else if (tutorialPart == 1) {
            this._sceneObjectFactory.createTutorialRoadObjectTemplateSet(roadN, this._scene, riverRoad, tutorialPart);
        }
        this._sceneObjectFactory.createRandomSceneObjectTemplateSet(roadN, this._scene, riverRoad, distanceBrige);
        this._roadesSpawned++;
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
    RoadManager.prototype.destroy = function () {
        for (var i = 0; i < this._roadMeshes.length; i++) {
            this._roadMeshes[i].destroy();
        }
        for (var i = 0; i < this.sceneObjects.length; i++) {
            this.sceneObjects[i].entity.destroy();
        }
    };
    return RoadManager;
}());
//# sourceMappingURL=roadManager.js.map