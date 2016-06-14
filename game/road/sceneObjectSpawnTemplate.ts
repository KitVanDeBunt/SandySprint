/**
 * spawn template for a scene object
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
    brige:boolean = false;

    /**
     * @param path path of the file
     * @param file name of the file
     * @param scale the scale of the object
     * @param randomScale random scale of the object that is multiply by a random number between -1 and 1 and added to the scale
     * @param rotation rotation of the object
     * @param rotationEnd end rotation of the object. a rotation is chosen between the start en the end rotation
     * @param objectDisplacement object position displacement
     * @param randomDisplacement displacmetn multiplyed by a random number between o and 1 that is added to the objectDisplacement
     * @param lane lane of the object
     * @param distOnRoad distance of the object on the road 
     */
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