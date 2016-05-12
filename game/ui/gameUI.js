/**
 * GameUI
 */
var GameUI = (function () {
    function GameUI(scene, playerManager, ecs) {
        this.playerManager = playerManager;
        //Adding light for UI elements
        var UIlight = new BABYLON.DirectionalLight("UIemit", new BABYLON.Vector3(0, 0, 1), scene);
        UIlight.includeOnlyWithLayerMask = 0x20000000;
        var tempLight = new BABYLON.DirectionalLight("UIemit", new BABYLON.Vector3(0, 0, 1), scene);
        // create UIcamera entity
        var cameraECS = ecs.createEntity();
        var cameraTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.005, 0.005, 0.005));
        cameraECS.addComponent(cameraTranslateComponent);
        var UICam = new ComponentCamera(cameraTranslateComponent, scene);
        UICam.setLayermask = 0x20000000;
        cameraECS.addComponent(UICam);
        //Adding UI Test Element Material
        var material = new BABYLON.StandardMaterial("textuare1", scene);
        material.alpha = 1;
        material.diffuseColor = new BABYLON.Color3(1.00, 1.00, 1.00);
        this.myMaterial_diffuseTexture = new BABYLON.DynamicTexture('ScoreTex', 512, scene, true);
        this.myMaterial_diffuseTexture.hasAlpha = true;
        material.diffuseTexture = this.myMaterial_diffuseTexture;
        //Adding UI Test Element
        this.box = BABYLON.Mesh.CreatePlane("Box", 5, scene, false);
        this.box.material = material;
        this.box.scaling = new BABYLON.Vector3(10, 10, 1);
        this.box.position = new BABYLON.Vector3(-53, -30, 100);
        this.box.layerMask = 0x20000000;
        this.context2D = this.myMaterial_diffuseTexture.getContext();
    }
    GameUI.prototype.update = function () {
        this.context2D.clearRect(0, 0, 512, 512);
        this.myMaterial_diffuseTexture.drawText("Score:" + this.playerManager.getplayerT(), 10, 360, "100px Arial", "white", "transparent");
    };
    return GameUI;
}());
//# sourceMappingURL=gameUI.js.map