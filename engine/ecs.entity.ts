namespace ECS {
    /**
     * Entity used by the entity compopnent system
     */
    export class Entity {

        private components: Component[];
        private componentsTypes: string[];
        private newComponentID: number = 0;

        constructor();
        
        /**
         * @param thisInstNum instance number of this entity
         */
        constructor(thisInstNum: number);
        
        /**
         * @param thisInstNum instance number of this entity
         */
        constructor(thisInstNum?: number) {
            this.components = [];
            this.componentsTypes = [];
        }

        /**
         * set entity to be destroy
         */
        destroy(): void {
            for (let i = 0; i < this.components.length; i++) {
                this.components[i].destroy();
            }
        }

        /**
         * returnes if entity is ready to be deleted by the engine
         * @returns if ready to be destroyed
         */
        destroyed(): boolean {
            if (this.components.length == 0) {
                return false;
            }
            for (let i = 0; i < this.components.length; i++) {
                if (!this.components[i].destroyed()) {
                    return false;
                }
            }
            return true;
        }

        /**
         * function that exists to ensure generic constarain work
         * because generic constrains only checks if the methodes and fields are the same not the actual type 
         */
        thisIsAEntity(): void {
        }

        /**
         * @param newComponent adds component to this entity
         */
        addComponent(newComponent: Component): void {
            // TODO: add check if component is already added exists
            this.components[this.newComponentID] = newComponent;
            this.componentsTypes[this.newComponentID] = newComponent.componentType();
            this.newComponentID++;

            newComponent.setParentEntity = this;
        }

        /**
         * returns types of all the components attached to this entity
         * @returns types of all the components attached to this entity
         */
        get getComponentTypes(): string[] {
            return this.componentsTypes;
        }

        /**
         * retuns a component of a requested type
         * @param componentType type name of requested component type
         * @returns returns component of type requested if available else returns null
         */
        getComponent(componentType: string): Component {
            for (let i = 0; i < this.components.length; i++) {
                if (this.components[i].componentType() == componentType) {
                    // return component if found
                    return this.components[i];
                }
            }
            console.log("[Entity]:getComponents():component not foun null returned");
            // return null if not found
            return null;
        }
    }
}