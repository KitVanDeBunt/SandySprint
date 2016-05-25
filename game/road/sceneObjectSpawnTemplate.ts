/**
 * SceneObjectSpawnTemplate
 */
class SceneObjectSpawnTemplate {

    path: string;
    file: string;
    scale: BABYLON.Vector3;
    rotation: BABYLON.Quaternion;
    objectDisplacement: BABYLON.Vector3;
    lane: number;
    distOnRoad: number;

    constructor(path: string
        , file: string
        , scale: BABYLON.Vector3
        , rotation: BABYLON.Quaternion
        , objectDisplacement: BABYLON.Vector3
        , lane: number
        , distOnRoad : number) {
        this.path = path;
        this.file = file;
        this.scale = scale;
        this.rotation = rotation;
        this.objectDisplacement = objectDisplacement;
        this.lane = lane;
        this.distOnRoad = distOnRoad;
    }
}