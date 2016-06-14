var ECS;
(function (ECS) {
    /**
     * The engine of the entity coponent system
     * used to update the systems
     */
    var Engine = (function () {
        function Engine() {
            this.newSystemID = 0;
            this.newEntityID = 0;
            this.systems = [];
            this.entities = [];
        }
        /**
         * addes a system to the engine
         * @param newSystem system added to the engine
         */
        Engine.prototype.addSystem = function (newSystem) {
            // TODO: add check if system exists
            this.systems[this.newSystemID] = newSystem;
            newSystem.parentEngine = this;
            this.newSystemID++;
        };
        /**
         * creates a new entity and adds it to the system
         * @returns returns the new entity
         */
        Engine.prototype.createEntity = function () {
            this.entities[this.newEntityID] = new ECS.Entity();
            this.newEntityID++;
            return this.entities[this.newEntityID - 1];
        };
        /**
         * updates the systems of this engine
         */
        Engine.prototype.updateSystems = function () {
            for (var i = 0; i < this.systems.length; i++) {
                this.systems[i].Update(this.entities);
            }
            this.deleteObectsReadyToBeDestroyed();
        };
        /**
         * deletes object waiting to be destroyed
         */
        Engine.prototype.deleteObectsReadyToBeDestroyed = function () {
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i].destroyed()) {
                }
            }
        };
        /**
         * a system of the requested type
         * @param newSystemOfType newSystem of requested system
         * @returns newSystemOfType system of the requested type
         */
        Engine.prototype.getSystem = function (newSystemOfType) {
            for (var i = 0; i < this.systems.length; i++) {
                if (this.systems[i].returnTypeOfSystem() == newSystemOfType.returnTypeOfSystem()) {
                    // return system if found
                    return this.systems[i];
                }
            }
            // create and return if not found
            var newSystem = newSystemOfType.newOfThis();
            this.addSystem(newSystem);
            return newSystem;
        };
        return Engine;
    }());
    ECS.Engine = Engine;
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.engine.js.map