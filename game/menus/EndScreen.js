var endScreen = (function () {
    function endScreen(gameUI) {
        this.gameUI = gameUI;
        this.StartScreen();
    }
    endScreen.prototype.StartScreen = function () {
        this.gameUI.menuState = menuState.End;
    };
    endScreen.prototype.onInput = function (inputPos) {
        switch (this.gameUI.menuState) {
            case menuState.End:
                this.Dispose();
                break;
            default:
                break;
        }
    };
    endScreen.prototype.update = function () {
    };
    endScreen.prototype.Dispose = function () {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].dispose();
            this.objects.splice(i, 1);
        }
    };
    return endScreen;
}());
//# sourceMappingURL=EndScreen.js.map