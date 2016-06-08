/**
 * RoadObstacle
 */
class RoadObstacle extends SceneObject {

    constructor(meshCollider: BABYLON.Mesh, meshType: CollisionMeshType, entity: ECS.Entity, spawnDistance: number) {
        super(entity, spawnDistance);
        this.meshType = meshType;
        this.meshCollider = meshCollider;
    }
}