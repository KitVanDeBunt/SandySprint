///-not in use <reference path="../../../src/math/babylon.math.ts" />

namespace ECS {
    /**
     * ComponentPosition
     */
    export class ComponentAbstractMesh extends Component {
        private componentPosition: ComponentTransform;
        private mesh: BABYLON.AbstractMesh;
        meshState: MeshLoadState = MeshLoadState.Non;
        
        onsuccess: any;
        progressCallBack: any;
        onerror: any;
        
        path:string;
        fileName:string;

        constructor(componentPosition:ComponentTransform, path: string, fileName: string, onsuccess?: (meshes: BABYLON.AbstractMesh[], particleSystems: BABYLON.ParticleSystem[], skeletons: BABYLON.Skeleton[]) => void, progressCallBack?: () => void, onerror?: (scene: BABYLON.Scene, message: string, exception?: any) => void) {
            super();
            this.onsuccess = onsuccess;
            this.progressCallBack = onsuccess;
            this.onerror = onerror;
            this.setMeshReadyToLoad();  
            this.componentPosition = componentPosition;    
            this.path = path;    
            this.fileName = fileName;    
        }
        
        private setMeshReadyToLoad(){
            this.meshState = MeshLoadState.ReadyToLoad;
        }
        
        get positionComponent():ComponentTransform{
            return this.componentPosition;
        }
        
        get babylonMesh():BABYLON.AbstractMesh{
            return this.mesh;
        }
        
        set babylonMesh(mesh:BABYLON.AbstractMesh){
            this.mesh = mesh;
        }
    }
}