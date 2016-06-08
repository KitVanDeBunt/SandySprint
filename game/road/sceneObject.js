/**
 * SceneObject
 */
var SceneObject = (function () {
    function SceneObject(entity, spawnDistance) {
        this.hasCollider = false;
        this.entity = entity;
        this.spawnDistance = spawnDistance;
    }
    Object.defineProperty(SceneObject.prototype, "meshCollider", {
        get: function () {
            return this._meshCollider;
        },
        set: function (meshCollider) {
            this.hasCollider = true;
            this._meshCollider = meshCollider;
        },
        enumerable: true,
        configurable: true
    });
    return SceneObject;
}());
var CollisionMeshType;
(function (CollisionMeshType) {
    CollisionMeshType[CollisionMeshType["spike"] = 0] = "spike";
    CollisionMeshType[CollisionMeshType["pillar"] = 1] = "pillar";
    CollisionMeshType[CollisionMeshType["scarab"] = 2] = "scarab";
})(CollisionMeshType || (CollisionMeshType = {}));
//# sourceMappingURL=sceneObject.js.map