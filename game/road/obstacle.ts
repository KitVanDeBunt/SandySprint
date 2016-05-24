/**
 * RoadObstacle
 */
class RoadObstacle extends SceneObject {
    meshType: CollisionMeshType;
    meshCollider: BABYLON.Mesh;

    constructor(meshCollider: BABYLON.Mesh, meshType: CollisionMeshType, entity: ECS.Entity, spawnDistance: number) {
        super(entity, spawnDistance);
        this.meshCollider = meshCollider;
        this.meshType = meshType;
    }
}

enum CollisionMeshType {
    pillar,
    scarab
}