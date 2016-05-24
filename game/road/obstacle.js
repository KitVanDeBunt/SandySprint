var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * RoadObstacle
 */
var RoadObstacle = (function (_super) {
    __extends(RoadObstacle, _super);
    function RoadObstacle(meshCollider, meshType, entity, spawnDistance) {
        _super.call(this, entity, spawnDistance);
        this.meshCollider = meshCollider;
        this.meshType = meshType;
    }
    return RoadObstacle;
}(SceneObject));
var CollisionMeshType;
(function (CollisionMeshType) {
    CollisionMeshType[CollisionMeshType["pillar"] = 0] = "pillar";
    CollisionMeshType[CollisionMeshType["scarab"] = 1] = "scarab";
})(CollisionMeshType || (CollisionMeshType = {}));
//# sourceMappingURL=obstacle.js.map