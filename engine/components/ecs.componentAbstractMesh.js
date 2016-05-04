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
            this.rotateQueue = [];
            this.onsuccess = onsuccess;
            this.progressCallBack = onsuccess;
            this.onerror = onerror;
            this.setMeshReadyToLoad();
            this.componentTransform = componentTransform;
            this.path = path;
            this.fileName = fileName;
        }
        ComponentAbstractMesh.prototype.meshRotate = function (axis, amount) {
            if (this.meshState == ECS.MeshLoadState.Loaded) {
                this.mesh.rotate(axis, amount);
            }
            else {
                var newQueueItemPosition = this.rotateQueue.length;
                this.rotateQueue[newQueueItemPosition] = new RotateQueueItem();
                this.rotateQueue[newQueueItemPosition].axis = axis;
                this.rotateQueue[newQueueItemPosition].amount = amount;
                this.rotateQueue[newQueueItemPosition].executed = false;
            }
        };
        ComponentAbstractMesh.prototype.executeRotateQueue = function () {
            for (var i = 0; i < this.rotateQueue.length; i++) {
                if (this.rotateQueue[i].executed == false) {
                    this.rotateQueue[i].executed = true;
                    this.mesh.rotate(this.rotateQueue[i].axis, this.rotateQueue[i].amount);
                }
            }
        };
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
    var RotateQueueItem = (function () {
        function RotateQueueItem() {
        }
        return RotateQueueItem;
    }());
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.componentAbstractMesh.js.map