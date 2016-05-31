/**
 * SceneObjectSpawnTemplateSetFactory
 */
var SceneObjectSpawnTemplateSetFactory = (function () {
    function SceneObjectSpawnTemplateSetFactory(roadManger, engine) {
        this.roadManager = roadManger;
        this.engine = engine;
        // create scene object spawn templates
        this.templatesList = [];
        // create template list
        // house 01 dist 0.75
        this.templatesList[0] =
            new SceneObjectSpawnTemplate("assets/models/buildings/", "building_building_001_001_tex01.babylon", new BABYLON.Vector3(0.02, 0.02, 0.02), new BABYLON.Quaternion(0.71, 0, 0, 0.71), new BABYLON.Vector3(-2.4, 0, 0), 1, 0.15);
        // house 02 dist 0.25
        this.templatesList[1] =
            new SceneObjectSpawnTemplate("assets/models/buildings/", "building_building_002_001_tex01.babylon", new BABYLON.Vector3(0.02, 0.02, 0.02), new BABYLON.Quaternion(0.71, 0, 0, 0.71), new BABYLON.Vector3(2.4, 0, 0), 1, 0.15);
        // house 01 dist 0.75
        this.templatesList[2] =
            new SceneObjectSpawnTemplate("assets/models/buildings/", "building_building_003_001_tex01.babylon", new BABYLON.Vector3(0.02, 0.02, 0.02), new BABYLON.Quaternion(0.71, 0, 0, 0.71), new BABYLON.Vector3(2.6, 0, 0), 1, 0.60);
        // house 02 dist 0.75
        this.templatesList[3] =
            new SceneObjectSpawnTemplate("assets/models/buildings/", "building_building_002_001_tex01.babylon", new BABYLON.Vector3(0.02, 0.02, 0.02), new BABYLON.Quaternion(0.71, 0, 0, 0.71), new BABYLON.Vector3(2.4, 0, 0), 1, 0.60);
        // house 02 dist 0.75
        this.templatesList[4] =
            new SceneObjectSpawnTemplate("assets/models/buildings/", "building_building_004_001_tex01.babylon", new BABYLON.Vector3(0.02, 0.02, 0.02), new BABYLON.Quaternion(0.71, 0, 0, 0.71), new BABYLON.Vector3(-2.6, 0, 0), 1, 0.60);
        this.templatesList[5] =
            new SceneObjectSpawnTemplate("assets/models/buildings/", "building_building_001_001_tex01.babylon", new BABYLON.Vector3(0.02, 0.02, 0.02), new BABYLON.Quaternion(0.71, 0, 0, 0.71), new BABYLON.Vector3(-2.4, 0, 0), 1, 0.75);
        // house 02 dist 0.25
        this.templatesList[6] =
            new SceneObjectSpawnTemplate("assets/models/buildings/", "building_building_002_001_tex01.babylon", new BABYLON.Vector3(0.02, 0.02, 0.02), new BABYLON.Quaternion(0.71, 0, 0, 0.71), new BABYLON.Vector3(2.4, 0, 0), 1, 0.75);
        this.templatesList[7] =
            new SceneObjectSpawnTemplate("assets/models/buildings/", "building_buildingbridge_002_002_tex01.babylon", new BABYLON.Vector3(0.02, 0.02, 0.02), new BABYLON.Quaternion(0.71, 0, 0, 0.71), new BABYLON.Vector3(0, 0, 0), 1, 0.85);
        // create scene object spawn template sets
        this.templatesSetList = [];
        var listNum = 0;
        /*this.templatesSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.templatesSetList[listNum].compatableWithWaterTile = true;
        this.templatesSetList[listNum].templateList.push(this.templatesList[0]);
        this.templatesSetList[listNum].templateList.push(this.templatesList[1]);
        this.templatesSetList[listNum].templateList.push(this.templatesList[2]);
        this.templatesSetList[listNum].templateList.push(this.templatesList[3]);
        listNum++;
        this.templatesSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.templatesSetList[listNum].compatableWithWaterTile = true;
        this.templatesSetList[listNum].templateList.push(this.templatesList[0]);
        this.templatesSetList[listNum].templateList.push(this.templatesList[2]);
        listNum++;
        this.templatesSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.templatesSetList[listNum].compatableWithWaterTile = true;
        this.templatesSetList[listNum].templateList.push(this.templatesList[1]);
        this.templatesSetList[listNum].templateList.push(this.templatesList[2]);
        listNum++;
        this.templatesSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.templatesSetList[listNum].compatableWithWaterTile = true;
        this.templatesSetList[listNum].templateList.push(this.templatesList[0]);
        this.templatesSetList[listNum].templateList.push(this.templatesList[1]);
        this.templatesSetList[listNum].templateList.push(this.templatesList[4]);
        this.templatesSetList[listNum].templateList.push(this.templatesList[5]);
        this.templatesSetList[listNum].templateList.push(this.templatesList[6]);
        listNum++;*/
        this.templatesSetList[listNum] = new SceneObjectSpawnTemplateSet();
        this.templatesSetList[listNum].compatableWithWaterTile = true;
        this.templatesSetList[listNum].templateList.push(this.templatesList[0]);
        this.templatesSetList[listNum].templateList.push(this.templatesList[1]);
        this.templatesSetList[listNum].templateList.push(this.templatesList[3]);
        this.templatesSetList[listNum].templateList.push(this.templatesList[4]);
        this.templatesSetList[listNum].templateList.push(this.templatesList[7]);
    }
    SceneObjectSpawnTemplateSetFactory.prototype.createRandomTemplateSet = function (roadIndex) {
        var random = Math.floor((Math.random() * this.templatesSetList.length));
        for (var i = 0; i < this.templatesSetList[random].templateList.length; i++) {
            this.createSceneObject(this.templatesSetList[random].templateList[i], roadIndex);
        }
    };
    SceneObjectSpawnTemplateSetFactory.prototype.createSceneObject = function (sost, roadIndex) {
        var sceneObjectEntity = this.engine.createEntity();
        var sceneObjectTransformComponent = new ECS.ComponentTransform(this.roadManager.getLanes[roadIndex][sost.lane].getPointAtT(sost.distOnRoad), sost.scale, sost.rotation);
        sceneObjectTransformComponent.setPosition = sceneObjectTransformComponent.getPosition.add(sost.objectDisplacement);
        sceneObjectEntity.addComponent(sceneObjectTransformComponent);
        var sceneObjectMesh = new ECS.ComponentAbstractMesh(sceneObjectTransformComponent, sost.path, sost.file);
        sceneObjectEntity.addComponent(sceneObjectMesh);
        var arrayPosition = this.roadManager.sceneObjects.length;
        this.roadManager.sceneObjects[arrayPosition] = new SceneObject(sceneObjectEntity, this.roadManager.getLanes[roadIndex][sost.lane].getDistanceAtT(sost.distOnRoad));
    };
    return SceneObjectSpawnTemplateSetFactory;
}());
//# sourceMappingURL=sceneObjectSpawnTemplateSetFactory.js.map