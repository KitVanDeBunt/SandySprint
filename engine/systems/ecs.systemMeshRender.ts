namespace ECS {
    /**
     * SystemMeshRender
     */
    export class SystemMeshRender extends System {

        private scene: BABYLON.Scene;

        constructor() {
            super();

            // get needed component types
            this.neededComponents[0] = new ComponentAbstractMesh(null, "", "").componentType();
            this.neededComponents[1] = new ComponentTransform(BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero()).componentType();
        }

        initRendering(scene: BABYLON.Scene) {
            this.scene = scene;
        }

        Update<T extends Entity>(entities: T[]) {
            for (var i = 0; i < entities.length; i++) {
                if (this.checkCompatibleEntity(entities[i])) {
                    let componentAbstractMesh: ComponentAbstractMesh = <ComponentAbstractMesh>entities[i].getComponent(this.neededComponents[0]);
                    let componentPosition: ComponentTransform = <ComponentTransform>entities[i].getComponent(this.neededComponents[1]);
                    //console.log("[SystemMeshRender]mesh pos:" + componentPosition.getPosition);
                    //console.log("[SystemMeshRender]mesh state:" + componentAbstractMesh.meshState);

                    switch (componentAbstractMesh.meshState) {
                        case MeshLoadState.ReadyToLoad:
                            componentAbstractMesh.meshState = MeshLoadState.Loading;

                            // load mesh
                            BABYLON.SceneLoader.ImportMesh("", componentAbstractMesh.path, componentAbstractMesh.fileName, this.scene
                                , function (newMeshes, newParticlesystems, newSkeletons) {
                                    //console.log("newMeshes.length: " + newMeshes.length);
                                    componentAbstractMesh.babylonMesh = newMeshes[0];
                                    componentAbstractMesh.babylonSkeleton = newSkeletons[0];
                                    componentAbstractMesh.meshState = MeshLoadState.Loaded;
                                    //console.log("[SystemMeshRender]mesh loaded");
                                });
                            break;
                        case MeshLoadState.Loaded:
                            componentAbstractMesh.babylonMesh.setAbsolutePosition(componentPosition.getPosition);
                            componentAbstractMesh.babylonMesh.scaling = componentPosition.getScale;
                            componentAbstractMesh.executeRotateQueue();
                            //console.log("-:"+componentAbstractMesh.babylonMesh.scaling);
                            //componentAbstractMesh.babylonMesh.translate(new BABYLON.Vector3(1,0,0),3.5);
                            break;
                    }
                }
            }
        }

        returnTypeOfSystem(): string {
            return "TYPE_SYSTEM_MESH_RENDER";
        }

        newOfThis(): SystemMeshRender {
            return new SystemMeshRender();
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