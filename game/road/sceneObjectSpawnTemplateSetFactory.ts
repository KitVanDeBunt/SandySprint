/**
 * SceneObjectSpawnTemplateSetFactory
 */
class SceneObjectSpawnTemplateSetFactory {

    private templatesSetList: SceneObjectSpawnTemplateSet[];
    private templatesListBuildings: ((distanceOnRoad: number) => SceneObjectSpawnTemplate)[];
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
        this.templatesListBuildings = [];
        this.templatesListVegitation = [];



        // create template list

        // house 01 dist 0.75
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
        // house 02 dist 0.25
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
        // house 01 dist 0.75
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

        // house 02 dist 0.75
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

        // house 02 dist 0.25
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

        this.templatesListBuildings[6] = function (distanceOnRoad: number) {
            let buildingTemplate:SceneObjectSpawnTemplate = new SceneObjectSpawnTemplate(
                "assets/models/buildings/"
                , "building_buildingbridge_002_002_tex01.babylon"
                , new BABYLON.Vector3(0.02, 0.02, 0.02)
                , new BABYLON.Vector3(0, 0, 0)
                , new BABYLON.Quaternion(0.71, 0, 0, 0.71)
                , new BABYLON.Quaternion(0.71, 0, 0, 0.71)
                , new BABYLON.Vector3(0, 0, 0)
                , new BABYLON.Vector3(0, 0, 0)
                , 1
                , distanceOnRoad//0.85
            );
            buildingTemplate.hasCollider = true;
            buildingTemplate.colliderWidth = 0.2;
            buildingTemplate.colliderHeight = 2;
            buildingTemplate.colliderOffset = BABYLON.Vector3.Zero();
            buildingTemplate.meshType = CollisionMeshType.pillar;
            
            return buildingTemplate;
        };

        // create template list vegitation
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

        // create scene object spawn template sets
        this.templatesSetList = [];

        let listNum: number = 0;
        
        this.templatesSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.templatesSetList[listNum].compatableWithWaterTile = true;
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[0](0.15));
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[1](0.15));
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[2](0.6));
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[1](0.6));
        
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        listNum++;
        
        this.templatesSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.templatesSetList[listNum].compatableWithWaterTile = true;
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[0](0.15));
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[2](0.6));
        
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        listNum++;
        
        this.templatesSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.templatesSetList[listNum].compatableWithWaterTile = true;
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[1](0.15));
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[2](0.6));
        
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        listNum++;
        
        this.templatesSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.templatesSetList[listNum].compatableWithWaterTile = true;
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[0](0.15));
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[1](0.15));
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[3](0.6));
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[4](0.6));
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[6](0.75));
        
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        listNum++;

        this.templatesSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.templatesSetList[listNum].compatableWithWaterTile = true;
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[0](0.15));
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[1](0.15));
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[1](0.6));
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[3](0.6));
        this.templatesSetList[listNum].templateList.push(this.templatesListBuildings[6](0.85));

        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(-1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.30, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.55, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
        this.templatesSetList[listNum].templateList.push(this.templatesListVegitation[0](0.70, new BABYLON.Vector3(1.7, 0, 0), new BABYLON.Vector3(0.3, 0, 0.2), new BABYLON.Vector3(0.08, 0.08, 0.08)));
    }

    /**
     * creates a new random set of scene objects to spawn around and on the world
     */
    public createRandomTemplateSet(roadIndex: number,scene:BABYLON.Scene) {

        let random: number = Math.floor((Math.random() * this.templatesSetList.length));

        for (var i = 0; i < this.templatesSetList[random].templateList.length; i++) {
            this.createSceneObject(this.templatesSetList[random].templateList[i],scene, roadIndex);
        }
    }

    private createSceneObject(sost: SceneObjectSpawnTemplate, scene:BABYLON.Scene, roadIndex: number) {

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
        let sceneObject:SceneObject = new SceneObject(sceneObjectEntity, this.roadManager.getLanes[roadIndex][sost.lane].getDistanceAtT(sost.distOnRoad));
        
        if(sost.hasCollider){
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