var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * ComponentCamera
 */
var ComponentCamera = (function (_super) {
    __extends(ComponentCamera, _super);
    function ComponentCamera(transformComponent, scene) {
        _super.call(this);
        this.state = ComponentCameraState.None;
        this.scene = scene;
    }
    Object.defineProperty(ComponentCamera.prototype, "getScene", {
        get: function () {
            return this.scene;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentCamera.prototype, "getCamera", {
        get: function () {
            return this.camera;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentCamera.prototype, "setCamera", {
        set: function (camera) {
            this.camera = camera;
        },
        enumerable: true,
        configurable: true
    });
    return ComponentCamera;
}(ECS.Component));
var ComponentCameraState;
(function (ComponentCameraState) {
    ComponentCameraState[ComponentCameraState["None"] = 0] = "None";
    ComponentCameraState[ComponentCameraState["Spawned"] = 1] = "Spawned";
})(ComponentCameraState || (ComponentCameraState = {}));
//# sourceMappingURL=componentCamera.js.map