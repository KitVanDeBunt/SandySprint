class tutorial {

    private _gameUI: GameUI;
    private _playermanager: PlayerManager;
    private _tutorialState: tutorialState;

    constructor(gameUI: GameUI, playerManager: PlayerManager) {
        this._gameUI = gameUI;
        this._playermanager = playerManager;
    }

    update() {
        switch (this._tutorialState) {
            case tutorialState.Move:

                break;
            case tutorialState.Jump:

                break;
            default:
                break;
        }
    }
}

enum tutorialState {
    Move,
    Jump
}