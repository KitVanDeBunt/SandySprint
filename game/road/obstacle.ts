/**
 * RoadObstacle
 */
class RoadObstacle extends SceneObject {

    constructor(meshCollider: BABYLON.Mesh, meshType: CollisionMeshType, entity: ECS.Entity, spawnDistance: number) {
        super(entity, spawnDistance);
        this.hasCollider = true;
        this.meshCollider = meshCollider;
        this.meshType = meshType;
    }
}

enum CollisionMeshType {
    pillar,
    scarab
}