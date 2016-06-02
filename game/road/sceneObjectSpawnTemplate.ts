/**
 * SceneObjectSpawnTemplate
 */
class SceneObjectSpawnTemplate {

    path: string;
    file: string;
    scale: BABYLON.Vector3;
    randomScale: BABYLON.Vector3;
    rotation: BABYLON.Quaternion;
    rotationEnd: BABYLON.Quaternion;
    objectDisplacement: BABYLON.Vector3;
    randomDisplacement: BABYLON.Vector3;
    lane: number;
    distOnRoad: number;
    hasCollider: boolean = false;
    collider: BABYLON.Mesh;
    colliderWidth: number;
    colliderHeight: number;
    colliderOffset: BABYLON.Vector3;
    meshType: CollisionMeshType;

    constructor(path: string
        , file: string
        , scale: BABYLON.Vector3
        , randomScale:BABYLON.Vector3
        , rotation: BABYLON.Quaternion
        , rotationEnd: BABYLON.Quaternion
        , objectDisplacement: BABYLON.Vector3
        , randomDisplacement: BABYLON.Vector3
        , lane: number
        , distOnRoad : number) {
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
}