///-not in use <reference path="../../../src/math/babylon.math.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ECS;
(function (ECS) {
    /**
     * ComponentPosition
     */
    var ComponentTransform = (function (_super) {
        __extends(ComponentTransform, _super);
        function ComponentTransform(position, scale, rotation) {
            _super.call(this);
            this.position = position;
            this.scale = scale;
            this.rotation = rotation;
        }
        Object.defineProperty(ComponentTransform.prototype, "getPosition", {
            get: function () {
                return this.position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentTransform.prototype, "setPosition", {
            set: function (newPosition) {
                this.position = newPosition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentTransform.prototype, "getRotationQuaternion", {
            get: function () {
                return this.rotation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentTransform.prototype, "setRotationQuaternion", {
            set: function (newQuaternion) {
                this.rotation = newQuaternion;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentTransform.prototype, "getScale", {
            get: function () {
                return this.scale;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentTransform.prototype, "setScale", {
            set: function (newScale) {
                this.scale = newScale;
            },
            enumerable: true,
            configurable: true
        });
        ComponentTransform.prototype.newOfThis = function () {
            return new ComponentTransform(BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero(), BABYLON.Quaternion.Identity());
        };
        return ComponentTransform;
    }(ECS.Component));
    ECS.ComponentTransform = ComponentTransform;
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.componentTransform.js.map