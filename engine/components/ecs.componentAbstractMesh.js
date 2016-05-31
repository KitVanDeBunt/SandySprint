var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ECS;
(function (ECS) {
    /**
     * Component that handels mesh data for the engine
     */
    var ComponentAbstractMesh = (function (_super) {
        __extends(ComponentAbstractMesh, _super);
        /**
         * @param componentTransform transform component of the mesh
         * @param path path of the mesh file
         * @param fileName name of the mesh file
         * @param onsuccess function that is called if the loading of the model was susesful
         * @param progressCallBack function that is when there is progress with loading the game
         * @param onerror function that is called when the laoding has an error
         */
        function ComponentAbstractMesh(componentTransform, path, fileName, onsuccess, progressCallBack, onerror) {
            _super.call(this);
            /**
             * state of the mesh in the engine
             */
            this.meshState = ECS.MeshLoadState.Non;
            this._colliderOffset = BABYLON.Vector3.Zero();
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
        ComponentAbstractMesh.prototype.destroy = function () {
            this._mesh.dispose();
            //this._meshPoolObject.inUse = false;
            _super.prototype.destroy.call(this);
        };
        /**
         * sets the mesh ready to be loaded by the engine
         */
        ComponentAbstractMesh.prototype.setMeshReadyToLoad = function () {
            this.meshState = ECS.MeshLoadState.ReadyToLoad;
        };
        /**
         * sets the collision mesh of this component
         * @param mesh collision mesh
         */
        ComponentAbstractMesh.prototype.setCollision = function (mesh) {
            this.collider = mesh;
            this.collider.updatePhysicsBody; // unneedded !!!!!!
            this.collider.isVisible = false;
        };
        Object.defineProperty(ComponentAbstractMesh.prototype, "meshPoolObject", {
            /**
             * @return returns the meshes pool object(containing data to re-use the mesh)
             */
            get: function () {
                return this._meshPoolObject;
            },
            /**
             * @param meshPoolObject sets the meshes pool object(containing data to re-use the mesh)
             */
            set: function (meshPoolObject) {
                this._meshPoolObject = meshPoolObject;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentAbstractMesh.prototype, "setColliderOffset", {
            /**
             * set the offset of the collider from the mesh
             * @param offset
             */
            set: function (offset) {
                this._colliderOffset = offset;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * updates the collider position
         */
        ComponentAbstractMesh.prototype.updateCollision = function () {
            this.collider.position = this._componentTransform.getPosition.add(this._colliderOffset);
        };
        Object.defineProperty(ComponentAbstractMesh.prototype, "getCollider", {
            /**
             * @returns returs the collider of this mesh
             */
            get: function () {
                return this.collider;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentAbstractMesh.prototype, "positionComponent", {
            /**
             * @returns returns the position component linked to this mesh component
             */
            get: function () {
                return this._componentTransform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentAbstractMesh.prototype, "babylonMesh", {
            /**
             * @returns returns the babylon mesh used by this component
             */
            get: function () {
                return this._mesh;
            },
            /**
             * sets the babylon mesh this component uses
             * @param new babylon mesh
             */
            set: function (mesh) {
                this._mesh = mesh;
                this._mesh.isVisible = true;
            },
            enumerable: true,
            configurable: true
        });
        return ComponentAbstractMesh;
    }(ECS.Component));
    ECS.ComponentAbstractMesh = ComponentAbstractMesh;
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.componentAbstractMesh.js.map