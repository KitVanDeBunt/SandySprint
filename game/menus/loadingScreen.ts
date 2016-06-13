/**
 * Class LoadingScreen 
 * */
class loadingScreen {

    private _objects: Array<BABYLON.Mesh>;
    private _scene: BABYLON.Scene;
    private _gameUI: GameUI;
    private _meshRender: ECS.SystemMeshRender;
    private _paths: Array<string>;
    private _modelNames: Array<string>;

    constructor(gameui: GameUI, scene: BABYLON.Scene, systemMeshRender: ECS.SystemMeshRender) {
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

    showLoadingScreen() {
        var loadingImage: BABYLON.Texture = new BABYLON.Texture("assets/textures/ui_textures/LoadingScreen.png", this._scene, true);
        var loading = this._gameUI.createImage(new BABYLON.Vector2(0, 0), new BABYLON.Vector2(1920 * 0.5, 1080 * 0.5), loadingImage);
        this._objects.push(loading);
        this._meshRender.StartLoading(this._paths, this._modelNames);
    }

    update() {
        if (this._meshRender.LoadingProgress() >= 1) {
            this._meshRender.RemoveLoadingObjects();
            this.dispose();
            this._gameUI.openMainMenu();
            this._gameUI.restartCamera();
        }
    }

    dispose() {
        for (var i: number = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
        }
    }
}