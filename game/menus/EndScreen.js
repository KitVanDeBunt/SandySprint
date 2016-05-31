/**
 * endScreen
 */
var endScreen = (function () {
    function endScreen(gameUI) {
        this._gameUI = gameUI;
        this.StartScreen();
    }
    /**
     * start EndScreen
     */
    endScreen.prototype.StartScreen = function () {
        this._gameUI.menuState = menuState.End;
    };
    endScreen.prototype.onInput = function (inputPos) {
        switch (this._gameUI.menuState) {
            case menuState.End:
                this.Dispose();
                break;
            default:
                break;
        }
    };
    endScreen.prototype.update = function () {
    };
    /**
     * remove all UI objects
     */
    endScreen.prototype.Dispose = function () {
        for (var i = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
            this._objects.splice(i, 1);
        }
    };
    return endScreen;
}());
//# sourceMappingURL=EndScreen.js.map