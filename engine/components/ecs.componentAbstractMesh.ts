namespace ECS {
    /**
     * Component that handels mesh data for the engine
     */
    export class ComponentAbstractMesh extends Component {

        /**
         * state of the mesh in the engine
         */
        public meshState: MeshLoadState = MeshLoadState.Non;
        /**
         * collider of the mesh
         */
        public collider: BABYLON.Mesh;
        /**
         * path of the mesh file
         */
        path: string;
        /**
         * name of the mesh file
         */
        fileName: string;

        private _componentTransform: ComponentTransform;
        private _mesh: BABYLON.AbstractMesh;

        private _colliderOffset: BABYLON.Vector3 = BABYLON.Vector3.Zero();

        private _onsuccess: any;
        private _progressCallBack: any;
        private _onerror: any;

        private _meshPoolObject: MeshPoolObject;

        
        /**
         * @param componentTransform transform component of the mesh
         * @param path path of the mesh file
         * @param fileName name of the mesh file
         * @param onsuccess function that is called if the loading of the model was susesful
         * @param progressCallBack function that is when there is progress with loading the game
         * @param onerror function that is called when the laoding has an error
         */
        constructor(
            componentTransform: ComponentTransform
            , path: string
            , fileName: string
            , onsuccess?: (meshes: BABYLON.AbstractMesh[], particleSystems: BABYLON.ParticleSystem[], skeletons: BABYLON.Skeleton[]) => void
            , progressCallBack?: () => void
            , onerror?: (scene: BABYLON.Scene, message: string, exception?: any) => void
        ) {
            super();
            this._onsuccess = onsuccess;
            this._progressCallBack = onsuccess;
            this._onerror = onerror;
            this.setMeshReadyToLoad();
            this._componentTransform = componentTransform;
            this.path = path;
            this.fileName = fileName;
        }

        /**
         * sets this component ready to be destroy by the engine
         */
        destroy() {
            this._mesh.dispose();
            //this._meshPoolObject.inUse = false;
            super.destroy();
        }

        /**
         * sets the mesh ready to be loaded by the engine
         */
        private setMeshReadyToLoad() {
            this.meshState = MeshLoadState.ReadyToLoad;
        }

        /**
         * sets the collision mesh of this component
         * @param mesh collision mesh
         */
        public setCollision(mesh: BABYLON.Mesh) {
            this.collider = mesh;
            this.collider.updatePhysicsBody; // unneedded !!!!!!
            this.collider.isVisible = false;
        }
        
        /**
         * @return returns the meshes pool object(containing data to re-use the mesh)
         */
        get meshPoolObject(): MeshPoolObject {
            return this._meshPoolObject;
        }

        /**
         * @param meshPoolObject sets the meshes pool object(containing data to re-use the mesh)
         */
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

        /**
         * updates the collider position
         */
        updateCollision(): void {
            this.collider.position = this._componentTransform.getPosition.add(this._colliderOffset);
        }
        
        /**
         * @returns returs the collider of this mesh
         */
        get getCollider(): BABYLON.Mesh {
            return this.collider;
        }

        /**
         * @returns returns the position component linked to this mesh component
         */
        get positionComponent(): ComponentTransform {
            return this._componentTransform;
        }
        
        /**
         * @returns returns the babylon mesh used by this component
         */
        get babylonMesh(): BABYLON.AbstractMesh {
            return this._mesh;
        }
        
        /**
         * sets the babylon mesh this component uses
         * @param new babylon mesh
         */
        set babylonMesh(mesh: BABYLON.AbstractMesh) {
            this._mesh = mesh;
            this._mesh.isVisible = true;
        }
    }
}