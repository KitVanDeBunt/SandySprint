///-not in use <reference path="../../../src/math/babylon.math.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ECS;
(function (ECS) {
    /**
     * ComponentPosition
     */
    var ComponentAbstractMesh = (function (_super) {
        __extends(ComponentAbstractMesh, _super);
        function ComponentAbstractMesh(componentTransform, path, fileName, onsuccess, progressCallBack, onerror) {
            _super.call(this);
            //private skeleton: BABYLON.Skeleton;
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
        ComponentAbstractMesh.prototype.destroy = function () {
            //this.mesh.dispose();
            this._meshPoolObject.inUse = false;
            _super.prototype.destroy.call(this);
        };
        ComponentAbstractMesh.prototype.setMeshReadyToLoad = function () {
            this.meshState = ECS.MeshLoadState.ReadyToLoad;
        };
        ComponentAbstractMesh.prototype.setCollision = function (mesh) {
            this.collider = mesh;
            this.collider.updatePhysicsBody; // unneedded !!!!!!
            this.collider.isVisible = false;
        };
        Object.defineProperty(ComponentAbstractMesh.prototype, "meshPoolObject", {
            get: function () {
                return this._meshPoolObject;
            },
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
        ComponentAbstractMesh.prototype.updateCollision = function () {
            this.collider.position = this._componentTransform.getPosition.add(this._colliderOffset);
        };
        Object.defineProperty(ComponentAbstractMesh.prototype, "getCollider", {
            get: function () {
                return this.collider;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentAbstractMesh.prototype, "positionComponent", {
            get: function () {
                return this._componentTransform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentAbstractMesh.prototype, "babylonMesh", {
            get: function () {
                return this._mesh;
            },
            set: function (mesh) {
                this.mesh = mesh;
            },
            enumerable: true,
            configurable: true
        });
        ComponentAbstractMesh.prototype.getBabylonMesh = function () {
            return this.mesh;
        };
        Object.defineProperty(ComponentAbstractMesh.prototype, "babylonSkeleton", {
            get: function () {
                return this.skeleton;
            },
            enumerable: true,
            configurable: true
        });
        return ComponentAbstractMesh;
    }(ECS.Component));
    ECS.ComponentAbstractMesh = ComponentAbstractMesh;
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.componentAbstractMesh.js.map