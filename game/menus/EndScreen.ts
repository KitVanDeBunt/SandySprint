/**
 * endScreen
 * creates the endscreen, and shows the score.
 */
class endScreen {

    private _objects: Array<BABYLON.Mesh>;
    private _gameUI: GameUI;
    private _scene: BABYLON.Scene;
    private _score: number;
    private _scarabs: number;
    private _count: boolean;
    private _totalscore: number;
    private _scorecount: number = 0;
    private _scarabcount: number = 0;
    private _endscreentexture: BABYLON.DynamicTexture;
    private context2D;
    private _box: BABYLON.Mesh;
    private _scoreCounted: boolean = false;

    /**
     * @param gameUI the gameUI that has created this endscreen.
     * @param scene the scene that the game is using.
     */
    constructor(gameUI: GameUI, scene: BABYLON.Scene) {
        this._gameUI = gameUI;
        this._scene = scene;
        this._objects = [];
        this._count = true;

        this.ShowScreen();
    }

    /**
     * creates all the elements for the endscreen.
     */
    ShowScreen() {
        this._objects = [];
        this._gameUI.menuState = menuState.End;

        var backgroundTex = new BABYLON.Texture("assets/textures/ui_textures/ui-background.png", this._scene, true);
        var background = this._gameUI.createImage(new BABYLON.Vector2(0, 0), new BABYLON.Vector2(337, 403), backgroundTex);
        this._objects.push(background);

        backgroundTex = new BABYLON.Texture("assets/textures/ui_textures/restart-button.png", this._scene, true);
        var play = this._gameUI.createImage(new BABYLON.Vector2(0, -270), new BABYLON.Vector2(80, 80), backgroundTex);
        this._objects.push(play);

        var material = new BABYLON.StandardMaterial("textuare1", this._scene);
        material.alpha = 1;

        material.diffuseColor = new BABYLON.Color3(1.00, 1.00, 1.00);

        this._endscreentexture = new BABYLON.DynamicTexture('ScoreTex', 512, this._scene, true);
        this._endscreentexture.hasAlpha = true;
        material.diffuseTexture = this._endscreentexture;

        //Adding UI Element
        this._box = BABYLON.Mesh.CreatePlane("Box", 5, this._scene, false);
        this._box.material = material;
        this._box.scaling = new BABYLON.Vector3(200, 200, 1);
        this._box.layerMask = 0x20000000;
        this._objects.push(this._box);

        this.context2D = this._endscreentexture.getContext();
    }

    /**
     * update for the score count and drawText.
     */
    update() {
        if (this._count) {
            if (!this._scoreCounted) {
                this._scorecount += (3.4 + (this._score / 100));
                if (this._scorecount >= this._score) {
                    this._scorecount = this._score;
                    this._scoreCounted = true;
                }

            }
            else {
                this._scarabcount += (1.4 + (this._scarabs / 80));
                if (this._scarabcount >= this._scarabs) {
                    this._scarabcount = this._scarabs;
                    this._count = false;
                }
            }
        }
        this.context2D.clearRect(0, 0, 512, 512);
        this._endscreentexture.drawText("Score: " + Math.round(this._scorecount), 150, 260, "30px Cooper Std Black", "black", "transparent");
        this._endscreentexture.drawText("Scarabs: " + Math.round(this._scarabcount) + "  x 3", 150, 290, "30px Cooper Std Black", "black", "transparent");
        this._endscreentexture.drawText("Total: " + Math.round(this._scorecount + (this._scarabcount * 3)), 150, 330, "30px Cooper Std Black", "black", "transparent");

    }

    /**
     * restarts game when mousebutton gets pressed, or the screen gets touched.
     */
    onInput(inputPos: BABYLON.Vector2) {
        if (this.Dispose()) {
            main.game();
        }
    }

    /**
     * Sets the score for the endscreen.
     */
    setScore(score: number) {
        this._score = score;
    }

    /**
     * Sets the scarab count for the endscreen.
     */
    setScarabs(scarabs: number) {
        this._scarabs = scarabs;
    }

    /**
     * remove all UI objects
     */
    Dispose(): boolean {
        for (var i: number = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
        }
        return true;
    }
}