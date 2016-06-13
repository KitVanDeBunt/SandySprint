namespace ECS {

    /**
     * Base class for an engine system
     */
    export abstract class System {

        /**
         * the components an entity needs to have to be updated by this system
         */
        protected neededComponents: string[];

        /**
         * parent engine
         */
        protected _engine: Engine;

        constructor() {
            this.neededComponents = [];
        }
        
        /**
         * set the parent engine
         * @param parentEngine systems parent engine 
         */
        set parentEngine(parentEngine:Engine){
            this._engine = parentEngine;
        }

        abstract Update<T extends Entity>(entitys: T[]);

        /**
         * function that exists to ensure generic constarain work
         * because generic constrains only checks if the methodes and fields are the same not the actual type 
         */
        thisIsASystem(): void {

        }

        /**
         * returns the type name of this system
         */
        abstract returnTypeOfSystem(): string;

        /**
         * return a version of this system
         */
        abstract newOfThis(): System;

        protected checkCompatibleEntity(entity: Entity): boolean {
            let updateAbleEntity: boolean = true;
            for (let j = 0; j < this.neededComponents.length; j++) {
                let neededComponentFound: boolean = false;
                for (let k = 0; k < entity.getComponentTypes.length; k++) {
                    if (entity.getComponentTypes[k] == this.neededComponents[j]) {
                        neededComponentFound = true;
                        break;
                    };
                }
                if (!neededComponentFound) {
                    updateAbleEntity = false;
                    break;
                }
            }
            return updateAbleEntity;
        }
    }
}