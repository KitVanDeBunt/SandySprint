/**
 * SceneObject
 */
class SceneObject {
    
    entity: ECS.Entity;
    // distance this object is spawned om
    spawnDistance: number;
    meshType: CollisionMeshType;
    meshCollider: BABYLON.Mesh;
    hasCollider: boolean = false;

    constructor(entity: ECS.Entity, spawnDistance: number) {
        this.entity = entity;
        this.spawnDistance = spawnDistance;
    }
}