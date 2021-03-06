/**
 * InGameUI
 * Creates the tutorial and displays the score in game.
 */
var InGameUI = (function () {
    /**
     * @param canvas the canvas that the game is getting displayed on.
     * @param engine the babylon engine that the game is running on.
     * @param scene the scene that the game is using.
     * @param gameUI the gameUI that created this InGameUI.
     * @param playerManager the playerManager that the player is using.
     * @param tutorialEnabled option to enable/disable the tutorial.
     */
    function InGameUI(canvas, engine, scene, gameUI, playerManager, tutorialEnabled) {
        this._tutorialEnabled = true;
        this._gameUI = gameUI;
        this._canvas = canvas;
        this._playerManager = playerManager;
        this._objects = [];
        this._scene = scene;
        this._tutorialEnabled = tutorialEnabled;
        this.CreateUI();
    }
    /**
     * Create UI element to display score upon
     */
    InGameUI.prototype.CreateUI = function () {
        this.checkTutorial();
        //score background
        var scoreBarTex = new BABYLON.Texture("assets/textures/ui_textures/highscore-bar.png", this._scene, true);
        var scoreBar = this._gameUI.createImage(new BABYLON.Vector2(-340, 320), new BABYLON.Vector2(580 / 2, 51 / 2), scoreBarTex);
        this._objects.push(scoreBar);
        //scarabs background
        var treasureBarTex = new BABYLON.Texture("assets/textures/ui_textures/treasure-bar.png", this._scene, true);
        var treasureBar = this._gameUI.createImage(new BABYLON.Vector2(-340, 262), new BABYLON.Vector2(580 / 2, 51 / 2), treasureBarTex);
        this._objects.push(treasureBar);
        //score material
        var material = new BABYLON.StandardMaterial("UITextTexture", this._scene);
        material.alpha = 1;
        material.diffuseColor = new BABYLON.Color3(1.00, 1.00, 1.00);
        //score texture
        this._myMaterial_diffuseTexture = new BABYLON.DynamicTexture('ScoreTex', 512, this._scene, true);
        this._myMaterial_diffuseTexture.hasAlpha = true;
        material.diffuseTexture = this._myMaterial_diffuseTexture;
        //Adding text element
        this._box = BABYLON.Mesh.CreatePlane("Box", 5, this._scene, false);
        this._box.material = material;
        this._box.scaling = new BABYLON.Vector3(200, 200, 1);
        this._box.layerMask = 0x20000000;
        this._objects.push(this._box);
        this.context2D = this._myMaterial_diffuseTexture.getContext();
        this._gameUI.menuState = menuState.Game;
    };
    /**
     * checks if tutorial needs to be created, and does that if needed.
     */
    InGameUI.prototype.checkTutorial = function () {
        if (this._tutorialEnabled) {
            this._tutorial = new tutorial(this._gameUI, this._scene, this._playerManager, this);
        }
    };
    /**
     * Updates the score UI, and tutorial if needed.
     */
    InGameUI.prototype.update = function () {
        this.context2D.clearRect(0, 0, 512, 512);
        this._myMaterial_diffuseTexture.drawText("" + Math.round(this._playerManager.getplayerT() - this._gameUI.getPlayerTOffset()), 50, 99, "25px Cooper Std Black", "black", "transparent");
        this._myMaterial_diffuseTexture.drawText("" + this._playerManager.getPickupsCollected(), 50, 128, "25px Cooper Std Black", "black", "transparent");
        if (this._tutorialEnabled) {
            this._tutorial.update();
        }
    };
    /**
     * checks where the screen gets touched first.
     * @param inputPos the position of the touch.
     */
    InGameUI.prototype.onInputStart = function (inputPos) {
        if (this._tutorialEnabled) {
            this._tutorial.onInputStart(inputPos);
        }
    };
    /**
     * checks where the touch moves to.
     * @param the position of the touch after moving.
     */
    InGameUI.prototype.onInputMove = function (inputPos) {
        if (this._tutorialEnabled) {
            this._tutorial.onInputMove(inputPos);
        }
    };
    /**
     * checks if a key gets pressed.
     * @param keyEvt data about the pressed key.
     */
    InGameUI.prototype.onKeyDown = function (keyEvt) {
        if (this._tutorialEnabled) {
            this._tutorial.onKeyDown(keyEvt);
        }
    };
    Object.defineProperty(InGameUI.prototype, "tutorial", {
        set: function (state) {
            this._tutorialEnabled = state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InGameUI.prototype, "GetTutorial", {
        get: function () {
            return this._tutorialEnabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Deletes all objects
     */
    InGameUI.prototype.Dispose = function () {
        for (var i = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
        }
    };
    return InGameUI;
}());
//# sourceMappingURL=InGameUI.js.map