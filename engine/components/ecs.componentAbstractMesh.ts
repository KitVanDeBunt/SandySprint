///-not in use <reference path="../../../src/math/babylon.math.ts" />

namespace ECS {
    /**
     * ComponentPosition
     */
    export class ComponentAbstractMesh extends Component {
        private componentTransform: ComponentTransform;
        private mesh: BABYLON.AbstractMesh;
        private skeleton: BABYLON.Skeleton;
        public meshState: MeshLoadState = MeshLoadState.Non;
        public collider: BABYLON.Mesh;
        private colliderOffset: BABYLON.Vector3 = BABYLON.Vector3.Zero();

        private onsuccess: any;
        private progressCallBack: any;
        private onerror: any;

        path: string;
        fileName: string;

        constructor(componentTransform: ComponentTransform, path: string, fileName: string, onsuccess?: (meshes: BABYLON.AbstractMesh[], particleSystems: BABYLON.ParticleSystem[], skeletons: BABYLON.Skeleton[]) => void, progressCallBack?: () => void, onerror?: (scene: BABYLON.Scene, message: string, exception?: any) => void) {
            super();
            this.onsuccess = onsuccess;
            this.progressCallBack = onsuccess;
            this.onerror = onerror;
            this.setMeshReadyToLoad();
            this.componentTransform = componentTransform;
            this.path = path;
            this.fileName = fileName;
        }
        
        destroy(){
            this.mesh.dispose();
            super.destroy();
        }

        private setMeshReadyToLoad() {
            this.meshState = MeshLoadState.ReadyToLoad;
        }

        public setCollision(mesh: BABYLON.Mesh){
            this.collider = mesh;
            this.collider.updatePhysicsBody;
            this.collider.isVisible = false;
        }
        
        /**
         * set the offset of the collider from the mesh
         * @param offset
         */
        set setColliderOffset(offset:BABYLON.Vector3){
            this.colliderOffset = offset;
        }
        
        updateCollision():void{
            this.collider.position = this.componentTransform.getPosition.add(this.colliderOffset);
        }
        
        get getCollider():BABYLON.Mesh{
            return this.collider;
        }
        
        get positionComponent(): ComponentTransform {
            return this.componentTransform;
        }

        get babylonMesh(): BABYLON.AbstractMesh {
            return this.mesh;
        }
        
        set babylonMesh(mesh: BABYLON.AbstractMesh) {
            this.mesh = mesh;
        }
        
        get babylonSkeleton(): BABYLON.Skeleton {
            return this.skeleton;
        }

        set babylonSkeleton(skeleton: BABYLON.Skeleton) {
            this.skeleton = skeleton;
        }
    }
}