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
            this.neededComponents[1] = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero()).componentType();
        }
        SystemMeshRender.prototype.initRendering = function (scene) {
            this.scene = scene;
        };
        SystemMeshRender.prototype.Update = function (entities) {
            var _loop_1 = function() {
                if (this_1.checkCompatibleEntity(entities[i])) {
                    var componentAbstractMesh_1 = entities[i].getComponent(this_1.neededComponents[0]);
                    var componentPosition = entities[i].getComponent(this_1.neededComponents[1]);
                    //console.log("[SystemMeshRender]mesh pos:" + componentPosition.getPosition);
                    //console.log("[SystemMeshRender]mesh state:" + componentAbstractMesh.meshState);
                    switch (componentAbstractMesh_1.meshState) {
                        case MeshLoadState.ReadyToLoad:
                            componentAbstractMesh_1.meshState = MeshLoadState.Loading;
                            // load mesh
                            BABYLON.SceneLoader.ImportMesh("", componentAbstractMesh_1.path, componentAbstractMesh_1.fileName, this_1.scene, function (newMeshes) {
                                console.log("newMeshes.length: " + newMeshes.length);
                                componentAbstractMesh_1.babylonMesh = newMeshes[0];
                                componentAbstractMesh_1.meshState = MeshLoadState.Loaded;
                                //console.log("[SystemMeshRender]mesh loaded");
                            });
                            break;
                        case MeshLoadState.Loaded:
                            componentAbstractMesh_1.babylonMesh.setAbsolutePosition(componentPosition.getPosition);
                            componentAbstractMesh_1.babylonMesh.scaling = componentPosition.getScale;
                            componentAbstractMesh_1.executeRotateQueue();
                            //console.log("-:"+componentAbstractMesh.babylonMesh.scaling);
                            //componentAbstractMesh.babylonMesh.translate(new BABYLON.Vector3(1,0,0),3.5);
                            break;
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < entities.length; i++) {
                _loop_1();
            }
        };
        SystemMeshRender.prototype.returnTypeOfSystem = function () {
            return "TYPE_SYSTEM_MESH_RENDER";
        };
        SystemMeshRender.prototype.newOfThis = function () {
            return new SystemMeshRender();
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