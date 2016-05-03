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
    function SystemCamera() {
        _super.call(this);
        // get needed component types
        this.neededComponents[0] = new ECS.ComponentTransform(null, null).componentType();
        this.neededComponents[1] = new ComponentCamera(null, null).componentType();
    }
    SystemCamera.prototype.Update = function (entities) {
        for (var i = 0; i < entities.length; i++) {
            var updateAbleEntity = true;
            for (var j = 0; j < this.neededComponents.length; j++) {
                var neededComponentFound = false;
                for (var k = 0; k < entities[i].getComponentTypes.length; k++) {
                    if (entities[i].getComponentTypes[k] == this.neededComponents[j]) {
                        neededComponentFound = true;
                        break;
                    }
                    ;
                }
                if (!neededComponentFound) {
                    updateAbleEntity = false;
                    break;
                }
            }
            if (updateAbleEntity) {
                // update
                var componentTransform = entities[i].getComponent(this.neededComponents[0]);
                var componentCamera = entities[i].getComponent(this.neededComponents[1]);
                if (componentCamera.state == ComponentCameraState.None) {
                    var cam = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 20, -50), componentCamera.getScene);
                    componentCamera.setCamera = cam;
                    //componentCamera.getCamera. = new BABYLON.Vector3(0,0,-100);
                    componentCamera.state = ComponentCameraState.Spawned;
                }
            }
        }
    };
    SystemCamera.prototype.returnTypeOfSystem = function () {
        return "TYPE_SYSTEM_CAMERA";
    };
    SystemCamera.prototype.newOfThis = function () {
        return new SystemCamera();
    };
    return SystemCamera;
}(ECS.System));
//# sourceMappingURL=systemCamera.js.map