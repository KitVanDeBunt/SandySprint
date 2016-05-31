var ECS;
(function (ECS) {
    /**
     * Engine
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
            this.newSystemID++;
        };
        Engine.prototype.createEntity = function () {
            this.entities[this.newEntityID] = new ECS.Entity();
            this.newEntityID++;
            return this.entities[this.newEntityID - 1];
        };
        /**
         * updates a systems that are contained by this entity
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
                    console.log("delete enntity: " + i);
                    console.log("e count: " + this.entities.length);
                    //this.entities[i] = null;
                    //this.entities.splice(i,1);
                    console.log("e count: " + this.entities.length);
                }
            }
        };
        /**
         * a system of the requested type
         * @param newSystemOfType newSystem of requested system
         * @returns newSystemOfType system of the requested type
         */
        Engine.prototype.getSystem = function (newSystemOfType) {
            console.log("systems.length: " + this.systems.length);
            for (var i = 0; i < this.systems.length; i++) {
                console.log("typeof systems[i]: " + this.systems[i].returnTypeOfSystem());
                console.log("newSystemOfType.returnTypeOfSystem(): " + newSystemOfType.returnTypeOfSystem());
                if (this.systems[i].returnTypeOfSystem() == newSystemOfType.returnTypeOfSystem()) {
                    // return system if found
                    console.log("[Engine]:getSystem():system found and returned");
                    return this.systems[i];
                }
            }
            // create and return if not found
            console.log("[Engine]:getSystem():system not found but created");
            var newSystem = newSystemOfType.newOfThis();
            this.addSystem(newSystem);
            return newSystem;
        };
        return Engine;
    }());
    ECS.Engine = Engine;
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.engine.js.map