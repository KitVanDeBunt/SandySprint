/**
 * InGameUI
 */
var InGameUI = (function () {
    function InGameUI(canvas, engine, scene, gameUI, playerManager) {
        this._gameUI = gameUI;
        this._canvas = canvas;
        this._playerManager = playerManager;
        this._objects = [];
        this._scene = scene;
        this._tutorialEnabled = true;
        this.CreateUI();
    }
    /**
     * Create UI element to display score upon
     */
    InGameUI.prototype.CreateUI = function () {
        this._gameUI.menuState = menuState.Game;
        var scoreBarTex = new BABYLON.Texture("assets/textures/ui_textures/highscore-bar.png", this._scene, true);
        var scoreBar = this._gameUI.createImage(new BABYLON.Vector2(-440, 400), new BABYLON.Vector2(580 / 2, 51 / 2), scoreBarTex);
        this._objects.push(scoreBar);
        var treasureBarTex = new BABYLON.Texture("assets/textures/ui_textures/treasure-bar.png", this._scene, true);
        var treasureBar = this._gameUI.createImage(new BABYLON.Vector2(-440, 342), new BABYLON.Vector2(580 / 2, 51 / 2), treasureBarTex);
        this._objects.push(treasureBar);
        if (this._tutorialEnabled) {
            this._tutorial = new tutorial(this._gameUI, this._scene, this._playerManager);
        }
        var material = new BABYLON.StandardMaterial("UITextTexture", this._scene);
        material.alpha = 1;
        material.diffuseColor = new BABYLON.Color3(1.00, 1.00, 1.00);
        this._myMaterial_diffuseTexture = new BABYLON.DynamicTexture('ScoreTex', 512, this._scene, true);
        this._myMaterial_diffuseTexture.hasAlpha = true;
        material.diffuseTexture = this._myMaterial_diffuseTexture;
        //Adding UI Element
        this._box = BABYLON.Mesh.CreatePlane("Box", 5, this._scene, false);
        this._box.material = material;
        this._box.scaling = new BABYLON.Vector3(200, 200, 1);
        this._box.layerMask = 0x20000000;
        this._objects.push(this._box);
        this.context2D = this._myMaterial_diffuseTexture.getContext();
    };
    /**
     * Updates the score UI
     */
    InGameUI.prototype.update = function () {
        this.context2D.clearRect(0, 0, 512, 512);
        this._myMaterial_diffuseTexture.drawText("" + Math.round(this._playerManager.getplayerT() - this._gameUI.getPlayerTOffset()), 0, 58, "25px Cooper Std Black", "black", "transparent");
        this._myMaterial_diffuseTexture.drawText("" + this._playerManager.getPickupsCollected(), 0, 88, "25px Cooper Std Black", "black", "transparent");
        if (this._tutorialEnabled) {
            this._tutorial.update();
        }
    };
    InGameUI.prototype.onInputStart = function (inputPos) {
        if (this._tutorialEnabled) {
            this._tutorial.onInputStart(inputPos);
        }
    };
    InGameUI.prototype.onKeyDown = function (keyEvt) {
        if (this._tutorialEnabled) {
            this._tutorial.onKeyDown(keyEvt);
        }
    };
    /**
     * Delete all objects
     */
    InGameUI.prototype.Dispose = function () {
        for (var i = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
        }
    };
    return InGameUI;
}());
//# sourceMappingURL=InGameUI.js.map