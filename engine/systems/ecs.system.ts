namespace ECS{
    
    /**
     * System
     */
    export abstract class System {
        
        // the components the entities need to have to be updated by this system
        protected neededComponents: string[];
        
        constructor(){
            this.neededComponents = [];
        }
        
        abstract Update<T extends Entity>(entitys:T[]);
        
        // function that exists to ensure generic constarain work
        // because generic constrains only checks if the methodes and fields are the same not the actual type 
        thisIsASystem(): void{
            
        }
        
        abstract returnTypeOfSystem():string;
        
        abstract newOfThis():System;
    }
}