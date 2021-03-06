var ECS;
(function (ECS) {
    /**
     * Base class for an engine system
     */
    var System = (function () {
        function System() {
            this.neededComponents = [];
        }
        Object.defineProperty(System.prototype, "parentEngine", {
            /**
             * set the parent engine
             * @param parentEngine systems parent engine
             */
            set: function (parentEngine) {
                this._engine = parentEngine;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * function that exists to ensure generic constarain work
         * because generic constrains only checks if the methodes and fields are the same not the actual type
         */
        System.prototype.thisIsASystem = function () {
        };
        /**
         * checks if an entity is compatible with the system
         * @param entity entity that needs to be checked
         * @returns returns if the entity is compatibe or not
         */
        System.prototype.checkCompatibleEntity = function (entity) {
            var updateAbleEntity = true;
            for (var j = 0; j < this.neededComponents.length; j++) {
                var neededComponentFound = false;
                for (var k = 0; k < entity.getComponentTypes.length; k++) {
                    if (entity.getComponentTypes[k] == this.neededComponents[j]) {
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
            return updateAbleEntity;
        };
        return System;
    }());
    ECS.System = System;
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.system.js.map