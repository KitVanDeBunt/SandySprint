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
        private rotateQueue: RotateQueueItem[] = [];
        public collider: BABYLON.Mesh;

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

        public meshRotate(axis: BABYLON.Vector3, amount: number) {
            if (this.meshState == MeshLoadState.Loaded) {
                this.mesh.rotate(axis, amount);
            } else {
                let newQueueItemPosition = this.rotateQueue.length;
                this.rotateQueue[newQueueItemPosition] = new RotateQueueItem();
                this.rotateQueue[newQueueItemPosition].axis = axis;
                this.rotateQueue[newQueueItemPosition].amount = amount;
                this.rotateQueue[newQueueItemPosition].executed = false;
            }
        }
        
        public executeRotateQueue(){
            for (var i = 0; i < this.rotateQueue.length; i++) {
                if (this.rotateQueue[i].executed == false) {
                    this.rotateQueue[i].executed = true;
                    this.mesh.rotate(this.rotateQueue[i].axis, this.rotateQueue[i].amount);
                }
            }
        }

        private setMeshReadyToLoad() {
            this.meshState = MeshLoadState.ReadyToLoad;
        }

        public setCollision(mesh: BABYLON.Mesh){
            this.collider = mesh;
            this.collider.updatePhysicsBody;
            this.collider.isVisible = false;
        }
        
        set updateCollision(position:BABYLON.Vector3){
            this.collider.position = position;
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

    class RotateQueueItem {
        executed: boolean;
        axis: BABYLON.Vector3;
        amount: number;
    }
}