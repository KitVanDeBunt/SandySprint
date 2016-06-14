/**
 * SceneObjectSpawnTemplateSetFactory
 */
class SceneObjectSpawnTemplateSetFactory {

    private roadTemplateSetList: SceneObjectSpawnTemplateSet[];
    private tutorialRoadTemplateSetList: SceneObjectSpawnTemplateSet[];
    private sceneTemplatesSetList: SceneObjectSpawnTemplateSet[];
    private templatesListBuildings: ((distanceOnRoad: number) => SceneObjectSpawnTemplate)[];
    private templatesListRoadObjects: ((distanceOnRoad: number, lane: number) => SceneObjectSpawnTemplate)[];
    private templatesListVegitation: ((distanceOnRoad: number, positionDisplacment: BABYLON.Vector3, randomDisplacement: BABYLON.Vector3, randomScale: BABYLON.Vector3) => SceneObjectSpawnTemplate)[];
    private roadManager: RoadManager;
    private engine: ECS.Engine;

    /**
     * @param roadManager games road manager
     * @params engine games engine
     */
    constructor(roadManger: RoadManager, engine: ECS.Engine) {

        this.roadManager = roadManger;
        this.engine = engine;

        // create scene object spawn templates

        this.createBuildingTemplates();
        this.createVegitationTemplates();
        this.createRoadObjectTemplates();
        let listNum: number = 0;

        // create road object spawn template sets for the tutorial
        this.tutorialRoadTemplateSetList = [];
        this.tutorialRoadTemplateSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.tutorialRoadTemplateSetList[listNum].compatableWithWaterTile = true;
        this.tutorialRoadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.PILLAR]((18 / 28), 1));
        listNum++;
        this.tutorialRoadTemplateSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.tutorialRoadTemplateSetList[listNum].compatableWithWaterTile = true;
        this.tutorialRoadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.PILLAR]((18 / 28), 0));
        this.tutorialRoadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.PILLAR]((18 / 28), 2));
        this.tutorialRoadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SPIKE]((18 / 28), 1));
        listNum++;

        // create road object spawn template sets
        this.roadTemplateSetList = [];
        listNum = 0;
        this.roadTemplateSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.roadTemplateSetList[listNum].compatableWithWaterTile = true;

        //pillars
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.PILLAR]((6 / 28), 0));
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.PILLAR]((6 / 28), 1));
        //scarabs
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SCARAB]((6 / 28), 2));
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SCARAB]((7 / 28), 2));
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SCARAB]((8 / 28), 2));
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SCARAB]((9 / 28), 1));
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SCARAB]((10 / 28), 1));
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SCARAB]((11 / 28), 2));
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SCARAB]((12 / 28), 2));
        //pillars
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.BUILDING_BRIGE_002]((13 / 28), 1));
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.PILLAR]((13 / 28), 2));
        //scarabs
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SCARAB]((13 / 28), 0));
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SCARAB]((14 / 28), 0));
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SCARAB]((15 / 28), 0));
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SCARAB]((16 / 28), 1));
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SCARAB]((17 / 28), 1));
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SCARAB]((18 / 28), 2));
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SCARAB]((19 / 28), 2));
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SCARAB]((20 / 28), 2));
        // pillars
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.PILLAR]((20 / 28), 0));
        this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.PILLAR]((20 / 28), 1));
        listNum++;
        // ---------------- start
        //this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.PILLAR]((27 / 28), 0));
        //this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.SPIKE]((27 / 28), 1));
        //this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[ID.PILLAR]((27 / 28), 2));
        // ---------------- end

        //this.roadTemplateSetList[listNum].templateList.push(this.templatesListRoadObjects[3](0.75, 1));

        /**
         * creation of sceneTemplatesSetListre
         */
        this.sceneTemplatesSetList = [];
        listNum = 0;
        this.sceneTemplatesSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.sceneTemplatesSetList[listNum].compatableWithWaterTile = true;
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[0](0.15));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[1](0.15));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[2](0.6));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[1](0.6));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[2](0.45));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[1](0.45));

        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));

        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        listNum++;

        this.sceneTemplatesSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.sceneTemplatesSetList[listNum].compatableWithWaterTile = true;
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[0](0.15));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[2](0.6));

        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));

        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        listNum++;

        this.sceneTemplatesSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.sceneTemplatesSetList[listNum].compatableWithWaterTile = true;
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[1](0.15));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[2](0.6));

        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));

        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        listNum++;

        this.sceneTemplatesSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.sceneTemplatesSetList[listNum].compatableWithWaterTile = true;
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[0](0.15));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[1](0.15));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[3](0.6));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[4](0.6));
        //this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[6](0.75));

        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));

        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        listNum++;

        this.sceneTemplatesSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.sceneTemplatesSetList[listNum].compatableWithWaterTile = true;
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[0](0.15));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[1](0.15));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[1](0.6));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[3](0.6));
        //this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListBuildings[6](0.85));

        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));

        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.sceneTemplatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));

    }

    /**
     * creates the road object template list 
     */
    private createRoadObjectTemplates() {

        this.templatesListRoadObjects = [];

        this.templatesListRoadObjects[0] = function (distanceOnRoad: number, lane: number) {
            let spawnTeplate: SceneObjectSpawnTemplate = new SceneObjectSpawnTemplate(
                "assets/models/"
                , "pillar.babylon"
                , new BABYLON.Vector3(0.14, 0.14, 0.14)
                , new BABYLON.Vector3(0.0, 0.0, 0.0)
                , BABYLON.Quaternion.Identity()
                , BABYLON.Quaternion.Identity()
                , BABYLON.Vector3.Zero()
                , BABYLON.Vector3.Zero()
                , lane
                , distanceOnRoad
            );

            spawnTeplate.hasCollider = true;
            spawnTeplate.colliderWidth = 0.2;
            spawnTeplate.colliderHeight = 2;
            spawnTeplate.colliderOffset = BABYLON.Vector3.Zero();
            spawnTeplate.meshType = CollisionMeshType.pillar;
            return spawnTeplate;
        }

        this.templatesListRoadObjects[1] = function (distanceOnRoad: number, lane: number) {
            let spawnTeplate: SceneObjectSpawnTemplate = new SceneObjectSpawnTemplate(
                "assets/models/"
                , "Obstacle_Spikes.babylon"
                , new BABYLON.Vector3(0.5, 0.5, 0.5)
                , new BABYLON.Vector3(0.0, 0.0, 0.0)
                , BABYLON.Quaternion.Identity()
                , BABYLON.Quaternion.Identity()
                , BABYLON.Vector3.Zero()
                , BABYLON.Vector3.Zero()
                , lane
                , distanceOnRoad
            );

            spawnTeplate.hasCollider = true;
            spawnTeplate.colliderWidth = 0.2;
            spawnTeplate.colliderHeight = 0.5;
            spawnTeplate.colliderOffset = BABYLON.Vector3.Zero();
            spawnTeplate.meshType = CollisionMeshType.spike;
            return spawnTeplate;
        }

        this.templatesListRoadObjects[2] = function (distanceOnRoad: number, lane: number) {
            let spawnTeplate: SceneObjectSpawnTemplate = new SceneObjectSpawnTemplate(
                "assets/models/"
                , "pickup_scarab.babylon"
                , new BABYLON.Vector3(2.0, 2.0, 2.0)
                , new BABYLON.Vector3(0, 0, 0)
                , BABYLON.Quaternion.Identity()
                , BABYLON.Quaternion.Identity()
                , new BABYLON.Vector3(0, 0.4, 0)
                , BABYLON.Vector3.Zero()
                , lane
                , distanceOnRoad
            );

            spawnTeplate.hasCollider = true;
            spawnTeplate.colliderWidth = 0.2;
            spawnTeplate.colliderHeight = 0.5;
            spawnTeplate.colliderOffset = BABYLON.Vector3.Zero();
            spawnTeplate.meshType = CollisionMeshType.scarab;
            return spawnTeplate;
        }

        this.templatesListRoadObjects[3] = function (distanceOnRoad: number, lane: number) {
            lane = 1; // lane always has to be one for this building
            let buildingTemplate: SceneObjectSpawnTemplate = new SceneObjectSpawnTemplate(
                "assets/models/buildings/"
                , "building_buildingbridge_002_002_tex01.babylon"
                , new BABYLON.Vector3(0.02, 0.02, 0.02)
                , new BABYLON.Vector3(0, 0, 0)
                , new BABYLON.Quaternion(0.71, 0, 0, 0.71)
                , new BABYLON.Quaternion(0.71, 0, 0, 0.71)
                , new BABYLON.Vector3(0, 0, 0)
                , new BABYLON.Vector3(0, 0, 0)
                , lane
                , distanceOnRoad//0.85
            );
            buildingTemplate.hasCollider = true;
            buildingTemplate.colliderWidth = 0.2;
            buildingTemplate.colliderHeight = 2;
            buildingTemplate.colliderOffset = BABYLON.Vector3.Zero();
            buildingTemplate.meshType = CollisionMeshType.pillar;

            buildingTemplate.brige = true;

            return buildingTemplate;
        };
    }

    /**
     * creates the vegitation template list
     */
    private createVegitationTemplates() {

        this.templatesListVegitation = [];

        this.templatesListVegitation[0] = function (distanceOnRoad: number, displacment: BABYLON.Vector3, randomDisplacement: BABYLON.Vector3, randomScale: BABYLON.Vector3) {
            return new SceneObjectSpawnTemplate(
                "assets/models/"
                , "vegitation_palm_001.babylon"
                , new BABYLON.Vector3(0.15, 0.15, 0.15)
                , randomScale
                , new BABYLON.Quaternion(-0, -.92, 0, -0.38)
                , new BABYLON.Quaternion(0, .92, 0, -0.38)
                , displacment
                , randomDisplacement
                , 1
                , distanceOnRoad
            );
        };

        this.templatesListVegitation[1] = function (distanceOnRoad: number, displacment: BABYLON.Vector3, randomDisplacement: BABYLON.Vector3, randomScale: BABYLON.Vector3) {
            return new SceneObjectSpawnTemplate(
                "assets/models/"
                , "vegitation_plant_001.babylon"
                , new BABYLON.Vector3(0.15, 0.15, 0.15)
                , randomScale
                , new BABYLON.Quaternion(-0, -.92, 0, -0.38)
                , new BABYLON.Quaternion(0, .92, 0, -0.38)
                , displacment
                , randomDisplacement
                , 1
                , distanceOnRoad
            );
        };
    }

    /**
     *  creates the building template list
     */
    private createBuildingTemplates() {

        this.templatesListBuildings = [];
        // house 01
        this.templatesListBuildings[0] = function (distanceOnRoad: number) {
            return new SceneObjectSpawnTemplate(
                "assets/models/buildings/"
                , "building_building_001_001_tex01.babylon"
                , new BABYLON.Vector3(0.02, 0.02, 0.02)
                , new BABYLON.Vector3(0, 0, 0)
                , new BABYLON.Quaternion(0.71, 0, 0, 0.71)
                , new BABYLON.Quaternion(0.71, 0, 0, 0.71)
                , new BABYLON.Vector3(-2.4, 0, 0)
                , new BABYLON.Vector3(.5, 0, 0)
                , 1
                , distanceOnRoad//0.15
            )
        };
        // house 02
        this.templatesListBuildings[1] = function (distanceOnRoad: number) {
            return new SceneObjectSpawnTemplate(
                "assets/models/buildings/"
                , "building_building_002_001_tex01.babylon"
                , new BABYLON.Vector3(0.02, 0.02, 0.02)
                , new BABYLON.Vector3(0, 0, 0)
                , new BABYLON.Quaternion(0.71, 0, 0, 0.71)
                , new BABYLON.Quaternion(0.71, 0, 0, 0.71)
                , new BABYLON.Vector3(2.4, 0, 0)
                , new BABYLON.Vector3(.5, 0, 0)
                , 1
                , distanceOnRoad//0.15
            );
        };
        // house 03
        this.templatesListBuildings[2] = function (distanceOnRoad: number) {
            return new SceneObjectSpawnTemplate(
                "assets/models/buildings/"
                , "building_building_003_001_tex01.babylon"
                , new BABYLON.Vector3(0.02, 0.02, 0.02)
                , new BABYLON.Vector3(0, 0, 0)
                , new BABYLON.Quaternion(0.71, 0, 0, 0.71)
                , new BABYLON.Quaternion(0.71, 0, 0, 0.71)
                , new BABYLON.Vector3(2.6, 0, 0)
                , new BABYLON.Vector3(.5, 0, 0)
                , 1
                , distanceOnRoad//0.6
            );
        };
        // house 04
        this.templatesListBuildings[3] = function (distanceOnRoad: number) {
            return new SceneObjectSpawnTemplate(
                "assets/models/buildings/"
                , "building_building_004_001_tex01.babylon"
                , new BABYLON.Vector3(0.02, 0.02, 0.02)
                , new BABYLON.Vector3(0, 0, 0)
                , new BABYLON.Quaternion(0.71, 0, 0, 0.71)
                , new BABYLON.Quaternion(0.71, 0, 0, 0.71)
                , new BABYLON.Vector3(-2.6, 0, 0)
                , new BABYLON.Vector3(.5, 0, 0)
                , 1
                , distanceOnRoad//0.6
            );
        };
        // TODO : two times house 01
        // house 01
        this.templatesListBuildings[4] = function (distanceOnRoad: number) {
            return new SceneObjectSpawnTemplate(
                "assets/models/buildings/"
                , "building_building_001_001_tex01.babylon"
                , new BABYLON.Vector3(0.02, 0.02, 0.02)
                , new BABYLON.Vector3(0, 0, 0)
                , new BABYLON.Quaternion(0.71, 0, 0, 0.71)
                , new BABYLON.Quaternion(0.71, 0, 0, 0.71)
                , new BABYLON.Vector3(-2.4, 0, 0)
                , new BABYLON.Vector3(.5, 0, 0)
                , 1
                , distanceOnRoad//0.6
            );
        };
        // TODO : two times house 02
        // house 02
        this.templatesListBuildings[5] = function (distanceOnRoad: number) {
            return new SceneObjectSpawnTemplate(
                "assets/models/buildings/"
                , "building_building_002_001_tex01.babylon"
                , new BABYLON.Vector3(0.02, 0.02, 0.02)
                , new BABYLON.Vector3(0, 0, 0)
                , new BABYLON.Quaternion(0.71, 0, 0, 0.71)
                , new BABYLON.Quaternion(0.71, 0, 0, 0.71)
                , new BABYLON.Vector3(2.4, 0, 0)
                , new BABYLON.Vector3(0, 0, 0)
                , 1
                , distanceOnRoad//0.75
            );
        };

    }

    private randomListNumber(list: any[]): number {
        return Math.floor((Math.random() * list.length));
    }

    /**
     * creates a new random set of scene objects to spawn around and on the world
     */
    public createRandomSceneObjectTemplateSet(roadIndex: number, scene: BABYLON.Scene, riverRoad: boolean, distanceBrige: number) {
        let random: number = this.randomListNumber(this.sceneTemplatesSetList);

        for (var i = 0; i < this.sceneTemplatesSetList[random].templateList.length; i++) {
            if (riverRoad) {
                if (0.5 > this.sceneTemplatesSetList[random].templateList[i].distOnRoad - 0.1
                    && 0.5 < this.sceneTemplatesSetList[random].templateList[i].distOnRoad + 0.1) {
                    continue; // object not spawn because there already is a river
                }
            }
            if (distanceBrige > this.sceneTemplatesSetList[random].templateList[i].distOnRoad - 0.2
                && distanceBrige < this.sceneTemplatesSetList[random].templateList[i].distOnRoad + 0.2) {
                continue; // object not spawn because there already is a brige
            }
            this.createSceneObject(this.sceneTemplatesSetList[random].templateList[i], scene, roadIndex);
        }
    }

    /**
     * Spawn a set of interactable objects on the road
     * @param roadIndex index of the road where the objects have to be spawned on
     * @param scene games scene
     * @param riverRoad if the road where the objects are spawned on a river or not
     * @param spawnTemplatSet set of objects to be spawned
     * @returns distance of a brige placed on the road if no brige is placed -1 is returned
     */
    private createRoadObjectTemplateSet(roadIndex: number, scene: BABYLON.Scene, riverRoad: boolean, spawnTemplatSet: SceneObjectSpawnTemplateSet) {
        let brigePosition: number = -1;

        for (var i = 0; i < spawnTemplatSet.templateList.length; i++) {
            if (spawnTemplatSet.templateList[i].brige) {
                if (riverRoad) {
                    // create regular pillar instead of brige on river road
                    this.createSceneObject(this.templatesListRoadObjects[ID.PILLAR](spawnTemplatSet.templateList[i].distOnRoad, 1), scene, roadIndex);
                    continue;
                }
                brigePosition = spawnTemplatSet.templateList[i].distOnRoad;
            }
            this.createSceneObject(spawnTemplatSet.templateList[i], scene, roadIndex);
        }

        return brigePosition;
    }

    /**
     * Spawn a random set of interactable objects on the road
     * @param roadIndex index of the road where the objects have to be spawned on
     * @param scene games scene
     * @param riverRoad if the road where the objects are spawned on a river or not
     * @returns distance of a brige placed on the road if no brige is placed -1 is returned
     */
    public createRandomRoadObjectTemplateSet(roadIndex: number, scene: BABYLON.Scene, riverRoad: boolean): number {
        let random: number = this.randomListNumber(this.roadTemplateSetList);
        let brigePosition: number = this.createRoadObjectTemplateSet(roadIndex, scene, riverRoad, this.roadTemplateSetList[random]);
        return brigePosition;
    }

    /**
     * Spawn a set of interactable objects on the road that are intanded to use with a tutorial
     * @param roadIndex index of the road where the objects have to be spawned on
     * @param scene games scene
     * @param riverRoad if the road where the objects are spawned on a river or not
     * @param tuturialSetIndex index of the set of objects to be spawned for the tutorial part
     * @returns distance of a brige placed on the road if no brige is placed -1 is returned
     */
    public createTutorialRoadObjectTemplateSet(roadIndex: number, scene: BABYLON.Scene, riverRoad: boolean, tuturialSetIndex: number): number {
        let brigePosition: number = this.createRoadObjectTemplateSet(roadIndex, scene, riverRoad, this.tutorialRoadTemplateSetList[tuturialSetIndex]);
        return brigePosition;
    }

    private createSceneObject(sost: SceneObjectSpawnTemplate, scene: BABYLON.Scene, roadIndex: number) {

        let randomNum: number = (Math.random() * 2) - 1;
        let randomNum2: number = Math.random(); //random scale 
        let randomNum3: number = Math.random(); //random rotation 

        let sceneObjectEntity: ECS.Entity = this.engine.createEntity();
        let sceneObjectTransformComponent: ECS.ComponentTransform = new ECS.ComponentTransform(
            this.roadManager.getLanes[roadIndex][sost.lane].getPointAtT(sost.distOnRoad)
            , sost.scale.add(sost.randomScale.multiplyByFloats(randomNum2, randomNum2, randomNum2))
            , BABYLON.Quaternion.Slerp(sost.rotation, sost.rotationEnd, randomNum3)
        );
        sceneObjectTransformComponent.setPosition = sceneObjectTransformComponent.getPosition.add(sost.objectDisplacement.add(sost.randomDisplacement.multiplyByFloats(randomNum, randomNum, randomNum)));
        sceneObjectEntity.addComponent(sceneObjectTransformComponent);
        let sceneObjectMesh: ECS.ComponentAbstractMesh = new ECS.ComponentAbstractMesh(sceneObjectTransformComponent, sost.path, sost.file);
        sceneObjectEntity.addComponent(sceneObjectMesh);

        let arrayPosition: number = this.roadManager.sceneObjects.length;
        let sceneObject: SceneObject = new SceneObject(sceneObjectEntity, this.roadManager.getLanes[roadIndex][sost.lane].getDistanceAtT(sost.distOnRoad));

        if (sost.hasCollider) {
            sceneObjectMesh.setCollision(BABYLON.Mesh.CreateCylinder("LaneObject Collider", sost.colliderHeight, sost.colliderWidth, sost.colliderWidth, 0, 0, scene));
            sceneObjectMesh.setColliderOffset = sost.colliderOffset;
            sceneObjectMesh.updateCollision();
            sceneObject.hasCollider = true;
            sceneObject.meshCollider = sceneObjectMesh.getCollider;
            sceneObject.meshType = sost.meshType;
        }

        this.roadManager.sceneObjects[arrayPosition] = sceneObject;
    }
}