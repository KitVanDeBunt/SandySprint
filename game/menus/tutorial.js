var tutorial = (function () {
    function tutorial(gameUI, scene, playerManager) {
        this._gameUI = gameUI;
        this._playermanager = playerManager;
        this._scene = scene;
        this._tutorialState = tutorialState.None;
        this._objects = [];
    }
    tutorial.prototype.openImage = function () {
        switch (this._tutorialState) {
            case tutorialState.Move:
                var tutorialMoveTex = new BABYLON.Texture("assets/textures/ui_textures/ui-background.png", this._scene, true);
                var tutorialMove = this._gameUI.createImage(new BABYLON.Vector2(0, 0), new BABYLON.Vector2(337 / 2, 403 / 2), tutorialMoveTex);
                this._objects.push(tutorialMove);
                break;
            case tutorialState.Jump:
                var tutorialJumpTex = new BABYLON.Texture("assets/textures/ui_textures/ui-background.png", this._scene, true);
                var tutorialJump = this._gameUI.createImage(new BABYLON.Vector2(-440, 400), new BABYLON.Vector2(337 / 2, 403 / 2), tutorialJumpTex);
                this._objects.push(tutorialJump);
                break;
            default:
                break;
        }
    };
    tutorial.prototype.update = function () {
        switch (this._tutorialState) {
            case tutorialState.None:
                if (Math.round(this._playermanager.getplayerT()) == 15) {
                    this._tutorialState = tutorialState.Move;
                    // this._playermanager.setPlayerSpeed(0);
                    this.openImage();
                }
                break;
            case tutorialState.Move:
                break;
            case tutorialState.Jump:
                break;
            default:
                break;
        }
    };
    tutorial.prototype.onInputStart = function (inputPos) {
    };
    tutorial.prototype.onKeyDown = function (keyEvt) {
    };
    tutorial.prototype.dispose = function () {
        for (var i = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
        }
    };
    return tutorial;
}());
var tutorialState;
(function (tutorialState) {
    tutorialState[tutorialState["None"] = 0] = "None";
    tutorialState[tutorialState["Move"] = 1] = "Move";
    tutorialState[tutorialState["Jump"] = 2] = "Jump";
})(tutorialState || (tutorialState = {}));
//# sourceMappingURL=tutorial.js.map