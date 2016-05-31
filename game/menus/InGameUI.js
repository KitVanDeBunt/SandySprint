var InGameUI = (function () {
    function InGameUI(canvas, engine, scene, gameUI, playerManager) {
        this.gameUI = gameUI;
        this.canvas = canvas;
        this.playerManager = playerManager;
        this.objects = [];
        this.scene = scene;
        this.CreateUI();
    }
    InGameUI.prototype.CreateUI = function () {
        this.gameUI.menuState = menuState.Game;
        var startScreenTex = new BABYLON.Texture("/assets/textures/UI textures/highscore-bar.png", this.scene, true);
        var logo = this.gameUI.createImage(new BABYLON.Vector2(-440, 415), new BABYLON.Vector2(580 / 2, 51 / 2), startScreenTex);
        this.objects.push(logo);
        startScreenTex = new BABYLON.Texture("/assets/textures/UI textures/treasure-bar.png", this.scene, true);
        var logo = this.gameUI.createImage(new BABYLON.Vector2(-440, 357), new BABYLON.Vector2(580 / 2, 51 / 2), startScreenTex);
        this.objects.push(logo);
        var material = new BABYLON.StandardMaterial("textuare1", scene);
        material.alpha = 1;
        material.diffuseColor = new BABYLON.Color3(1.00, 1.00, 1.00);
        this.myMaterial_diffuseTexture = new BABYLON.DynamicTexture('ScoreTex', 512, scene, true);
        this.myMaterial_diffuseTexture.hasAlpha = true;
        material.diffuseTexture = this.myMaterial_diffuseTexture;
        //Adding UI Element
        this.box = BABYLON.Mesh.CreatePlane("Box", 5, scene, false);
        this.box.material = material;
        this.box.scaling = new BABYLON.Vector3(200, 200, 1);
        this.box.layerMask = 0x20000000;
        this.objects.push(this.box);
        this.context2D = this.myMaterial_diffuseTexture.getContext();
    };
    InGameUI.prototype.update = function () {
        this.context2D.clearRect(0, 0, 512, 512);
        this.myMaterial_diffuseTexture.drawText("" + Math.round(this.playerManager.getplayerT()), 0, /*240-((1842 / this.canvas.width)*100)*/ 50, "25px Cooper Std Black", "black", "transparent");
        this.myMaterial_diffuseTexture.drawText("" + this.playerManager.getPickupsCollected(), 0, /*270-((1842 / this.canvas.width)*100)*/ 80, "25px Cooper Std Black", "black", "transparent");
    };
    InGameUI.prototype.Dispose = function () {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].dispose();
        }
    };
    return InGameUI;
}());
//# sourceMappingURL=InGameUI.js.map