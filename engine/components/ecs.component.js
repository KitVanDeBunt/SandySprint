var ECS;
(function (ECS) {
    /**
     * Component abstract base class for components used in the entity component system
     */
    var Component = (function () {
        function Component() {
            this._isDestroyed = false;
        }
        Object.defineProperty(Component.prototype, "setParentEntity", {
            /**
             * sets the parent entity
             */
            set: function (e) {
                this._parentEntity = e;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Component.prototype, "getParentEntity", {
            /**
             * @returns the parent entity of this component
             */
            get: function () {
                return this._parentEntity;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @returns the type of this comonent
         */
        Component.prototype.componentType = function () {
            return Describer.getName(this);
        };
        /**
         * called when this component is added to an entity
         */
        Component.prototype.onAddedToEntity = function (parent) {
            this._parent = parent;
        };
        /**
         * sets the component ready to be destroyed by the engine
         */
        Component.prototype.destroy = function () {
            this._isDestroyed = false;
        };
        /**
         * @returns returns if the component has been set to be destroyed by the engine
         */
        Component.prototype.destroyed = function () {
            return this._isDestroyed;
        };
        return Component;
    }());
    ECS.Component = Component;
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.component.js.map