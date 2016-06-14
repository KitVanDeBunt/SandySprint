/**
 * Obstacle on the raod
 */
class RoadObstacle extends SceneObject {
    /**
     * @param meshCollider road obstacle mesh meshCollider
     * @param meshType road obstacle mesh type
     * @param entity roadObstacle entity
     * @param spawnDistance distance on the road the object is spawned on
     */
    constructor(meshCollider: BABYLON.Mesh, meshType: CollisionMeshType, entity: ECS.Entity, spawnDistance: number) {
        super(entity, spawnDistance);
        this.meshType = meshType;
        this.meshCollider = meshCollider;
    }
}