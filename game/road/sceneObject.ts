/**
 * SceneObject
 */
class SceneObject {
    
    entity: ECS.Entity;
    // distance this object is spawned om
    spawnDistance: number;

    constructor(entity: ECS.Entity, spawnDistance: number) {
        this.entity = entity;
        this.spawnDistance = spawnDistance;
    }
}