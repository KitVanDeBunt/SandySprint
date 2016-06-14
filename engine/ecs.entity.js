var ECS;
(function (ECS) {
    /**
     * Entity used by the entity compopnent system
     */
    var Entity = (function () {
        /**
         * @param thisInstNum instance number of this entity
         */
        function Entity(thisInstNum) {
            this.newComponentID = 0;
            this.components = [];
            this.componentsTypes = [];
        }
        /**
         * set entity to be destroy
         */
        Entity.prototype.destroy = function () {
            for (var i = 0; i < this.components.length; i++) {
                this.components[i].destroy();
            }
        };
        /**
         * returnes if entity is ready to be deleted by the engine
         * @returns if ready to be destroyed
         */
        Entity.prototype.destroyed = function () {
            if (this.components.length == 0) {
                return false;
            }
            for (var i = 0; i < this.components.length; i++) {
                if (!this.components[i].destroyed()) {
                    return false;
                }
            }
            return true;
        };
        /**
         * function that exists to ensure generic constarain work
         * because generic constrains only checks if the methodes and fields are the same not the actual type
         */
        Entity.prototype.thisIsAEntity = function () {
        };
        /**
         * @param newComponent adds component to this entity
         */
        Entity.prototype.addComponent = function (newComponent) {
            // TODO: add check if component is already added exists
            this.components[this.newComponentID] = newComponent;
            this.componentsTypes[this.newComponentID] = newComponent.componentType();
            this.newComponentID++;
            newComponent.setParentEntity = this;
        };
        Object.defineProperty(Entity.prototype, "getComponentTypes", {
            /**
             * returns types of all the components attached to this entity
             * @returns types of all the components attached to this entity
             */
            get: function () {
                return this.componentsTypes;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * retuns a component of a requested type
         * @param componentType type name of requested component type
         * @returns returns component of type requested if available else returns null
         */
        Entity.prototype.getComponent = function (componentType) {
            for (var i = 0; i < this.components.length; i++) {
                if (this.components[i].componentType() == componentType) {
                    // return component if found
                    return this.components[i];
                }
            }
            console.log("[Entity]:getComponents():component not foun null returned");
            // return null if not found
            return null;
        };
        return Entity;
    }());
    ECS.Entity = Entity;
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.entity.js.map