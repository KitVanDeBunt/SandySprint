var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ECS;
(function (ECS) {
    /**
     * this is a system that can be use for rendering
     */
    var SystemMeshRender = (function (_super) {
        __extends(SystemMeshRender, _super);
        function SystemMeshRender() {
            _super.call(this);
            // get needed component types
            this.neededComponents[0] = new ECS.ComponentAbstractMesh(null, "", "").componentType();
            this.neededComponents[1] = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero(), BABYLON.Quaternion.Identity()).componentType();
            this._meshDataList = [];
        }
        /**
         * initialize the render system
         * @param scene the scene this system renders on
         */
        SystemMeshRender.prototype.initRendering = function (scene) {
            this._scene = scene;
        };
        /**
         * laods list of models in manualy
         * @param modelPathList list
         */
        SystemMeshRender.prototype.StartLoading = function (modelPathList, modelNameList) {
            this._loadingEntitys = [];
            for (var i = 0; i < modelPathList.length; i++) {
                var loadObject = this._engine.createEntity();
                var loadObjectTransform = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(1, 1, 1), BABYLON.Quaternion.Identity());
                loadObject.addComponent(loadObjectTransform);
                var loadObjectMesh = new ECS.ComponentAbstractMesh(loadObjectTransform, modelPathList[i], modelNameList[i]);
                loadObject.addComponent(loadObjectMesh);
                this._loadingEntitys[i] = loadObject;
            }
        };
        /**
         * returns the procentage of the models loaded
         * @returns loading progress
         */
        SystemMeshRender.prototype.LoadingProgress = function () {
            var progress = 0;
            var meshCount = this._meshDataList.length;
            var loadedMeshCount = 0;
            for (var i = 0; i < this._meshDataList.length; i++) {
                if (this._meshDataList[i].meshLoaded) {
                    loadedMeshCount++;
                }
            }
            progress = loadedMeshCount / meshCount;
            return progress;
        };
        /**
         * removes objects used for loading
         */
        SystemMeshRender.prototype.RemoveLoadingObjects = function () {
            for (var i = 0; i < this._loadingEntitys.length; i++) {
                this._loadingEntitys[i].destroy();
            }
        };
        /**
         * updates this system
         * @param entities entitys updated
         */
        SystemMeshRender.prototype.Update = function (entities) {
            var _loop_1 = function(i) {
                if (this_1.checkCompatibleEntity(entities[i])) {
                    // update all entitys with a ComponentAbstractMesh and a ComponentTransform
                    var componentAbstractMesh = entities[i].getComponent(this_1.neededComponents[0]);
                    var componentTransform = entities[i].getComponent(this_1.neededComponents[1]);
                    switch (componentAbstractMesh.meshState) {
                        case MeshLoadState.ReadyToLoad:
                            var meshLoadingOrLoaden = false;
                            if (this_1._meshDataList.length > 0) {
                                for (var j = 0; j < this_1._meshDataList.length; j++) {
                                    // check if mesh laoded or loading
                                    if (this_1.checkMeshDataMeshComponent(this_1._meshDataList[j], componentAbstractMesh)) {
                                        //console.log("m c:" + this.checkMeshDataMeshComponent(this._meshDataList[j], componentAbstractMesh));
                                        meshLoadingOrLoaden = true;
                                        // file is in meshDataList(list of meshes that are loading, loaded or need to be loaded)
                                        if (this_1._meshDataList[j].meshLoaded) {
                                            this_1.cloneLoadedModel(componentAbstractMesh, j);
                                            break;
                                        }
                                        else {
                                            componentAbstractMesh.meshState = MeshLoadState.Loading;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (meshLoadingOrLoaden) {
                                break;
                            }
                            // create mesh data
                            var dataMesh_1 = new ECS.DataMesh(componentAbstractMesh.path, componentAbstractMesh.fileName);
                            this_1._meshDataList.push(dataMesh_1);
                            //console.log("start load: " + componentAbstractMesh.fileName);
                            // load mesh
                            BABYLON.SceneLoader.ImportMesh("", componentAbstractMesh.path, componentAbstractMesh.fileName, this_1._scene, function (newMeshes, newParticlesystems, newSkeletons) {
                                //console.log("loaded: " + componentAbstractMesh.fileName + " s:" + newSkeletons.length);
                                dataMesh_1.meshes = newMeshes;
                                dataMesh_1.skeleton = newSkeletons[0];
                                for (var j = 0; j < newMeshes.length; j++) {
                                    newMeshes[j].isVisible = false;
                                }
                            });
                            componentAbstractMesh.meshState = MeshLoadState.Loading;
                            break;
                        case MeshLoadState.Loading:
                            for (var j = 0; j < this_1._meshDataList.length; j++) {
                                if (this_1._meshDataList[j].meshLoaded) {
                                    if (this_1.checkMeshDataMeshComponent(this_1._meshDataList[j], componentAbstractMesh)) {
                                        // if loading complete get mesh set mesh to mesh component
                                        this_1.cloneLoadedModel(componentAbstractMesh, j);
                                    }
                                }
                            }
                            break;
                        case MeshLoadState.Loaded:
                            componentAbstractMesh.babylonMesh.setAbsolutePosition(componentTransform.getPosition);
                            componentAbstractMesh.babylonMesh.scaling = componentTransform.getScale;
                            componentAbstractMesh.babylonMesh.rotationQuaternion = componentTransform.getRotationQuaternion;
                            break;
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < entities.length; i++) {
                _loop_1(i);
            }
        };
        /**
         * clones a model that has been loaded by this system
         * @param componentAbstractMesh the new clone
         * @param meshDataListIndex the index of the mesh in the system
         */
        SystemMeshRender.prototype.cloneLoadedModel = function (componentAbstractMesh, meshDataListIndex) {
            var parentNode = new BABYLON.Node("node: " + componentAbstractMesh.fileName, this._scene);
            var i = meshDataListIndex;
            var meshFromPool = false;
            if (!meshFromPool) {
                // clone new mesh
                if (this._meshDataList[i].skeleton != null) {
                    componentAbstractMesh.babylonMesh = this._meshDataList[i].meshes[1].clone("mesh clone: " + componentAbstractMesh.fileName, parentNode);
                    componentAbstractMesh.babylonMesh.skeleton = this._meshDataList[i].skeleton;
                }
                else {
                    componentAbstractMesh.babylonMesh = this._meshDataList[i].meshes[0].clone("mesh clone: " + componentAbstractMesh.fileName, parentNode);
                }
            }
            var clonedMehsNodeChilds = componentAbstractMesh.babylonMesh.parent.getChildMeshes();
            for (var j = 0; j < clonedMehsNodeChilds.length; j++) {
                clonedMehsNodeChilds[j].isVisible = true;
            }
            componentAbstractMesh.meshState = MeshLoadState.Loaded;
        };
        /**
         * returns the type name of this system
         * @returns the type name of this system
         */
        SystemMeshRender.prototype.returnTypeOfSystem = function () {
            return "TYPE_SYSTEM_MESH_RENDER";
        };
        /**
         * returns a new instance of this class
         * @returns a new instance of this class
         */
        SystemMeshRender.prototype.newOfThis = function () {
            return new SystemMeshRender();
        };
        /**
         * checks if ComponentAbstractMesh and DataMesh use the same model file and path
         * @param meshData instande of DataMesh
         * @param meshComponent instande of ComponentAbstractMesh
         */
        SystemMeshRender.prototype.checkMeshDataMeshComponent = function (meshData, meshComponent) {
            return (meshData.fileName == meshComponent.fileName && meshData.filePath == meshComponent.path);
        };
        return SystemMeshRender;
    }(ECS.System));
    ECS.SystemMeshRender = SystemMeshRender;
    (function (MeshLoadState) {
        MeshLoadState[MeshLoadState["Non"] = 0] = "Non";
        MeshLoadState[MeshLoadState["ReadyToLoad"] = 1] = "ReadyToLoad";
        MeshLoadState[MeshLoadState["Loading"] = 2] = "Loading";
        MeshLoadState[MeshLoadState["Loaded"] = 3] = "Loaded";
        MeshLoadState[MeshLoadState["Clone"] = 4] = "Clone";
    })(ECS.MeshLoadState || (ECS.MeshLoadState = {}));
    var MeshLoadState = ECS.MeshLoadState;
})(ECS || (ECS = {}));
//# sourceMappingURL=ecs.systemMeshRender.js.map