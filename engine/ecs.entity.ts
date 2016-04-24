namespace ECS {
    /**
     * Entity
     */
    export class Entity {
        
        private components: Component[];
        private componentsTypes: string[];
        private newComponentID:number = 0;
        constructor();
        constructor(thisInstNum: number);
        
        
        constructor(thisInstNum?: number) {
            this.components = [];
            this.componentsTypes = [];
        }

        // function that exists to ensure generic constarain work
        // because generic constrains only checks if the methodes and fields are the same not the actual type 
        thisIsAEntity(): void {
            
        }
        
        addComponent(newComponent :Component):void{
            // TODO: add check if component is already added exists
            this.components[this.newComponentID] = newComponent;
            this.componentsTypes[this.newComponentID] = newComponent.componentType();
            this.newComponentID++;
            
            //ECS.Component.componentType();
        }
        
        get getComponentTypes():string[]{
            return this.componentsTypes;
        }
        
        
        getComponent(componentType :string){
            //console.log("components.length: "+this.components.length);
            for (let i = 0; i < this.components.length; i++) {
                //console.log("typeof components[i]: "+this.components[i].componentType());
                //console.log("newComponentOfType.returnTypeOfComponents(): "+newComponentsOfType.componentType());
                if(this.components[i].componentType() == componentType){
                    // return system if found
                    //console.log("[Entity]:getComponents():component found and returned");
                    return this.components[i];
                }
            }
            console.log("[Entity]:getComponents():component not foun null returned");
            // return null if not found
            return null;
        }
    }
}