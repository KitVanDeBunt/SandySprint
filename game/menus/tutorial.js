var tutorial = (function () {
    function tutorial(gameUI, playerManager) {
        this._gameUI = gameUI;
        this._playermanager = playerManager;
    }
    tutorial.prototype.update = function () {
        switch (this._tutorialState) {
            case tutorialState.Move:
                break;
            case tutorialState.Jump:
                break;
            default:
                break;
        }
    };
    return tutorial;
}());
var tutorialState;
(function (tutorialState) {
    tutorialState[tutorialState["Move"] = 0] = "Move";
    tutorialState[tutorialState["Jump"] = 1] = "Jump";
})(tutorialState || (tutorialState = {}));
//# sourceMappingURL=tutorial.js.map