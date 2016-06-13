namespace ECS {
    /**
     * SystemMeshRender
     */
    export class SystemMeshRender extends System {

        private _scene: BABYLON.Scene;

        // list of meshes that are loading, loaded or need to be loaded
        private _meshDataList: DataMesh[];

        /**
         * list of entitys used for the loading function
         */
        private _loadingEntitys: Entity[];

        constructor() {
            super();

            // get needed component types
            this.neededComponents[0] = new ComponentAbstractMesh(null, "", "").componentType();
            this.neededComponents[1] = new ComponentTransform(BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero(), BABYLON.Quaternion.Identity()).componentType();

            this._meshDataList = [];
        }

        /**
         * initialize the render system
         */
        initRendering(scene: BABYLON.Scene): void {
            this._scene = scene;
        }

        /**
         * laods list of models in manualy
         * @param modelPathList list 
         */
        StartLoading(modelPathList: string[], modelNameList: string[]) {
            this._loadingEntitys = [];
            for (let i = 0; i < modelPathList.length; i++) {
                let loadObject: Entity = this._engine.createEntity();
                let loadObjectTransform: ECS.ComponentTransform = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(1, 1, 1), BABYLON.Quaternion.Identity());
                loadObject.addComponent(loadObjectTransform);
                let loadObjectMesh: ECS.ComponentAbstractMesh = new ECS.ComponentAbstractMesh(loadObjectTransform, modelPathList[i], modelNameList[i]);
                loadObject.addComponent(loadObjectMesh);
                this._loadingEntitys[i] = loadObject;
            }
        }

        /**
         * returns the procentage of the models loaded
         * @returns loading progress
         */
        LoadingProgress(): number {
            let progress:number = 0;
            let meshCount:number = this._meshDataList.length;
            let loadedMeshCount:number = 0;
            for (var i = 0; i < this._meshDataList.length; i++) {
                if(this._meshDataList[i].meshLoaded){
                    loadedMeshCount++;
                }
            }
            progress = loadedMeshCount/meshCount;
            return progress;
        }
        
        /**
         * removes objects used for loading
         */
        RemoveLoadingObjects(){
            for (var i = 0; i < this._loadingEntitys.length; i++) {
                this._loadingEntitys[i].destroy();
            }
        }

        /**
         * updates this system
         * @param entities entitys updated
         */
        Update<T extends Entity>(entities: T[]): void {
            for (let i = 0; i < entities.length; i++) {
                if (this.checkCompatibleEntity(entities[i])) {
                    // update all entitys with a ComponentAbstractMesh and a ComponentTransform
                    let componentAbstractMesh: ComponentAbstractMesh = <ComponentAbstractMesh>entities[i].getComponent(this.neededComponents[0]);
                    let componentTransform: ComponentTransform = <ComponentTransform>entities[i].getComponent(this.neededComponents[1]);

                    switch (componentAbstractMesh.meshState) {

                        case MeshLoadState.ReadyToLoad:
                            let meshLoadingOrLoaden: boolean = false;
                            if (this._meshDataList.length > 0) {
                                for (let j = 0; j < this._meshDataList.length; j++) {
                                    // check if mesh laoded or loading
                                    if (this.checkMeshDataMeshComponent(this._meshDataList[j], componentAbstractMesh)) {
                                        //console.log("m c:" + this.checkMeshDataMeshComponent(this._meshDataList[j], componentAbstractMesh));
                                        meshLoadingOrLoaden = true;
                                        // file is in meshDataList(list of meshes that are loading, loaded or need to be loaded)
                                        if (this._meshDataList[j].meshLoaded) {
                                            this.cloneLoadedModel(componentAbstractMesh, j);
                                            break;
                                        } else {
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
                            let dataMesh: DataMesh = new DataMesh(componentAbstractMesh.path, componentAbstractMesh.fileName);
                            this._meshDataList.push(dataMesh);

                            console.log("start load: " + componentAbstractMesh.fileName);
                            // load mesh
                            BABYLON.SceneLoader.ImportMesh("", componentAbstractMesh.path, componentAbstractMesh.fileName, this._scene
                                , function (newMeshes, newParticlesystems, newSkeletons) {
                                    console.log("loaded: " + componentAbstractMesh.fileName + " s:" + newSkeletons.length);
                                    dataMesh.meshes = newMeshes;
                                    dataMesh.skeleton = newSkeletons[0];
                                    for (var j = 0; j < newMeshes.length; j++) {
                                        newMeshes[j].isVisible = false;
                                    }
                                }
                            );
                            componentAbstractMesh.meshState = MeshLoadState.Loading;
                            break;

                        case MeshLoadState.Loading:
                            for (let j = 0; j < this._meshDataList.length; j++) {
                                if (this._meshDataList[j].meshLoaded) {
                                    if (this.checkMeshDataMeshComponent(this._meshDataList[j], componentAbstractMesh)) {
                                        // if loading complete get mesh set mesh to mesh component
                                        this.cloneLoadedModel(componentAbstractMesh, j);
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
            }
        }

        /**
         * clones a model that has been loaded by this system
         * @param componentAbstractMesh the new clone
         * @param meshDataListIndex the index of the mesh in the system
         */
        private cloneLoadedModel(componentAbstractMesh: ComponentAbstractMesh, meshDataListIndex: number): void {
            let parentNode: BABYLON.Node = new BABYLON.Node("node: " + componentAbstractMesh.fileName, this._scene);
            let i: number = meshDataListIndex;
            let meshFromPool: boolean = false
            // TODO : object pooling
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
                componentAbstractMesh.meshPoolObject = new MeshPoolObject(true);
                componentAbstractMesh.meshPoolObject.meshes = this._meshDataList[i].meshes;
                // clone new mesh
                if (this._meshDataList[i].skeleton != null) {
                    componentAbstractMesh.babylonMesh = this._meshDataList[i].meshes[1].clone("mesh clone: " + componentAbstractMesh.fileName, parentNode);
                    componentAbstractMesh.babylonMesh.skeleton = this._meshDataList[i].skeleton;
                    componentAbstractMesh.meshPoolObject.skeleton = this._meshDataList[i].skeleton;
                } else {
                    componentAbstractMesh.babylonMesh = this._meshDataList[i].meshes[0].clone("mesh clone: " + componentAbstractMesh.fileName, parentNode);
                }
                // add pool object to pool
                //this._meshDataList[i].objectPool.push(componentAbstractMesh.meshPoolObject);
            }
            let clonedMehsNodeChilds: BABYLON.AbstractMesh[] = componentAbstractMesh.babylonMesh.parent.getChildMeshes();
            for (let j = 0; j < clonedMehsNodeChilds.length; j++) {
                clonedMehsNodeChilds[j].isVisible = true;
            }
            //componentAbstractMesh.babylonMesh.parent.getChildMeshes().isVisible = true;
            componentAbstractMesh.meshState = MeshLoadState.Loaded;
        }

        /**
         * returns the type name of this system
         */
        returnTypeOfSystem(): string {
            return "TYPE_SYSTEM_MESH_RENDER";
        }

        /**
         * returns a new instance of this class
         */
        newOfThis(): SystemMeshRender {
            return new SystemMeshRender();
        }

        /**
         * checks if ComponentAbstractMesh and DataMesh use the same model file and path
         * @param meshData instande of DataMesh
         * @param meshComponent instande of ComponentAbstractMesh
         */
        private checkMeshDataMeshComponent(meshData: DataMesh, meshComponent: ComponentAbstractMesh): boolean {
            return (meshData.fileName == meshComponent.fileName && meshData.filePath == meshComponent.path);
        }
    }

    export enum MeshLoadState {
        Non,
        ReadyToLoad,
        Loading,
        Loaded,
        Clone
    }
}