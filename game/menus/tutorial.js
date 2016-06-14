/**
 * tutorial
 * get created when gameUI.tutorialEnabled == true, creates tutorial images in the UI and pauses the game.
 */
var tutorial = (function () {
    /**
     * @param gameUI the gameUI of the game.
     * @param scene the scene of the game.
     * @param playerManager the playerManager that is running, to check playerT.
     * @param inGameUI the running inGameUI of GameUI.
     */
    function tutorial(gameUI, scene, playerManager, inGameUI) {
        this._tutFinished = false;
        this._gameUI = gameUI;
        this._playermanager = playerManager;
        this._scene = scene;
        this._tutorialState = tutorialState.None;
        this._inGameUI = inGameUI;
        this._objects = [];
    }
    /**
     * checks which images needs to be created, and does that.
     */
    tutorial.prototype.openImage = function () {
        switch (this._tutorialState) {
            case tutorialState.Move:
                var tutorialMoveTex = new BABYLON.Texture("assets/textures/ui_textures/controls1.png", this._scene, true);
                var tutorialMove = this._gameUI.createImage(new BABYLON.Vector2(0, 0), new BABYLON.Vector2(337 * 0.8, 403 * 0.8), tutorialMoveTex);
                this._objects.push(tutorialMove);
                break;
            case tutorialState.Jump:
                var tutorialJumpTex = new BABYLON.Texture("assets/textures/ui_textures/controls2.png", this._scene, true);
                var tutorialJump = this._gameUI.createImage(new BABYLON.Vector2(0, 0), new BABYLON.Vector2(337 * 0.8, 403 * 0.8), tutorialJumpTex);
                this._objects.push(tutorialJump);
                break;
            default:
                break;
        }
    };
    /**
     * check if tutorial images need to be created.
     */
    tutorial.prototype.update = function () {
        if (this._tutFinished == false) {
            switch (this._tutorialState) {
                case tutorialState.None:
                    if (Math.round(this._playermanager.getplayerT() - this._gameUI.getPlayerTOffset()) >= 21) {
                        this._tutorialState = tutorialState.Move;
                        this._playermanager.setPlaying(false);
                        this.openImage();
                    }
                    break;
                case tutorialState.WaitForJump:
                    if (Math.round(this._playermanager.getplayerT() - this._gameUI.getPlayerTOffset()) >= 36) {
                        this._tutorialState = tutorialState.Jump;
                        this._playermanager.setPlaying(false);
                        this.openImage();
                    }
                    break;
                default:
                    break;
            }
        }
    };
    /**
     * when the screen gets touched.
     * @param inputPos (x,y) position of the touch.
     */
    tutorial.prototype.onInputStart = function (inputPos) {
        this._touchStart = inputPos;
    };
    /**
     * when the screen gets swiped.
     * @param inputPos (x,y) position of the moved finger.
     */
    tutorial.prototype.onInputMove = function (inputPos) {
        var touchEnd = new BABYLON.Vector2(inputPos.x, inputPos.y);
        switch (this._tutorialState) {
            case tutorialState.Move:
                if (touchEnd.x - this._touchStart.x > screen.width * 0.1 || touchEnd.x - this._touchStart.x < -screen.width * 0.1) {
                    this.disposeObjects();
                    this._tutorialState = tutorialState.WaitForJump;
                    this._playermanager.setPlaying(true);
                }
                break;
            case tutorialState.Jump:
                if (touchEnd.y - this._touchStart.y < -screen.height * 0.2) {
                    this.disposeObjects();
                    this._tutorialState = tutorialState.None;
                    this._playermanager.setPlaying(true);
                    this._inGameUI.tutorial = false;
                    this._tutFinished = true;
                }
                break;
            default:
                break;
        }
    };
    /**
     * when a key gets pressed.
     * @param keyEvt data about the pressed key.
     */
    tutorial.prototype.onKeyDown = function (keyEvt) {
        switch (this._tutorialState) {
            case tutorialState.Move:
                switch (keyEvt.keyCode) {
                    case 65: //'Left'
                    case 37: //'Left'
                    case 68: //'Right'
                    case 39:
                        this.disposeObjects();
                        this._tutorialState = tutorialState.WaitForJump;
                        this._playermanager.setPlaying(true);
                        break;
                }
                break;
            case tutorialState.Jump:
                switch (keyEvt.keyCode) {
                    case 38: //'Jump'
                    case 32: //'Jump'
                    case 87:
                        this.disposeObjects();
                        this._tutorialState = tutorialState.None;
                        this._playermanager.setPlaying(true);
                        this._inGameUI.tutorial = false;
                        break;
                }
                break;
            default:
                break;
        }
    };
    /**
     * removes all tutorial elements.
     */
    tutorial.prototype.disposeObjects = function () {
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
    tutorialState[tutorialState["WaitForJump"] = 2] = "WaitForJump";
    tutorialState[tutorialState["Jump"] = 3] = "Jump";
})(tutorialState || (tutorialState = {}));
//# sourceMappingURL=tutorial.js.map