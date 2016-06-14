namespace ECS {
    /**
     * used for object pooling currently not in use
     */
    export class MeshPoolObject {
        private _inUse:boolean = false;
        public meshes:BABYLON.AbstractMesh[];
        public skeleton: BABYLON.Skeleton;
        
        constructor(inUse:boolean) {
            this._inUse = inUse;
        }
        
        get inUse():boolean{
            return this._inUse;
        } 
        
        set inUse(setInUse:boolean){
            this._inUse = setInUse;
        } 
    }
}