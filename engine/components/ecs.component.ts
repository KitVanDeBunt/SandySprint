namespace ECS {
    /**
     * Component
     */
    export abstract class Component {
        protected typeOfComponent: string;
        protected parent: Entity;
        constructor(){
            
        }

        componentType(): string{
            return Describer.getName(this);
        }
        
        static testfunc(){
            
        }
        
        onAddedToEntity(parent: Entity){
            this.parent = parent;
        }
    }
}