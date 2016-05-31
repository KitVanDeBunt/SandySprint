var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ECS;
(function (ECS) {
    /**
     * component that handels position data for the engine
     */
    var ComponentTransform = (function (_super) {
        __extends(ComponentTransform, _super);
        /**
         * @param position start position
         * @param scale start scale
         * @param rotation start rotation
         */
        function ComponentTransform(position, scale, rotation) {
            _super.call(this);
            this._position = position;
            this._scale = scale;
            this._rotation = rotation;
        }
        Object.defineProperty(ComponentTransform.prototype, "getPosition", {
            /**
             * @return returns the position of this component
             */
            get: function () {
                return this._position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentTransform.prototype, "setPosition", {
            /**
             * sets the position of this component
             * @param newPosition the new position of this component
             */
            set: function (newPosition) {
                this._position = newPosition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentTransform.prototype, "getRotationQuaternion", {
            /**
             * @returns returns the rotation quaturnion of this component
             */
            get: function () {
                return this._rotation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentTransform.prototype, "setRotationQuaternion", {
            /**
             * sets an new roation quaturnion on this component
             * @param newQuaternion new rotation
             */
            set: function (newQuaternion) {
                this._rotation = newQuaternion;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentTransform.prototype, "getScale", {
            /**
             * @returns the scale of this components
             */
            get: function () {
                return this._scale;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentTransform.prototype, "setScale", {
            /**
             * @param newScale sets a new scale on this mesh
             */
            set: function (newScale) {
                this._scale = newScale;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * returns a new ComponentTransform
         * @returns new ComponentTransform
         */
        ComponentTransform.prototype.newOfThis = function () {
            return new ComponentTransform(BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero(), BABYLON.Quaternion.Identity());
        };
        return ComponentTransform;
    }(ECS.Component));
    ECS.ComponentTransform = ComponentTransform;
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.componentTransform.js.map