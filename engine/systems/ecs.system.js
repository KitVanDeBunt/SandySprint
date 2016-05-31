var ECS;
(function (ECS) {
    /**
     * System
     */
    var System = (function () {
        function System() {
            this.neededComponents = [];
        }
        /**
         * function that exists to ensure generic constarain work
         * because generic constrains only checks if the methodes and fields are the same not the actual type
         */
        System.prototype.thisIsASystem = function () {
        };
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