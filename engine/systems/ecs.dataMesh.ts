/**
 * dataMesh contains information about a mesh that has been loaded 
 */
namespace ECS {
    export class DataMesh {

        private _meshLoaded:boolean;
        private _skeletonLoaded:boolean;

        private _filePath: string;
        private _fileName: string;
        private _meshes: BABYLON.AbstractMesh[];
        private _skeleton: BABYLON.Skeleton;
        private _objectPool:MeshPoolObject[];

        constructor(path: string, name: string) {
            this._filePath = path;
            this._fileName = name;
            this._meshLoaded = false;
            this._objectPool = [];
        }

        get objectPool():MeshPoolObject[]{
            return this._objectPool;
        }
        
        get filePath(): string {
            return this._filePath;
        }

        get fileName(): string {
            return this._fileName;
        }

        get meshLoaded(): boolean {
            return this._meshLoaded;
        }
        
        get skeletonLoaded(): boolean {
            return this._skeletonLoaded;
        }

        get meshes(): BABYLON.AbstractMesh[] {
            return this._meshes;
        }

        get skeleton(): BABYLON.Skeleton {
            return this._skeleton;
        }

        set meshes(meshes: BABYLON.AbstractMesh[]) {
            this._meshes = meshes;
            this._meshLoaded = true;
        }
        
        set skeleton(skeleton: BABYLON.Skeleton) {
            for (var i = 0; i < this._meshes.length; i++) {
                this._meshes[i].skeleton = skeleton;
            }
            this._skeleton = skeleton;
            this._skeletonLoaded = true;
        }
    }
    
    /**
     * MeshPoolObject
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