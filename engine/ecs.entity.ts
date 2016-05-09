namespace ECS {
    /**
     * Entity
     */
    export class Entity {

        private components: Component[];
        private componentsTypes: string[];
        private newComponentID: number = 0;

        constructor();
        constructor(thisInstNum: number);

        constructor(thisInstNum?: number) {
            this.components = [];
            this.componentsTypes = [];
        }

        // set entity to be destroy
        destroy(): void {
            for (let i = 0; i < this.components.length; i++) {
                this.components[i].destroy();
            }
        }

        // entity ready to be deleted
        destroyed(): boolean {
            if(this.components.length == 0){
                return false;
            }
            for (let i = 0; i < this.components.length; i++) {
                if (!this.components[i].destroyed()){
                    return false;
                }
            }
            return true;
        }

        // function that exists to ensure generic constarain work
        // because generic constrains only checks if the methodes and fields are the same not the actual type 
        thisIsAEntity(): void {
        }

        addComponent(newComponent: Component): void {
            // TODO: add check if component is already added exists
            this.components[this.newComponentID] = newComponent;
            this.componentsTypes[this.newComponentID] = newComponent.componentType();
            this.newComponentID++;
            
            newComponent.setParentEntity = this;
            //ECS.Component.componentType();
        }

        get getComponentTypes(): string[] {
            return this.componentsTypes;
        }

        getComponent(componentType: string) {
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