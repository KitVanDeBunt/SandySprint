/**
 * GameUI
 */
var GameUI = (function () {
    function GameUI(scene, ecs, canvas, engine, audioManager) {
        this.canvas = canvas;
        this.engine = engine;
        this.scene = scene;
        this.ecsEngine = ecs;
        this.audio = audioManager;
        //Adding light for UI elements
        var UIlight = new BABYLON.DirectionalLight("MainMenuEmit", new BABYLON.Vector3(100, 100, 100), scene);
        UIlight.intensity = 2;
        UIlight.includeOnlyWithLayerMask = 0x20000000;
        var tempLight = new BABYLON.DirectionalLight("UIemit", new BABYLON.Vector3(0, 0, 1), scene);
        // create UIcamera entity
        this.cameraECS = ecs.createEntity();
        var cameraTranslateComponent = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, -10), new BABYLON.Vector3(1, 1, 1), new BABYLON.Quaternion(0, 0, 0, 0));
        this.cameraECS.addComponent(cameraTranslateComponent);
        var UICam = new ComponentCamera(cameraTranslateComponent, scene);
        UICam.setLayermask = 0x20000000;
        this.cameraECS.addComponent(UICam);
    }
    GameUI.prototype.onInputStart = function (inputPos) {
        switch (this.menuState) {
            case menuState.Start:
                this.menu.onInput(new BABYLON.Vector2(inputPos.x, inputPos.y));
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
        //this.closeMainMenu();
        switch (this.menuState) {
            case menuState.Start:
                this.menu.onKeyDown(keyEvt);
                break;
            default:
                break;
        }
    };
    GameUI.prototype.restartCamera = function () {
        this.cameraECS.destroy();
        this.cameraECS = this.ecsEngine.createEntity();
        var cameraTranslateComponent = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, -10), new BABYLON.Vector3(1, 1, 1), new BABYLON.Quaternion(0, 0, 0, 0));
        this.cameraECS.addComponent(cameraTranslateComponent);
        var UICam = new ComponentCamera(cameraTranslateComponent, scene);
        UICam.setLayermask = 0x20000000;
        this.cameraECS.addComponent(UICam);
    };
    GameUI.prototype.update = function () {
        switch (this.menuState) {
            case menuState.Start:
                this.menu.update();
                break;
            case menuState.Game:
                this.inGameUI.update();
                break;
            case menuState.End:
                this.endScreen.update();
                break;
            default:
                break;
        }
    };
    GameUI.prototype.openMainMenu = function () {
        this.menu = new MainMenu(this.canvas, this.ecsEngine, this.engine, this.scene, this, this.audio);
    };
    GameUI.prototype.closeMainMenu = function () {
        this.menu.Move();
    };
    GameUI.prototype.preopenInGame = function () {
        this.menuState = menuState.Game;
        this.audio.stopSound(Sounds.MainMenu);
        this.audio.playSound(Sounds.Game);
        this.menu.Dispose();
        //  this.audio.playSound(Sounds.Game);
        game();
    };
    GameUI.prototype.openInGame = function () {
        this.inGameUI = new InGameUI(this.canvas, this.engine, this.scene, this, this.playerManager);
    };
    GameUI.prototype.closeInGame = function () {
        this.inGameUI.Dispose();
    };
    GameUI.prototype.openEndScreen = function () {
        this.endScreen = new endScreen(this);
    };
    GameUI.prototype.closeEndScreen = function () {
        this.endScreen.Dispose();
    };
    GameUI.prototype.setPlayerManager = function (playerManager) {
        this.playerManager = playerManager;
    };
    GameUI.prototype.createImage = function (position, scale, image) {
        var logobox = BABYLON.Mesh.CreatePlane("UIBox", 1, this.scene);
        logobox.scaling = new BABYLON.Vector3(scale.x * 2, scale.y * 2, 0.001);
        logobox.position = new BABYLON.Vector3(position.x, position.y, 0);
        var logoMaterial = new BABYLON.StandardMaterial("logoMaterial", this.scene);
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