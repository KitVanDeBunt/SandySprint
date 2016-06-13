/**
 * Class LoadingScreen
 * */
var loadingScreen = (function () {
    function loadingScreen(gameui, scene, systemMeshRender) {
        this._gameUI = gameui;
        this._scene = scene;
        this._meshRender = systemMeshRender;
        this._gameUI.menuState = menuState.Loading;
        this._objects = [];
        this._paths = [
            "assets/models/",
            "assets/models/buildings/"
        ];
        this._modelNames = [
            "Explorer_Rig_AllAnimations.babylon",
            "building_building_001_001_tex01.babylon"
        ];
        this.showLoadingScreen();
    }
    loadingScreen.prototype.showLoadingScreen = function () {
        var loadingImage = new BABYLON.Texture("assets/textures/ui_textures/LoadingScreen.png", this._scene, true);
        var loading = this._gameUI.createImage(new BABYLON.Vector2(0, 0), new BABYLON.Vector2(1920 * 0.5, 1080 * 0.5), loadingImage);
        this._objects.push(loading);
        this._meshRender.StartLoading(this._paths, this._modelNames);
    };
    loadingScreen.prototype.update = function () {
        if (this._meshRender.LoadingProgress() >= 1) {
            this._meshRender.RemoveLoadingObjects();
            this.dispose();
            this._gameUI.openMainMenu();
            this._gameUI.restartCamera();
        }
    };
    loadingScreen.prototype.dispose = function () {
        for (var i = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
        }
    };
    return loadingScreen;
}());
//# sourceMappingURL=loadingScreen.js.map