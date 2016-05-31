namespace ECS {
    /**
     * Engine
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
            this.newSystemID++;
        }

        createEntity(): Entity {
            this.entities[this.newEntityID] = new Entity();
            this.newEntityID++;
            return this.entities[this.newEntityID - 1];
        }

        /**
         * updates a systems that are contained by this entity
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
                    console.log("delete enntity: "+i);
                    console.log("e count: "+this.entities.length);
                    //this.entities[i] = null;
                    //this.entities.splice(i,1);
                    console.log("e count: "+this.entities.length);
                }
            }
        }

        /**
         * a system of the requested type
         * @param newSystemOfType newSystem of requested system
         * @returns newSystemOfType system of the requested type
         */
        getSystem<T extends System>(newSystemOfType: T): T {
            console.log("systems.length: " + this.systems.length);
            for (let i = 0; i < this.systems.length; i++) {
                console.log("typeof systems[i]: " + this.systems[i].returnTypeOfSystem());
                console.log("newSystemOfType.returnTypeOfSystem(): " + newSystemOfType.returnTypeOfSystem());
                if (this.systems[i].returnTypeOfSystem() == newSystemOfType.returnTypeOfSystem()) {
                    // return system if found
                    console.log("[Engine]:getSystem():system found and returned");
                    return <T>this.systems[i];
                }
            }
            // create and return if not found
            console.log("[Engine]:getSystem():system not found but created");
            let newSystem: any = newSystemOfType.newOfThis();
            this.addSystem(newSystem);
            return newSystem;
        }
    }
}