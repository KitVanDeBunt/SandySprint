var ECS;
(function (ECS) {
    /**
     * dataMesh contains information about a mesh that has been loaded
     */
    var DataMesh = (function () {
        /**
         * @param path path of the mesh fileName
         * @name name name of the mesh file
         */
        function DataMesh(path, name) {
            this._filePath = path;
            this._fileName = name;
            this._meshLoaded = false;
            this._objectPool = [];
        }
        Object.defineProperty(DataMesh.prototype, "objectPool", {
            get: function () {
                return this._objectPool;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataMesh.prototype, "filePath", {
            get: function () {
                return this._filePath;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataMesh.prototype, "fileName", {
            get: function () {
                return this._fileName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataMesh.prototype, "meshLoaded", {
            get: function () {
                return this._meshLoaded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataMesh.prototype, "skeletonLoaded", {
            get: function () {
                return this._skeletonLoaded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataMesh.prototype, "meshes", {
            get: function () {
                return this._meshes;
            },
            set: function (meshes) {
                this._meshes = meshes;
                this._meshLoaded = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataMesh.prototype, "skeleton", {
            get: function () {
                return this._skeleton;
            },
            set: function (skeleton) {
                for (var i = 0; i < this._meshes.length; i++) {
                    this._meshes[i].skeleton = skeleton;
                }
                this._skeleton = skeleton;
                this._skeletonLoaded = true;
            },
            enumerable: true,
            configurable: true
        });
        return DataMesh;
    }());
    ECS.DataMesh = DataMesh;
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.dataMesh.js.map