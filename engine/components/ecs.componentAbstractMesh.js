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
            this.meshState = ECS.MeshLoadState.Non;
            this.colliderOffset = BABYLON.Vector3.Zero();
            this.onsuccess = onsuccess;
            this.progressCallBack = onsuccess;
            this.onerror = onerror;
            this.setMeshReadyToLoad();
            this.componentTransform = componentTransform;
            this.path = path;
            this.fileName = fileName;
        }
        ComponentAbstractMesh.prototype.destroy = function () {
            this.mesh.dispose();
            _super.prototype.destroy.call(this);
        };
        ComponentAbstractMesh.prototype.setMeshReadyToLoad = function () {
            this.meshState = ECS.MeshLoadState.ReadyToLoad;
        };
        ComponentAbstractMesh.prototype.setCollision = function (mesh) {
            this.collider = mesh;
            this.collider.updatePhysicsBody;
            //this.collider.isVisible = false;
        };
        Object.defineProperty(ComponentAbstractMesh.prototype, "setColliderOffset", {
            /**
             * set the offset of the collider from the mesh
             * @param offset
             */
            set: function (offset) {
                this.colliderOffset = offset;
            },
            enumerable: true,
            configurable: true
        });
        ComponentAbstractMesh.prototype.updateCollision = function () {
            this.collider.position = this.componentTransform.getPosition.add(this.colliderOffset);
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
                return this.componentTransform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentAbstractMesh.prototype, "babylonMesh", {
            get: function () {
                return this.mesh;
            },
            set: function (mesh) {
                this.mesh = mesh;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComponentAbstractMesh.prototype, "babylonSkeleton", {
            get: function () {
                return this.skeleton;
            },
            set: function (skeleton) {
                this.skeleton = skeleton;
            },
            enumerable: true,
            configurable: true
        });
        return ComponentAbstractMesh;
    }(ECS.Component));
    ECS.ComponentAbstractMesh = ComponentAbstractMesh;
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.componentAbstractMesh.js.map