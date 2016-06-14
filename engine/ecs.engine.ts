namespace ECS {
    /**
     * The engine of the entity coponent system
     * used to update the systems
     */
    export class Engine {

        private systems: System[];
        private entities: Entity[];
        private newSystemID: number = 0;
        private newEntityID: number = 0;

        constructor() {
            this.systems = [];
            this.entities = [];
        }

        /**
         * addes a system to the engine
         * @param newSystem system added to the engine
         */
        addSystem(newSystem: System): void {
            // TODO: add check if system exists
            this.systems[this.newSystemID] = newSystem;
            newSystem.parentEngine = this;
            this.newSystemID++;
        }

        /**
         * creates a new entity and adds it to the system
         * @returns returns the new entity
         */
        createEntity(): Entity {
            this.entities[this.newEntityID] = new Entity();
            this.newEntityID++;
            return this.entities[this.newEntityID - 1];
        }

        /**
         * updates the systems of this engine
         */
        updateSystems(): void {
            for (let i = 0; i < this.systems.length; i++) {
                this.systems[i].Update(this.entities);
            }
            this.deleteObectsReadyToBeDestroyed();
        }

        /**
         * deletes object waiting to be destroyed
         */
        deleteObectsReadyToBeDestroyed() {
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i].destroyed()) {
                    //this.entities[i] = null;
                    //this.entities.splice(i,1);
                }
            }
        }

        /**
         * a system of the requested type
         * @param newSystemOfType newSystem of requested system
         * @returns newSystemOfType system of the requested type
         */
        getSystem<T extends System>(newSystemOfType: T): T {
            for (let i = 0; i < this.systems.length; i++) {
                if (this.systems[i].returnTypeOfSystem() == newSystemOfType.returnTypeOfSystem()) {
                    // return system if found
                    return <T>this.systems[i];
                }
            }
            // create and return if not found
            let newSystem: any = newSystemOfType.newOfThis();
            this.addSystem(newSystem);
            return newSystem;
        }
    }
}