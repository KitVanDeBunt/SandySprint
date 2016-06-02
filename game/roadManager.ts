/**
 * the RoadManager manages road and the lanes and al the objects spawned on and around it
 */
class RoadManager {

    // TODO : delete spawned objects

    private engine: ECS.Engine;
    private scene: BABYLON.Scene;
    private clonesCreated: boolean = false;
    private roadMeshes: ECS.ComponentAbstractMesh[];
    private lanes: ComponentStraightLane[][];
    private roadesSpawned = 0;
    private abstractMeshComponetType: string;
    private sceneObjectFactory: SceneObjectSpawnTemplateSetFactory;
    /**
     * list of obstacles on the road
     */
    obstacles: RoadObstacle[];
    /**
     * list of objects in the scene
     */
    sceneObjects: SceneObject[];
    
    /**
     * @returns returns the lanes currently in game
     */
    get getLanes(): ComponentStraightLane[][] {
        return this.lanes;
    }

    constructor(engine: ECS.Engine, scene: BABYLON.Scene) {
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

    /**
     * spawns a new road section
     */
    createRaodPart() {

        let roadN: number = this.lanes.length;

        let road: ECS.Entity = this.engine.createEntity();

        let roadPositionComponent: ECS.ComponentTransform = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, this.roadesSpawned * 14)
            , new BABYLON.Vector3(1, 1, 1)
            , BABYLON.Quaternion.Identity()
        );

        road.addComponent(roadPositionComponent);
        this.roadMeshes[roadN] = new ECS.ComponentAbstractMesh(roadPositionComponent, "assets/models/", "road_plain.babylon");
        
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

        this.createLaneObject(
            roadN
            , "assets/models/"
            , "pillar.babylon"
            , CollisionMeshType.pillar
            , new BABYLON.Vector3(0.14, 0.14, 0.14)
            , BABYLON.Quaternion.Identity()
            , new BABYLON.Vector3(0, 0, 0)
            , BABYLON.Vector3.Zero()
            , 0.2
            , 2
            , this.randomLane()
        );
        
        for (var i = 0; i < 5; i++) {
            this.createLaneObject(
                roadN
                , "assets/models/"
                , "pickup_scarab.babylon"
                , CollisionMeshType.scarab
                , new BABYLON.Vector3(2.5, 2.5, 2.5)
                , new BABYLON.Quaternion(0, 0, 0, 1)
                , new BABYLON.Vector3(0, 0.5, 0)
                , BABYLON.Vector3.Zero()
                , 0.2
                , 0.5
                , this.randomLane()
            );
        }

        this.sceneObjectFactory.createRandomTemplateSet(roadN,this.scene);

        this.roadesSpawned++;
    }

    /**
     * creates Obstacle or pickup on a lane
     */
    private createLaneObject(
        roadN: number
        , path: string
        , file: string
        , type: CollisionMeshType
        , scale: BABYLON.Vector3
        , rotation: BABYLON.Quaternion
        , obstacleDisplacement: BABYLON.Vector3
        , collisionMeshOffset: BABYLON.Vector3
        , colliderWidth: number
        , colliderHeight: number
        , lane: number
    ) {
        let randomT: number = Math.random();
        let obstacle: ECS.Entity = this.engine.createEntity();
        let obstacleTransformComponent: ECS.ComponentTransform = new ECS.ComponentTransform(
            this.lanes[roadN][lane].getPointAtT(randomT)
            , scale
            , rotation
        );
        obstacleTransformComponent.setPosition = obstacleTransformComponent.getPosition.add(obstacleDisplacement);
        obstacle.addComponent(obstacleTransformComponent);
        let obstacleMesh: ECS.ComponentAbstractMesh = new ECS.ComponentAbstractMesh(obstacleTransformComponent, path, file);
        obstacle.addComponent(obstacleMesh);

        // collision
        obstacleMesh.setCollision(BABYLON.Mesh.CreateCylinder("LaneObject Collider", colliderHeight, colliderWidth, colliderWidth, 0, 0, this.scene));
        obstacleMesh.setColliderOffset = collisionMeshOffset;
        obstacleMesh.updateCollision();

        let arrayPosition: number = this.obstacles.length;
        this.obstacles[arrayPosition] = new RoadObstacle(obstacleMesh.getCollider, type, obstacle, this.lanes[roadN][lane].getDistanceAtT(randomT));
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
        return this.lanes[0][1];
    }

    /**
     * updates the roadMAnager
     * @param playerT distance the player has traveled
     */
    update(playerT: number) {
        // spawn road if needed
        if (playerT + 60 > this.lanes[this.lanes.length - 1][1].getEndT()) {
            this.createRaodPart();
        }
        // delete road if of screen
        for (let i = 0; i < this.lanes.length; i++) {
            if (this.lanes[i][0].getStartT < playerT - 20) {
                this.roadMeshes[i].getParentEntity.destroy();
                this.roadMeshes.splice(i, 1);
                this.lanes.splice(i, 1);
            }
        }
        // delete obstacles if out of view
        for (var i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].spawnDistance < playerT - 10) {
                // check if object mesh is loaded before destroying it
                let meshLoaded: boolean = ((<ECS.ComponentAbstractMesh>this.obstacles[i].entity.getComponent(this.abstractMeshComponetType)).meshState == ECS.MeshLoadState.Loaded);
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
                let meshLoaded: boolean = ((<ECS.ComponentAbstractMesh>this.sceneObjects[i].entity.getComponent(this.abstractMeshComponetType)).meshState == ECS.MeshLoadState.Loaded);
                if (meshLoaded) {
                    this.sceneObjects[i].entity.destroy();
                    this.sceneObjects.splice(i, 1);
                }
            }
        }
    }
}