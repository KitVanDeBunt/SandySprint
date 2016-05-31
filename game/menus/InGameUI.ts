/**
 * InGameUI
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

    constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine, scene: BABYLON.Scene, gameUI: GameUI, playerManager: PlayerManager) {
        this._gameUI = gameUI;
        this._canvas = canvas;
        this._playerManager = playerManager;
        this._objects = [];
        this._scene = scene;

        this.CreateUI();
    }

    /**
     * Create UI element to display score upon
     */
    private CreateUI() {
        this._gameUI.menuState = menuState.Game;

        var scoreBarTex = new BABYLON.Texture("/assets/textures/UI textures/highscore-bar.png", this._scene, true);
        var scoreBar = this._gameUI.createImage(new BABYLON.Vector2(-440, 400), new BABYLON.Vector2(580 / 2, 51 / 2), scoreBarTex);
        this._objects.push(scoreBar);

        var treasureBarTex = new BABYLON.Texture("/assets/textures/UI textures/treasure-bar.png", this._scene, true);
        var treasureBar = this._gameUI.createImage(new BABYLON.Vector2(-440, 342), new BABYLON.Vector2(580 / 2, 51 / 2), treasureBarTex);
        this._objects.push(treasureBar);

        var material = new BABYLON.StandardMaterial("textuare1", scene);
        material.alpha = 1;

        material.diffuseColor = new BABYLON.Color3(1.00, 1.00, 1.00);

        this._myMaterial_diffuseTexture = new BABYLON.DynamicTexture('ScoreTex', 512, scene, true);
        this._myMaterial_diffuseTexture.hasAlpha = true;
        material.diffuseTexture = this._myMaterial_diffuseTexture;

        //Adding UI Element
        this._box = BABYLON.Mesh.CreatePlane("Box", 5, scene, false);
        this._box.material = material;
        this._box.scaling = new BABYLON.Vector3(200, 200, 1);
        this._box.layerMask = 0x20000000;
        this._objects.push(this._box);

        this.context2D = this._myMaterial_diffuseTexture.getContext();
    }

    /**
     * Updates the score UI
     */
    update() {
        this.context2D.clearRect(0, 0, 512, 512);
        this._myMaterial_diffuseTexture.drawText("" + Math.round(this._playerManager.getplayerT()), 0, 57, "25px Cooper Std Black", "black", "transparent");
        this._myMaterial_diffuseTexture.drawText("" + this._playerManager.getPickupsCollected(), 0, 87, "25px Cooper Std Black", "black", "transparent")
    }

    /**
     * Delete all objects
     */
    Dispose() {
        for (var i: number = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
            //this._objects.splice(i,1);
        }
    }
}