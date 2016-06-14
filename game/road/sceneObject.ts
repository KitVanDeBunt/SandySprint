/**
 * Object in the scene
 */
class SceneObject {

    entity: ECS.Entity;
    /**
     * distance this object is spawned om 
     */
    spawnDistance: number;
    meshType: CollisionMeshType;
    hasCollider: boolean = false;
    
    private _meshCollider: BABYLON.Mesh;

    /**
     * @param entity entity of the scene object
     * @param distance on the road of the scene object
     */
    constructor(entity: ECS.Entity, spawnDistance: number) {
        this.entity = entity;
        this.spawnDistance = spawnDistance;
    }
    
    set meshCollider(meshCollider:BABYLON.Mesh){
        this.hasCollider = true;
        this._meshCollider = meshCollider;
    }
    
    get meshCollider():BABYLON.Mesh{
        return this._meshCollider;
    }
}


enum CollisionMeshType {
    spike,
    pillar,
    scarab
}