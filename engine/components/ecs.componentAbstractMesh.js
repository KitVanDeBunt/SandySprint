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
            this.onsuccess = onsuccess;
            this.progressCallBack = onsuccess;
            this.onerror = onerror;
            this.setMeshReadyToLoad();
            this.componentTransform = componentTransform;
            this.path = path;
            this.fileName = fileName;
        }
        ComponentAbstractMesh.prototype.setMeshReadyToLoad = function () {
            this.meshState = ECS.MeshLoadState.ReadyToLoad;
        };
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
        return ComponentAbstractMesh;
    }(ECS.Component));
    ECS.ComponentAbstractMesh = ComponentAbstractMesh;
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.componentAbstractMesh.js.map