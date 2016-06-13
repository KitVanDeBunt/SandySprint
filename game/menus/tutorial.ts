/**
 * tutorial
 * get created when gameUI.tutorialEnabled == true, creates tutorial images in the UI and pauses the game.
 */
class tutorial {

    private _objects: Array<BABYLON.Mesh>;
    private _scene: BABYLON.Scene;
    private _gameUI: GameUI;
    private _playermanager: PlayerManager;
    private _tutorialState: tutorialState;
    private _inGameUI: InGameUI;
    private _touchStart: BABYLON.Vector2;
    private _tutFinished: boolean = false;

    /**
     * @param gameUI the gameUI of the game.
     * @param scene the scene of the game.
     * @param playerManager the playerManager that is running, to check playerT.
     * @param inGameUI the running inGameUI of GameUI.
     */
    constructor(gameUI: GameUI, scene: BABYLON.Scene, playerManager: PlayerManager, inGameUI: InGameUI) {
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
    openImage() {
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

    }

    /**
     * check if tutorial images need to be created.
     */
    update() {
        if (this._tutFinished == false) {
            switch (this._tutorialState) {
                case tutorialState.None:
                    if (Math.round(this._playermanager.getplayerT() - this._gameUI.getPlayerTOffset()) >= 20) {
                        this._tutorialState = tutorialState.Move;
                        this._playermanager.setPlaying(false);
                        this.openImage();
                    }
                    break;
                case tutorialState.WaitForJump:
                    if (Math.round(this._playermanager.getplayerT() - this._gameUI.getPlayerTOffset()) >= 40) {
                        this._tutorialState = tutorialState.Jump;
                        this._playermanager.setPlaying(false);
                        this.openImage();
                    }
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * when the screen gets touched.
     * @param inputPos (x,y) position of the touch.
     */
    onInputStart(inputPos: BABYLON.Vector2) {
        this._touchStart = inputPos;
    }

    /**
     * when the screen gets swiped.
     * @param inputPos (x,y) position of the moved finger.
     */
    onInputMove(inputPos: BABYLON.Vector2) {
        var touchEnd: BABYLON.Vector2 = new BABYLON.Vector2(inputPos.x, inputPos.y);
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
    }

    /**
     * when a key gets pressed.
     * @param keyEvt data about the pressed key.
     */
    onKeyDown(keyEvt: KeyboardEvent) {
        switch (this._tutorialState) {
            case tutorialState.Move:
                switch (keyEvt.keyCode) {
                    case 65: //'Left'
                    case 37: //'Left'
                    case 68: //'Right'
                    case 39: //'Right'
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
                    case 87: //'Jump'
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
    }

    /**
     * removes all tutorial elements.
     */
    disposeObjects() {
        for (var i: number = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
        }
    }
}

enum tutorialState {
    None,
    Move,
    WaitForJump,
    Jump
}