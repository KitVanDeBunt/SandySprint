class tutorial {

    private _objects: Array<BABYLON.Mesh>;
    private _scene: BABYLON.Scene;
    private _gameUI: GameUI;
    private _playermanager: PlayerManager;
    private _tutorialState: tutorialState;

    constructor(gameUI: GameUI, scene: BABYLON.Scene, playerManager: PlayerManager) {
        this._gameUI = gameUI;
        this._playermanager = playerManager;
        this._scene = scene;
        this._tutorialState = tutorialState.None;
        this._objects = [];
    }

    openImage() {
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

    }

    update() {
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


    }

    onInputStart(inputPos: BABYLON.Vector2) {

    }

    onKeyDown(keyEvt: KeyboardEvent) {

    }

    dispose() {
        for (var i: number = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
        }
    }
}

enum tutorialState {
    None,
    Move,
    Jump
}