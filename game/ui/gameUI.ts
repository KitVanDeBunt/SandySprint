/**
 * GameUI
 */
class GameUI {

    public menuState: menuState;

    private context2D;
    private _myMaterial_diffuseTexture: BABYLON.DynamicTexture;
    private _box: BABYLON.Mesh;
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _ecsEngine: ECS.Engine;
    private _playerManager: PlayerManager;
    private _scene: BABYLON.Scene;
    private _menu: MainMenu;
    private _inGameUI: InGameUI;
    private _endScreen: endScreen;
    private _cameraECS: ECS.Entity;
    private _audio: audioManager;

    constructor(scene: BABYLON.Scene, ecs: ECS.Engine, canvas: HTMLCanvasElement, engine: BABYLON.Engine, audioManager: audioManager) {
        this._canvas = canvas;
        this._engine = engine;
        this._scene = scene;
        this._ecsEngine = ecs;
        this._audio = audioManager;

        /**
         * Adding light for UI elements
         */
        var UIlight = new BABYLON.DirectionalLight("MainMenuEmit", new BABYLON.Vector3(100, 100, 100), scene);
        UIlight.intensity = 2;
        UIlight.includeOnlyWithLayerMask = 0x20000000;
        var tempLight = new BABYLON.DirectionalLight("UIemit", new BABYLON.Vector3(0, 0, 1), scene);

        /**
         * create UIcamera entity
         */
        this._cameraECS = ecs.createEntity();
        let cameraTranslateComponent = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, -10), new BABYLON.Vector3(1, 1, 1), new BABYLON.Quaternion(0, 0, 0, 0));
        this._cameraECS.addComponent(cameraTranslateComponent);
        let UICam = new ComponentCamera(cameraTranslateComponent, scene);
        UICam.setLayermask = 0x20000000;
        this._cameraECS.addComponent(UICam);
    }

    /**
     * on Touch or click
     * @param inputPos (x,y) pos of the touch/click
     */
    onInputStart(inputPos: BABYLON.Vector2) {
        switch (this.menuState) {
            case menuState.Start:
                this._menu.onInput(new BABYLON.Vector2(inputPos.x, inputPos.y));
                break;
                case menuState.End:
                this._endScreen.onInput(new BABYLON.Vector2(inputPos.x, inputPos.y));
                break;
            default:
                break;
        }
    }

    onInputEnd(touchEvt: TouchEvent) {

    }

    OnInputMove(touchEvt: TouchEvent) {

    }

    onKeyDown(keyEvt: KeyboardEvent) {
        switch (this.menuState) {
            case menuState.Start:
                this._menu.onKeyDown(keyEvt);
                break;
            default:
                break;
        }
    }

    /**
     * closes camera and makes a new one
     */
    restartCamera() {
        this._cameraECS.destroy();
        this._cameraECS = this._ecsEngine.createEntity();
        let cameraTranslateComponent = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, -10), new BABYLON.Vector3(1, 1, 1), new BABYLON.Quaternion(0, 0, 0, 0));
        this._cameraECS.addComponent(cameraTranslateComponent);
        let UICam = new ComponentCamera(cameraTranslateComponent, scene);
        UICam.setLayermask = 0x20000000;
        this._cameraECS.addComponent(UICam);
    }

    update(): void {
        switch (this.menuState) {
            case menuState.Start:
                this._menu.update();
                break;
            case menuState.Game:
                this._inGameUI.update();
                break;
            default:
                break;
        }


    }

    openMainMenu() {
        this._menu = new MainMenu(this._canvas, this._ecsEngine, this._engine, this._scene, this, this._audio);
    }

    closeMainMenu() {
        this._menu.Move();

    }

    /**
     * opens the game before the game UI start
     */
    preopenInGame() {
        this.menuState = menuState.Game;
        this._audio.stopSound(Sounds.MainMenu);
        this._audio.playSound(Sounds.Game);
        this._menu.Dispose();
        game();
    }

    openInGame() {
        this._inGameUI = new InGameUI(this._canvas, this._engine, this._scene, this, this._playerManager);
    }

    closeInGame() {
        this._inGameUI.Dispose();
    }

    openEndScreen() {
        this._endScreen = new endScreen(this,this._scene);
    }

    closeEndScreen() {
        this._endScreen.Dispose();
    }

    setPlayerManager(playerManager: PlayerManager) {
        this._playerManager = playerManager;
    }

    /**
     * function for UI classes to easely create an ui image
     * @param position the position of the ui image
     * @param scale the scale of the ui image
     * @param image this texture of the ui image
     */
    createImage(position: BABYLON.Vector2, scale: BABYLON.Vector2, image: BABYLON.Texture): BABYLON.Mesh {
        var logobox = BABYLON.Mesh.CreatePlane("UIBox", 1, this._scene);
        logobox.scaling = new BABYLON.Vector3(scale.x * 2, scale.y * 2, 0.001);
        logobox.position = new BABYLON.Vector3(position.x, position.y, 0);
        var logoMaterial = new BABYLON.StandardMaterial("logoMaterial", this._scene);
        logoMaterial.diffuseTexture = image;
        logoMaterial.diffuseTexture.hasAlpha = true;
        logobox.material = logoMaterial;
        logobox.layerMask = 0x20000000;
        return logobox;
    }
}

enum menuState {
    None,
    Start,
    Game,
    Page,
    End
}