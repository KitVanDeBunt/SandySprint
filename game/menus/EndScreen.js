/**
 * endScreen
 */
var endScreen = (function () {
    function endScreen(gameUI, scene) {
        this._scorecount = 0;
        this._scarabcount = 0;
        this._scoreCounted = false;
        this._gameUI = gameUI;
        this._scene = scene;
        this._objects = [];
        this._count = true;
        this.StartScreen();
    }
    /**
     * start EndScreen
     */
    endScreen.prototype.StartScreen = function () {
        this._objects = [];
        this._gameUI.menuState = menuState.End;
        var backgroundTex = new BABYLON.Texture("assets/textures/ui_textures/ui-background.png", this._scene, true);
        var background = this._gameUI.createImage(new BABYLON.Vector2(0, 0), new BABYLON.Vector2(337, 403), backgroundTex);
        this._objects.push(background);
        backgroundTex = new BABYLON.Texture("assets/textures/ui_textures/restart-button.png", this._scene, true);
        var play = this._gameUI.createImage(new BABYLON.Vector2(0, -270), new BABYLON.Vector2(50, 50), backgroundTex);
        this._objects.push(play);
        /*  backgroundTex = new BABYLON.Texture("assets/textures/ui_textures/exit-button.png", this._scene, true);
          var play = this._gameUI.createImage(new BABYLON.Vector2(200, -270), new BABYLON.Vector2(50, 50), backgroundTex);
          this._objects.push(play);*/
        var material = new BABYLON.StandardMaterial("textuare1", scene);
        material.alpha = 1;
        material.diffuseColor = new BABYLON.Color3(1.00, 1.00, 1.00);
        this._endscreentexture = new BABYLON.DynamicTexture('ScoreTex', 512, scene, true);
        this._endscreentexture.hasAlpha = true;
        material.diffuseTexture = this._endscreentexture;
        //Adding UI Element
        this._box = BABYLON.Mesh.CreatePlane("Box", 5, scene, false);
        this._box.material = material;
        this._box.scaling = new BABYLON.Vector3(200, 200, 1);
        this._box.layerMask = 0x20000000;
        this._objects.push(this._box);
        this.context2D = this._endscreentexture.getContext();
    };
    /**
     * update for the score count.
     */
    endScreen.prototype.update = function () {
        if (this._count) {
            if (!this._scoreCounted) {
                this._scorecount += 5;
                if (this._scorecount >= this._score) {
                    this._scorecount = this._score;
                    this._scoreCounted = true;
                }
            }
            else {
                this._scarabcount++;
                if (this._scarabcount >= this._scarabs) {
                    this._scarabcount = this._scarabs;
                    this._count = false;
                }
            }
        }
        this.context2D.clearRect(0, 0, 512, 512);
        this._endscreentexture.drawText("Score: " + Math.round(this._scorecount), 150, 260, "30px Cooper Std Black", "black", "transparent");
        this._endscreentexture.drawText("Scarabs: " + this._scarabcount + " *3", 150, 290, "30px Cooper Std Black", "black", "transparent");
        this._endscreentexture.drawText("Total: " + Math.round(this._scorecount + (this._scarabcount * 3)), 150, 330, "30px Cooper Std Black", "black", "transparent");
    };
    endScreen.prototype.onInput = function (inputPos) {
        if (!this._count) {
            this.Dispose();
            game();
        }
    };
    /**
     * Sets the score for the endscreen.
     */
    endScreen.prototype.setScore = function (score) {
        this._score = score;
    };
    /**
     * Sets the score for the endscreen.
     */
    endScreen.prototype.setScarabs = function (scarabs) {
        this._scarabs = scarabs;
    };
    /**
     * remove all UI objects
     */
    endScreen.prototype.Dispose = function () {
        for (var i = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
        }
    };
    return endScreen;
}());
//# sourceMappingURL=EndScreen.js.map