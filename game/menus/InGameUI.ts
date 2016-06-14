/**
 * InGameUI
 * Creates the tutorial and displays the score in game.
 */
class InGameUI {

    private _objects: Array<BABYLON.Mesh>;
    private _gameUI: GameUI;
    private _myMaterial_diffuseTexture: BABYLON.DynamicTexture;
    private _box: BABYLON.Mesh;
    private _canvas: HTMLCanvasElement;
    private context2D;
    private _scene: BABYLON.Scene;
    private _playerManager: PlayerManager;
    private _tutorialEnabled: boolean = true;
    private _tutorial: tutorial;

    /**
     * @param canvas the canvas that the game is getting displayed on.
     * @param engine the babylon engine that the game is running on.
     * @param scene the scene that the game is using.
     * @param gameUI the gameUI that created this InGameUI.
     * @param playerManager the playerManager that the player is using.
     * @param tutorialEnabled option to enable/disable the tutorial.
     */
    constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine, scene: BABYLON.Scene, gameUI: GameUI, playerManager: PlayerManager, tutorialEnabled: boolean) {
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
    private CreateUI() {
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
    }

    /**
     * checks if tutorial needs to be created, and does that if needed.
     */
    checkTutorial() {
        if (this._tutorialEnabled) {
            this._tutorial = new tutorial(this._gameUI, this._scene, this._playerManager, this);
        }
    }

    /**
     * Updates the score UI, and tutorial if needed.
     */
    update() {
        this.context2D.clearRect(0, 0, 512, 512);
        this._myMaterial_diffuseTexture.drawText("" + Math.round(this._playerManager.getplayerT() - this._gameUI.getPlayerTOffset()), 50, 99, "25px Cooper Std Black", "black", "transparent");
        this._myMaterial_diffuseTexture.drawText("" + this._playerManager.getPickupsCollected(), 50, 128, "25px Cooper Std Black", "black", "transparent");
        if (this._tutorialEnabled) {
            this._tutorial.update();
        }
    }

    /**
     * checks where the screen gets touched first.
     * @param inputPos the position of the touch.
     */
    onInputStart(inputPos: BABYLON.Vector2) {
        if (this._tutorialEnabled) {
            this._tutorial.onInputStart(inputPos);
        }
    }

    /**
     * checks where the touch moves to.
     * @param the position of the touch after moving.
     */
    onInputMove(inputPos: BABYLON.Vector2) {
        if (this._tutorialEnabled) {
            this._tutorial.onInputMove(inputPos);
        }
    }

    /**
     * checks if a key gets pressed.
     * @param keyEvt data about the pressed key.
     */
    onKeyDown(keyEvt: KeyboardEvent) {
        if (this._tutorialEnabled) {
            this._tutorial.onKeyDown(keyEvt);
        }
    }

    set tutorial(state: boolean) {
        this._tutorialEnabled = state;
    }
    
    get GetTutorial() {
        return this._tutorialEnabled;
    }

    /**
     * Deletes all objects
     */
    Dispose() {
        for (var i: number = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
        }
    }
}