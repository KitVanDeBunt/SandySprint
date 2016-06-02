/**
 * SceneObjectSpawnTemplate
 */
var SceneObjectSpawnTemplate = (function () {
    function SceneObjectSpawnTemplate(path, file, scale, randomScale, rotation, rotationEnd, objectDisplacement, randomDisplacement, lane, distOnRoad) {
        this.hasCollider = false;
        this.path = path;
        this.file = file;
        this.scale = scale;
        this.randomScale = randomScale;
        this.rotation = rotation;
        this.rotationEnd = rotationEnd;
        this.objectDisplacement = objectDisplacement;
        this.randomDisplacement = randomDisplacement;
        this.lane = lane;
        this.distOnRoad = distOnRoad;
    }
    return SceneObjectSpawnTemplate;
}());
//# sourceMappingURL=sceneObjectSpawnTemplate.js.map