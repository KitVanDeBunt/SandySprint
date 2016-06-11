/**
 * GameUI
 * Creates a camera for UI elements, and opens/closes the menus.
 */
var GameUI = (function () {
    /**
     * @param scene the scene of the game.
     * @param ecs the Entity Component System Engine.
     * @param canvas the canvas of the game.
     * @param engine the Babylon Engine of the game.
     * @param audioManager the audioManager to play/stop sounds.
     */
    function GameUI(scene, ecs, canvas, engine, audioManager) {
        this._playerToffset = 0;
        this._canvas = canvas;
        this._engine = engine;
        this._scene = scene;
        this._ecsEngine = ecs;
        this._audio = audioManager;
        var UIlight = new BABYLON.DirectionalLight("MainMenuEmit", new BABYLON.Vector3(0, 0, 0), scene);
        UIlight.intensity = 1;
        UIlight.includeOnlyWithLayerMask = 0x20000000;
        this._cameraECS = ecs.createEntity();
        var cameraTranslateComponent = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, -10), new BABYLON.Vector3(1, 1, 1), new BABYLON.Quaternion(0, 0, 0, 0));
        this._cameraECS.addComponent(cameraTranslateComponent);
        var UICam = new ComponentCamera(cameraTranslateComponent, scene);
        UICam.setLayermask = 0x20000000;
        this._cameraECS.addComponent(UICam);
    }
    /**
     * on Touch or click
     * @param inputPos (x,y) position of the touch/click.
     */
    GameUI.prototype.onInputStart = function (inputPos) {
        switch (this.menuState) {
            case menuState.Start:
                this._menu.onInput(new BABYLON.Vector2(inputPos.x, inputPos.y));
                break;
            case menuState.Game:
                this.inGameUI.onInputStart(inputPos);
                break;
            case menuState.End:
                this._endScreen.onInput(new BABYLON.Vector2(inputPos.x, inputPos.y));
                break;
            default:
                break;
        }
    };
    /**
     * on Swipe
     * @param inputPos (x,y) position when there touch moved.
     */
    GameUI.prototype.onInputMove = function (inputPos) {
        switch (this.menuState) {
            case menuState.Game:
                this.inGameUI.onInputMove(inputPos);
                break;
            default:
                break;
        }
    };
    /**
     * on Key pressed
     * @param keyEvt the keyboardevent of the pressed key.
     */
    GameUI.prototype.onKeyDown = function (keyEvt) {
        switch (this.menuState) {
            case menuState.Start:
                this._menu.onKeyDown(keyEvt);
                break;
            case menuState.Game:
                this.inGameUI.onKeyDown(keyEvt);
                break;
            default:
                break;
        }
    };
    /**
     * destroys camera and creates a new one.
     */
    GameUI.prototype.restartCamera = function () {
        this._cameraECS.destroy();
        this._cameraECS = this._ecsEngine.createEntity();
        var cameraTranslateComponent = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, -10), new BABYLON.Vector3(1, 1, 1), new BABYLON.Quaternion(0, 0, 0, 0));
        this._cameraECS.addComponent(cameraTranslateComponent);
        var UICam = new ComponentCamera(cameraTranslateComponent, this._scene);
        UICam.setLayermask = 0x20000000;
        this._cameraECS.addComponent(UICam);
    };
    /**
     * updates menu scripts.
     */
    GameUI.prototype.update = function () {
        switch (this.menuState) {
            case menuState.Start:
                this._menu.update();
                break;
            case menuState.Game:
                this.inGameUI.update();
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
     * opens the game before the game UI starts
     */
    GameUI.prototype.preopenInGame = function () {
        this.menuState = menuState.Game;
        this._menu.Dispose();
        main.game();
    };
    GameUI.prototype.openInGame = function (tutorialEnabled) {
        this.inGameUI = new InGameUI(this._canvas, this._engine, this._scene, this, this._playerManager, tutorialEnabled);
        this.inGameUI.tutorialEnabled = tutorialEnabled;
    };
    GameUI.prototype.closeInGame = function () {
        this.inGameUI.Dispose();
    };
    GameUI.prototype.openEndScreen = function () {
        this._endScreen = new endScreen(this, this._scene);
        this._endScreen.setScore(this._playerManager.getplayerT() - this.getPlayerTOffset());
        this._endScreen.setScarabs(this._playerManager.getPickupsCollected());
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
        logobox.position = new BABYLON.Vector3(position.x, position.y, 1);
        var logoMaterial = new BABYLON.StandardMaterial("logoMaterial", this._scene);
        logoMaterial.diffuseTexture = image;
        logoMaterial.diffuseTexture.hasAlpha = true;
        logobox.material = logoMaterial;
        logobox.layerMask = 0x20000000;
        return logobox;
    };
    /**
     * sets playerTOffset for restarting
     * @param PlayerT the playerT where there player died previous round.
     */
    GameUI.prototype.setPlayerTOffset = function (PlayerT) {
        this._playerToffset = PlayerT;
    };
    /**
     * get playerTOffset
     */
    GameUI.prototype.getPlayerTOffset = function () {
        return this._playerToffset;
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