///-not in use <reference path="../../../src/math/babylon.math.ts" />

namespace ECS {
    /**
     * ComponentPosition
     */
    export class ComponentAbstractMesh extends Component {
        private _componentTransform: ComponentTransform;
        private _mesh: BABYLON.AbstractMesh;
        //private skeleton: BABYLON.Skeleton;
        public meshState: MeshLoadState = MeshLoadState.Non;
        public collider: BABYLON.Mesh;
        private _colliderOffset: BABYLON.Vector3 = BABYLON.Vector3.Zero();

        private _onsuccess: any;
        private _progressCallBack: any;
        private _onerror: any;

        private _meshPoolObject: MeshPoolObject;

        path: string;
        fileName: string;

        constructor(componentTransform: ComponentTransform, path: string, fileName: string, onsuccess?: (meshes: BABYLON.AbstractMesh[], particleSystems: BABYLON.ParticleSystem[], skeletons: BABYLON.Skeleton[]) => void, progressCallBack?: () => void, onerror?: (scene: BABYLON.Scene, message: string, exception?: any) => void) {
            super();
            this._onsuccess = onsuccess;
            this._progressCallBack = onsuccess;
            this._onerror = onerror;
            this.setMeshReadyToLoad();
            this._componentTransform = componentTransform;
            this.path = path;
            this.fileName = fileName;
        }

        destroy() {
            this._mesh.dispose();
            //this._meshPoolObject.inUse = false;
            super.destroy();
        }

        private setMeshReadyToLoad() {
            this.meshState = MeshLoadState.ReadyToLoad;
        }

        public setCollision(mesh: BABYLON.Mesh) {
            this.collider = mesh;
            this.collider.updatePhysicsBody; // unneedded !!!!!!
            this.collider.isVisible = false;
        }

        get meshPoolObject(): MeshPoolObject {
            return this._meshPoolObject;
        }

        set meshPoolObject(meshPoolObject: MeshPoolObject) {
            this._meshPoolObject = meshPoolObject;
        }

        /**
         * set the offset of the collider from the mesh
         * @param offset
         */
        set setColliderOffset(offset: BABYLON.Vector3) {
            this._colliderOffset = offset;
        }

        updateCollision(): void {
            this.collider.position = this._componentTransform.getPosition.add(this._colliderOffset);
        }

        get getCollider(): BABYLON.Mesh {
            return this.collider;
        }

        get positionComponent(): ComponentTransform {
            return this._componentTransform;
        }

        get babylonMesh(): BABYLON.AbstractMesh {
            return this._mesh;
        }
        
        set babylonMesh(mesh: BABYLON.AbstractMesh) {
            this._mesh = mesh;
            this._mesh.isVisible = true;
        }
    }
}