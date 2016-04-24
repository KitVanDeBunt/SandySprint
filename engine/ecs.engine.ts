namespace ECS{
    /**
     * Engine
     */
    export class Engine {
        
        private systems: System[];
        private entities: Entity[];
        private newSystemID:number = 0;
        private newEntityID:number = 0;
        
        constructor() {
            this.systems = [];
            this.entities = [];
        }
        
        addSystem(newSystem :System):void{
            // TODO: add check if system exists
            this.systems[this.newSystemID] = newSystem;
            this.newSystemID++;
        }
        
        createEntity():Entity{
            this.entities[this.newEntityID] = new Entity();
            this.newEntityID++;
            return this.entities[this.newEntityID-1];
        }
        
        updateSystems():void{
            for (let i = 0; i < this.systems.length; i++) {
                this.systems[i].Update(this.entities);
            }
        }
        
        getSystem<T extends System>(newSystemOfType: T):T{
            console.log("systems.length: "+this.systems.length);
            for (let i = 0; i < this.systems.length; i++) {
                console.log("typeof systems[i]: "+this.systems[i].returnTypeOfSystem());
                console.log("newSystemOfType.returnTypeOfSystem(): "+newSystemOfType.returnTypeOfSystem());
                if(this.systems[i].returnTypeOfSystem() == newSystemOfType.returnTypeOfSystem()){
                    // return system if found
                    console.log("[Engine]:getSystem():system found and returned");
                    return <T>this.systems[i];
                }
            }
            // create and return if not found
            console.log("[Engine]:getSystem():system not found but created");
            let newSystem :any = newSystemOfType.newOfThis();
            this.addSystem(newSystem);
            return newSystem;
        }
    }
}