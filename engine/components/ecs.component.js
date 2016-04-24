var ECS;
(function (ECS) {
    /**
     * Component
     */
    var Component = (function () {
        function Component() {
        }
        Component.prototype.componentType = function () {
            return Describer.getName(this);
        };
        Component.testfunc = function () {
        };
        Component.prototype.onAddedToEntity = function (parent) {
            this.parent = parent;
        };
        return Component;
    }());
    ECS.Component = Component;
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.component.js.map