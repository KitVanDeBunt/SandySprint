/**
 * GameUI
 */
var GameUI = (function () {
    function GameUI(scene, ecs, canvas, engine, audioManager) {
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
        var cameraTranslateComponent = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, -10), new BABYLON.Vector3(1, 1, 1), new BABYLON.Quaternion(0, 0, 0, 0));
        this._cameraECS.addComponent(cameraTranslateComponent);
        var UICam = new ComponentCamera(cameraTranslateComponent, scene);
        UICam.setLayermask = 0x20000000;
        this._cameraECS.addComponent(UICam);
    }
    /**
     * on Touch or click
     * @param inputPos (x,y) pos of the touch/click
     */
    GameUI.prototype.onInputStart = function (inputPos) {
        switch (this.menuState) {
            case menuState.Start:
                this._menu.onInput(new BABYLON.Vector2(inputPos.x, inputPos.y));
                break;
            default:
                break;
        }
    };
    GameUI.prototype.onInputEnd = function (touchEvt) {
    };
    GameUI.prototype.OnInputMove = function (touchEvt) {
    };
    GameUI.prototype.onKeyDown = function (keyEvt) {
        switch (this.menuState) {
            case menuState.Start:
                this._menu.onKeyDown(keyEvt);
                break;
            default:
                break;
        }
    };
    /**
     * closes camera and makes a new one
     */
    GameUI.prototype.restartCamera = function () {
        this._cameraECS.destroy();
        this._cameraECS = this._ecsEngine.createEntity();
        var cameraTranslateComponent = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, -10), new BABYLON.Vector3(1, 1, 1), new BABYLON.Quaternion(0, 0, 0, 0));
        this._cameraECS.addComponent(cameraTranslateComponent);
        var UICam = new ComponentCamera(cameraTranslateComponent, scene);
        UICam.setLayermask = 0x20000000;
        this._cameraECS.addComponent(UICam);
    };
    GameUI.prototype.update = function () {
        switch (this.menuState) {
            case menuState.Start:
                this._menu.update();
                break;
            case menuState.Game:
                this._inGameUI.update();
                break;
            case menuState.End:
                this._endScreen.update();
                break;
            default:
                break;
        }
    };
    GameUI.prototype.openMainMenu = function () {
        this._menu = new MainMenu(this._canvas, this._ecsEngine, this._engine, this._scene, this, this._audio);
    };
    GameUI.prototype.closeMainMenu = function () {
        this._menu.Move();
    };
    /**
     * opens the game before the game UI start
     */
    GameUI.prototype.preopenInGame = function () {
        this.menuState = menuState.Game;
        this._audio.stopSound(Sounds.MainMenu);
        this._audio.playSound(Sounds.Game);
        this._menu.Dispose();
        game();
    };
    GameUI.prototype.openInGame = function () {
        this._inGameUI = new InGameUI(this._canvas, this._engine, this._scene, this, this._playerManager);
    };
    GameUI.prototype.closeInGame = function () {
        this._inGameUI.Dispose();
    };
    GameUI.prototype.openEndScreen = function () {
        this._endScreen = new endScreen(this);
    };
    GameUI.prototype.closeEndScreen = function () {
        this._endScreen.Dispose();
    };
    GameUI.prototype.setPlayerManager = function (playerManager) {
        this._playerManager = playerManager;
    };
    /**
     * function for UI classes to easely create an ui image
     * @param position the position of the ui image
     * @param scale the scale of the ui image
     * @param image this texture of the ui image
     */
    GameUI.prototype.createImage = function (position, scale, image) {
        var logobox = BABYLON.Mesh.CreatePlane("UIBox", 1, this._scene);
        logobox.scaling = new BABYLON.Vector3(scale.x * 2, scale.y * 2, 0.001);
        logobox.position = new BABYLON.Vector3(position.x, position.y, 0);
        var logoMaterial = new BABYLON.StandardMaterial("logoMaterial", this._scene);
        logoMaterial.diffuseTexture = image;
        logoMaterial.diffuseTexture.hasAlpha = true;
        logobox.material = logoMaterial;
        logobox.layerMask = 0x20000000;
        return logobox;
    };
    return GameUI;
}());
var menuState;
(function (menuState) {
    menuState[menuState["None"] = 0] = "None";
    menuState[menuState["Start"] = 1] = "Start";
    menuState[menuState["Game"] = 2] = "Game";
    menuState[menuState["Page"] = 3] = "Page";
    menuState[menuState["End"] = 4] = "End";
})(menuState || (menuState = {}));
//# sourceMappingURL=gameUI.js.map