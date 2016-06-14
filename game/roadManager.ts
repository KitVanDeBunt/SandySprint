/**
 * the RoadManager manages road and the lanes and al the objects spawned on and around it
 */
class RoadManager {

    // TODO : delete spawned objects

    private _engine: ECS.Engine;
    private _scene: BABYLON.Scene;
    private _clonesCreated: boolean = false;
    private _roadMeshes: ECS.ComponentAbstractMesh[];
    private _lanes: ComponentStraightLane[][];
    private _roadesSpawned = 0;
    private _abstractMeshComponetType: string;
    private _sceneObjectFactory: SceneObjectSpawnTemplateSetFactory;

    /**
     * list of objects in the scene
     */
    sceneObjects: SceneObject[];

    /**
     * @returns returns the lanes currently in game
     */
    get getLanes(): ComponentStraightLane[][] {
        return this._lanes;
    }

    /**
     * @param engine entity component system engine
     * @param scene games scene
     */
    constructor(engine: ECS.Engine, scene: BABYLON.Scene) {
        this._lanes = [];
        this._roadMeshes = [];
        this.sceneObjects = [];
        this._engine = engine;
        this._scene = scene;

        this._abstractMeshComponetType = new ECS.ComponentAbstractMesh(null, null, null).componentType();

        // initialize scene object factory
        this._sceneObjectFactory = new SceneObjectSpawnTemplateSetFactory(this, engine);

        this.createRaodPart(false);
        this.createRaodPart(false,0);
        this.createRaodPart(false,1);
    }

    /**
     * spawns a new road section
     * @param spawnObstacles false if you dont whant obstacles on the raod
     * @param tutorialPart spawn obstacles for the tutorial if -1 no tutorial
     */
    createRaodPart(spawnObstacles:boolean = true, tutorialPart:number = -1) {

        let roadN: number = this._lanes.length;

        let road: ECS.Entity = this._engine.createEntity();

        let roadPositionComponent: ECS.ComponentTransform = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, this._roadesSpawned * 14)
            , new BABYLON.Vector3(1, 1, 1)
            , BABYLON.Quaternion.Identity()
        );

        road.addComponent(roadPositionComponent);

        let riverRoad: boolean = Math.random() > 0.8 ? true : false;
        if (riverRoad) {
            this._roadMeshes[roadN] = new ECS.ComponentAbstractMesh(roadPositionComponent, "assets/models/", "road_river.babylon");
        } else {
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

        let distanceBrige: number = -1;
        if(spawnObstacles){
            distanceBrige = this._sceneObjectFactory.createRandomRoadObjectTemplateSet(roadN, this._scene, riverRoad);
        }else if(tutorialPart == 0){
            this._sceneObjectFactory.createTutorialRoadObjectTemplateSet(roadN, this._scene, riverRoad, tutorialPart);
        }else if(tutorialPart == 1){
            this._sceneObjectFactory.createTutorialRoadObjectTemplateSet(roadN, this._scene, riverRoad, tutorialPart);
        }
        
        this._sceneObjectFactory.createRandomSceneObjectTemplateSet(roadN, this._scene, riverRoad, distanceBrige);
        
        this._roadesSpawned++;
    }


    /**
     * returns a random lane of the road
     */
    private randomLane(): number {
        return Math.floor((Math.random() * 3));
    }

    /**
     * returns the first lane used in the game
     */
    public get getStartLane(): ComponentLaneBase {
        return this._lanes[0][1];
    }

    /**
     * updates the roadMAnager
     * @param playerT distance the player has traveled
     */
    update(playerT: number) {
        // spawn road if needed
        if (playerT + 60 > this._lanes[this._lanes.length - 1][1].getEndT()) {
            this.createRaodPart();
        }
        // delete road if of screen
        for (let i = 0; i < this._lanes.length; i++) {
            if (this._lanes[i][0].getStartT < playerT - 20) {
                this._roadMeshes[i].getParentEntity.destroy();
                this._roadMeshes.splice(i, 1);
                this._lanes.splice(i, 1);
            }
        }
        // delete sceneObjects if out of view
        for (var i = 0; i < this.sceneObjects.length; i++) {
            if (this.sceneObjects[i].spawnDistance < playerT - 5) {
                // check if object mesh is loaded before destroying it
                let meshLoaded: boolean = ((<ECS.ComponentAbstractMesh>this.sceneObjects[i].entity.getComponent(this._abstractMeshComponetType)).meshState == ECS.MeshLoadState.Loaded);
                if (meshLoaded) {
                    this.sceneObjects[i].entity.destroy();
                    this.sceneObjects.splice(i, 1);
                }
            }
        }
    }

    destroy(){
        for (var i = 0; i < this._roadMeshes.length; i++) {
            this._roadMeshes[i].destroy();
        }
        for (var i = 0; i < this.sceneObjects.length; i++) {
            this.sceneObjects[i].entity.destroy();
        }
    }
}