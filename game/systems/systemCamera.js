var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * SystemMeshRender
 */
var SystemCamera = (function (_super) {
    __extends(SystemCamera, _super);
    function SystemCamera(canvas) {
        _super.call(this);
        // get needed component types
        this.neededComponents[0] = new ECS.ComponentTransform(null, null).componentType();
        this.neededComponents[1] = new ComponentCamera(null, null).componentType();
        this.canvas = canvas;
    }
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
                        // attach the  camera to the canvas
                        //cam.attachControl(this.canvas, false);
                        componentCamera.setCamera = newCam;
                        newCam.cameraRotation = new BABYLON.Vector2(0.03, 0);
                        //cam.position = new BABYLON.Vector3(0,0,0);
                        componentCamera.state = ComponentCameraState.Spawned;
                        break;
                    case ComponentCameraState.Spawned:
                        // update camera position
                        componentCamera.getCamera.position = componentTransform.getPosition.add(new BABYLON.Vector3(0, 0.5, -1.5));
                        break;
                    default:
                        break;
                }
            }
        }
    };
    SystemCamera.prototype.returnTypeOfSystem = function () {
        return "TYPE_SYSTEM_CAMERA";
    };
    SystemCamera.prototype.newOfThis = function () {
        return new SystemCamera(this.canvas);
    };
    return SystemCamera;
}(ECS.System));
//# sourceMappingURL=systemCamera.js.map