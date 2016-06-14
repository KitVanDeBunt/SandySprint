var ECS;
(function (ECS) {
    /**
     * used for object pooling currently not in use
     */
    var MeshPoolObject = (function () {
        function MeshPoolObject(inUse) {
            this._inUse = false;
            this._inUse = inUse;
        }
        Object.defineProperty(MeshPoolObject.prototype, "inUse", {
            get: function () {
                return this._inUse;
            },
            set: function (setInUse) {
                this._inUse = setInUse;
            },
            enumerable: true,
            configurable: true
        });
        return MeshPoolObject;
    }());
    ECS.MeshPoolObject = MeshPoolObject;
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.meshPoolObject.js.map