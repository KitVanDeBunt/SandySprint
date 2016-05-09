var ECS;
(function (ECS) {
    /**
     * Component
     */
    var Component = (function () {
        function Component() {
            this.isDestroyed = false;
        }
        Object.defineProperty(Component.prototype, "setParentEntity", {
            set: function (e) {
                this.parentEntity = e;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Component.prototype, "getParentEntity", {
            get: function () {
                return this.parentEntity;
            },
            enumerable: true,
            configurable: true
        });
        Component.prototype.componentType = function () {
            return Describer.getName(this);
        };
        Component.testfunc = function () {
        };
        Component.prototype.onAddedToEntity = function (parent) {
            this.parent = parent;
        };
        Component.prototype.destroy = function () {
            this.isDestroyed = false;
        };
        Component.prototype.destroyed = function () {
            return this.isDestroyed;
        };
        return Component;
    }());
    ECS.Component = Component;
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.component.js.map