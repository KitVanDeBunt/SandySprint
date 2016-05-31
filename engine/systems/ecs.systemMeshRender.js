var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ECS;
(function (ECS) {
    /**
     * SystemMeshRender
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
         */
        SystemMeshRender.prototype.initRendering = function (scene) {
            this._scene = scene;
        };
        SystemMeshRender.prototype.Update = function (entities) {
            var _loop_1 = function(i) {
                if (this_1.checkCompatibleEntity(entities[i])) {
                    // update all entitys with a ComponentAbstractMesh and a ComponentTransform
                    var componentAbstractMesh_1 = entities[i].getComponent(this_1.neededComponents[0]);
                    var componentTransform = entities[i].getComponent(this_1.neededComponents[1]);
                    switch (componentAbstractMesh_1.meshState) {
                        case MeshLoadState.ReadyToLoad:
                            var meshLoadingOrLoaden = false;
                            if (this_1._meshDataList.length > 0) {
                                for (var j = 0; j < this_1._meshDataList.length; j++) {
                                    // check if mesh laoded or loading
                                    if (this_1.checkMeshDataMeshComponent(this_1._meshDataList[j], componentAbstractMesh_1)) {
                                        console.log("m c:" + this_1.checkMeshDataMeshComponent(this_1._meshDataList[j], componentAbstractMesh_1));
                                        meshLoadingOrLoaden = true;
                                        // file is in meshDataList(list of meshes that are loading, loaded or need to be loaded)
                                        if (this_1._meshDataList[j].meshLoaded) {
                                            this_1.cloneLoadedModel(componentAbstractMesh_1, j);
                                            break;
                                        }
                                        else {
                                            componentAbstractMesh_1.meshState = MeshLoadState.Loading;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (meshLoadingOrLoaden) {
                                break;
                            }
                            // create mesh data
                            var dataMesh_1 = new ECS.DataMesh(componentAbstractMesh_1.path, componentAbstractMesh_1.fileName);
                            this_1._meshDataList.push(dataMesh_1);
                            console.log("start load: " + componentAbstractMesh_1.fileName);
                            // load mesh
                            BABYLON.SceneLoader.ImportMesh("", componentAbstractMesh_1.path, componentAbstractMesh_1.fileName, this_1._scene, function (newMeshes, newParticlesystems, newSkeletons) {
                                console.log("loaded: " + componentAbstractMesh_1.fileName + " s:" + newSkeletons.length);
                                dataMesh_1.meshes = newMeshes;
                                dataMesh_1.skeleton = newSkeletons[0];
                                for (var j = 0; j < newMeshes.length; j++) {
                                    newMeshes[j].isVisible = false;
                                }
                            });
                            componentAbstractMesh_1.meshState = MeshLoadState.Loading;
                            break;
                        case MeshLoadState.Loading:
                            for (var j = 0; j < this_1._meshDataList.length; j++) {
                                if (this_1._meshDataList[j].meshLoaded) {
                                    if (this_1.checkMeshDataMeshComponent(this_1._meshDataList[j], componentAbstractMesh_1)) {
                                        // if loading complete get mesh set mesh to mesh component
                                        this_1.cloneLoadedModel(componentAbstractMesh_1, j);
                                    }
                                }
                            }
                            break;
                        case MeshLoadState.Loaded:
                            componentAbstractMesh_1.babylonMesh.setAbsolutePosition(componentTransform.getPosition);
                            componentAbstractMesh_1.babylonMesh.scaling = componentTransform.getScale;
                            componentAbstractMesh_1.babylonMesh.rotationQuaternion = componentTransform.getRotationQuaternion;
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
            /*
            // get from pool
            for (let k = 0; k < this._meshDataList[i].objectPool.length; k++) {
                if (!this._meshDataList[i].objectPool[k].inUse) {
                    meshFromPool = true;
                    this._meshDataList[i].objectPool[k].inUse = true;
                    if (this._meshDataList[i].objectPool[k].skeleton != null) {
                        componentAbstractMesh.babylonMesh = this._meshDataList[i].objectPool[k].meshes[1];
                        componentAbstractMesh.babylonMesh.skeleton = this._meshDataList[i].objectPool[k].skeleton;
                    } else {
                        componentAbstractMesh.babylonMesh = this._meshDataList[i].objectPool[k].meshes[0];
                    }
                    componentAbstractMesh.meshPoolObject = this._meshDataList[i].objectPool[k];
                    this._meshDataList[i].objectPool[k].inUse = true;
                }
            }
            */
            if (!meshFromPool) {
                // create new pool object
                componentAbstractMesh.meshPoolObject = new ECS.MeshPoolObject(true);
                componentAbstractMesh.meshPoolObject.meshes = this._meshDataList[i].meshes;
                // clone new mesh
                if (this._meshDataList[i].skeleton != null) {
                    componentAbstractMesh.babylonMesh = this._meshDataList[i].meshes[1].clone("mesh clone: " + componentAbstractMesh.fileName, parentNode);
                    componentAbstractMesh.babylonMesh.skeleton = this._meshDataList[i].skeleton;
                    componentAbstractMesh.meshPoolObject.skeleton = this._meshDataList[i].skeleton;
                }
                else {
                    componentAbstractMesh.babylonMesh = this._meshDataList[i].meshes[0].clone("mesh clone: " + componentAbstractMesh.fileName, parentNode);
                }
            }
            var clonedMehsNodeChilds = componentAbstractMesh.babylonMesh.parent.getChildMeshes();
            for (var j = 0; j < clonedMehsNodeChilds.length; j++) {
                clonedMehsNodeChilds[j].isVisible = true;
            }
            //componentAbstractMesh.babylonMesh.parent.getChildMeshes().isVisible = true;
            componentAbstractMesh.meshState = MeshLoadState.Loaded;
        };
        SystemMeshRender.prototype.returnTypeOfSystem = function () {
            return "TYPE_SYSTEM_MESH_RENDER";
        };
        SystemMeshRender.prototype.newOfThis = function () {
            return new SystemMeshRender();
        };
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