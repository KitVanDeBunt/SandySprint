/**
 * Class LoadingScreen 
 * Shows a loading screen and calls the loader.
 * */
class loadingScreen {

    private _objects: Array<BABYLON.Mesh>;
    private _scene: BABYLON.Scene;
    private _gameUI: GameUI;
    private _meshRender: ECS.SystemMeshRender;
    private _paths: Array<string>;
    private _modelNames: Array<string>;
    private context2D;
    private _myMaterial_diffuseTexture: BABYLON.DynamicTexture;

    /**
     * @param gameui the gameUI that has created the loadingscreen.
     * @param scene the scene that the game is using.
     * @param systemMeshRender the meshRender that loads the objects.
     */
    constructor(gameui: GameUI, scene: BABYLON.Scene, systemMeshRender: ECS.SystemMeshRender) {
        this._gameUI = gameui;
        this._scene = scene;
        this._meshRender = systemMeshRender;
        this._gameUI.menuState = menuState.Loading;
        this._objects = [];
        this._paths = [
            "assets/models/",
            "assets/models/",
            "assets/models/",
            "assets/models/",
            "assets/models/",
            "assets/models/",
            "assets/models/buildings/",
            "assets/models/buildings/",
            "assets/models/",
            "assets/models/",
            "assets/models/buildings/",
            "assets/models/buildings/",
            "assets/models/buildings/",
            "assets/models/buildings/"
        ];
        this._modelNames = [
            "Explorer_Rig_AllAnimations.babylon",
            "road_river.babylon",
            "road_plain.babylon",
            "pillar.babylon",
            "Obstacle_Spikes.babylon",
            "pickup_scarab.babylon",
            "building_building_001_001_tex01.babylon",
            "building_buildingbridge_002_002_tex01.babylon",
            "vegitation_palm_001.babylon",
            "vegitation_plant_001.babylon",
            "building_building_001_001_tex01.babylon",
            "building_building_002_001_tex01.babylon",
            "building_building_003_001_tex01.babylon",
            "building_building_004_001_tex01.babylon"
        ];
        this.showLoadingScreen();
    }

    /**
     * Creates the loadingscreen, loading indicator, and starts the loader.
     */
    showLoadingScreen() {
        var loadingImage: BABYLON.Texture = new BABYLON.Texture("assets/textures/ui_textures/LoadingScreen.png", this._scene, true);
        var loading = this._gameUI.createImage(new BABYLON.Vector2(0, 0), new BABYLON.Vector2(1920 * 0.6, 1080 * 0.6), loadingImage);
        this._objects.push(loading);

        var loadingPerc = this._gameUI.createImage(new BABYLON.Vector2(0, -200), new BABYLON.Vector2(300, 300), null);
        this._objects.push(loadingPerc);

        var material = new BABYLON.StandardMaterial("UITextTexture", this._scene);
        material.alpha = 1;
        material.diffuseColor = new BABYLON.Color3(1.00, 1.00, 1.00);
        this._myMaterial_diffuseTexture = new BABYLON.DynamicTexture('LoadingTex', 512, this._scene, true);
        this._myMaterial_diffuseTexture.hasAlpha = true;
        material.diffuseTexture = this._myMaterial_diffuseTexture;
        loadingPerc.material = material;
        this.context2D = this._myMaterial_diffuseTexture.getContext();

        this._meshRender.StartLoading(this._paths, this._modelNames);
    }

    /**
     * updates the loading indicator.
     */
    update() {

        if (this._meshRender.LoadingProgress() >= 1) {
            this._meshRender.RemoveLoadingObjects();
            this.dispose();
            this._gameUI.openMainMenu();
            this._gameUI.restartCamera();
        }
        else {
            this.context2D.clearRect(0, 0, 512, 512);
            this._myMaterial_diffuseTexture.drawText(Math.round(this._meshRender.LoadingProgress() * 100) + "%", 200, 200, "50px Cooper Std Black", "black", "transparent");
        }
    }

    /**
     * Deletes all objects.
     */
    dispose() {
        for (var i: number = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
        }
    }
}