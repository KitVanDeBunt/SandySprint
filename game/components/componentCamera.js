var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * ComponentCamera
 * A component that contains a camera.
 * Managed by SystemCamera.
 */
var ComponentCamera = (function (_super) {
    __extends(ComponentCamera, _super);
    /**
     * @param transformComponent the ComponentTransform attached to the entity.
     * @param scene the scene of the game.
     */
    function ComponentCamera(transformComponent, scene) {
        _super.call(this);
        this._layer = 0;
        this.state = ComponentCameraState.None;
        this._scene = scene;
    }
    Object.defineProperty(ComponentCamera.prototype, "getScene", {
        get: function () {
            return this._scene;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentCamera.prototype, "getCamera", {
        get: function () {
            return this._camera;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentCamera.prototype, "getLayermask", {
        get: function () {
            return this._layer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentCamera.prototype, "setCamera", {
        set: function (camera) {
            this._camera = camera;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentCamera.prototype, "setLayermask", {
        set: function (layer) {
            this._layer = layer;
        },
        enumerable: true,
        configurable: true
    });
    return ComponentCamera;
}(ECS.Component));
var ComponentCameraState;
(function (ComponentCameraState) {
    ComponentCameraState[ComponentCameraState["None"] = 0] = "None";
    ComponentCameraState[ComponentCameraState["Menu"] = 1] = "Menu";
    ComponentCameraState[ComponentCameraState["Spawned"] = 2] = "Spawned";
})(ComponentCameraState || (ComponentCameraState = {}));
//# sourceMappingURL=componentCamera.js.map