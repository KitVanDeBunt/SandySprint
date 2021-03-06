var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * SystemMeshRender
 * creates and updates componentCameras
 */
var SystemCamera = (function (_super) {
    __extends(SystemCamera, _super);
    /**
     * @param canvas the canvas that the game is being displayed on.
     */
    function SystemCamera(canvas) {
        _super.call(this);
        // for debuging
        this._followPlayer = true;
        // get needed component types
        this.neededComponents[0] = new ECS.ComponentTransform(null, null, null).componentType();
        this.neededComponents[1] = new ComponentCamera(null, null).componentType();
        this._canvas = canvas;
    }
    /**
     * Updates every componentCamera.
     * @param entities entitys system updates
     */
    SystemCamera.prototype.Update = function (entities) {
        for (var i = 0; i < entities.length; i++) {
            if (this.checkCompatibleEntity(entities[i])) {
                // update
                var componentTransform = entities[i].getComponent(this.neededComponents[0]);
                var componentCamera = entities[i].getComponent(this.neededComponents[1]);
                switch (componentCamera.state) {
                    case ComponentCameraState.None:
                        // create camera and push it to the scene
                        var newCam = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 0.5, -1.5), componentCamera.getScene);
                        componentCamera.getScene.activeCameras.push(newCam);
                        // attach control if it does not follow
                        if (!this._followPlayer) {
                            newCam.attachControl(this._canvas, false);
                        }
                        componentCamera.setCamera = newCam;
                        //checks if it is a UI camera or not.
                        if (componentCamera.getLayermask != 0) {
                            newCam.layerMask = 0x20000000;
                            newCam.position = new BABYLON.Vector3(0, 0, -1);
                            newCam.setTarget(BABYLON.Vector3.Zero());
                            newCam.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
                            componentCamera.state = ComponentCameraState.Menu;
                        }
                        else {
                            newCam.cameraRotation = new BABYLON.Vector2(0.03, 0);
                            componentCamera.state = ComponentCameraState.Spawned;
                        }
                        componentCamera.state = ComponentCameraState.Spawned;
                        break;
                    case ComponentCameraState.Spawned:
                        if (this._followPlayer) {
                            // update camera position
                            componentCamera.getCamera.position = componentTransform.getPosition.add(new BABYLON.Vector3(0, 0.5, -1.5));
                        }
                        break;
                    case ComponentCameraState.Menu:
                        break;
                    default:
                        break;
                }
            }
        }
    };
    /**
     * @returns returns name of system as a string
     */
    SystemCamera.prototype.returnTypeOfSystem = function () {
        return "TYPE_SYSTEM_CAMERA";
    };
    /**
     * returns new instance of SystemCamera
     */
    SystemCamera.prototype.newOfThis = function () {
        return new SystemCamera(this._canvas);
    };
    return SystemCamera;
}(ECS.System));
//# sourceMappingURL=systemCamera.js.map