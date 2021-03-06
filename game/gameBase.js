/**
 * This class runs the game
 */
var GameBase = (function () {
    function GameBase() {
        this._canvas = document.getElementById("renderCanvas");
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._scene = this.createScene();
        this.mainMenu();
    }
    Object.defineProperty(GameBase.prototype, "gameUI", {
        get: function () {
            return this._gameUI;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameBase.prototype, "PlayerCameraManager", {
        get: function () {
            return this._playerCameraManager;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * creates the scene into a variable.
     */
    GameBase.prototype.createScene = function () {
        // prevent manifest file error warning
        this._engine.enableOfflineSupport = false;
        var gamebase = this;
        // call resize on babylon engine if the windows resizes
        window.addEventListener("resize", function () {
            gamebase._engine.resize();
        });
        var scene = new BABYLON.Scene(this._engine);
        //enable collision
        scene.collisionsEnabled = true;
        // set background color
        scene.clearColor = new BABYLON.Color3(56 / 255, 71 / 255, 79 / 255);
        // set ambiant color
        scene.ambientColor = new BABYLON.Color3(0.9, 0.72, 0.75);
        //enable physcis for collision
        scene.enablePhysics();
        //Adding lighting
        var light = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(20, -100, -100), scene);
        var tempLight = new BABYLON.DirectionalLight("UIemit", new BABYLON.Vector3(0, 0, 1), scene);
        // create entity component system
        this._ECSengine = new ECS.Engine();
        // add render system
        var ECSrenderSystem = new ECS.SystemMeshRender();
        ECSrenderSystem.initRendering(scene);
        this._ECSengine.addSystem(ECSrenderSystem);
        // add camera system
        var cameraSystem = new SystemCamera(this._canvas);
        this._ECSengine.addSystem(cameraSystem);
        // create managers (scripts that handel game logic) 
        this._audio = new audioManager(scene);
        this._roadManager = new RoadManager(this._ECSengine, scene, true);
        //starting main menu
        this._gameUI = new GameUI(scene, this._ECSengine, this._canvas, this._engine, this._audio, ECSrenderSystem);
        this._gameUI.openLoadingScreen();
        // create skybox managers
        this._skyboxManager = new SkyBoxManager(scene, this._ECSengine);
        return scene;
    };
    /**
     * creates scene, lighting, ECSengine, and most managers.
     */
    GameBase.prototype.mainMenu = function () {
        var ECSengine = this._ECSengine;
        var scene = this._scene;
        var gameUI = this._gameUI;
        this._engine.runRenderLoop(function () {
            // update entity component system
            ECSengine.updateSystems();
            // update babylon
            scene.render();
            //update Gameui
            gameUI.update();
        });
        /**
         * Event when key gets pressed.
         * @param keyEvt data about the pressed key
         */
        function onKeyDown(keyEvt) {
            gameUI.onKeyDown(keyEvt);
        }
        /**
         * Event when screen gets touched.
         * @param touchEvt data about the touch input
         */
        function onTouchStart(touchEvt) {
            gameUI.onInputStart(new BABYLON.Vector2(touchEvt.touches[0].pageX, touchEvt.touches[0].pageY));
        }
        /**
         * Event when screen gets swiped.
         * @param touchEvt data about the touch input.
         */
        function onTouchMove(touchEvt) {
            gameUI.onInputMove(new BABYLON.Vector2(touchEvt.touches[0].pageX, touchEvt.touches[0].pageY));
        }
        /**
         * Event when mousebutton gets clicked.
         * @param mouseEvt data about the mouse input.
         */
        function mouseDown(mouseEvt) {
            gameUI.onInputStart(new BABYLON.Vector2(mouseEvt.pageX, mouseEvt.pageY));
        }
        // add input event listener
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("mousedown", mouseDown);
    };
    ;
    /**
     * Creates and updates managers for the player, Sets the UI to InGame-mode, and adds events listeners
     */
    GameBase.prototype.game = function () {
        var thisGame = this;
        if (this._playerManager != null) {
            // restart game
            // restart road
            this._roadManager.destroy();
            this._roadManager = new RoadManager(this._ECSengine, this._scene, this._gameUI.inGameUI.GetTutorial);
            // restart player
            this._playerManager.destroy();
            this._playerManager.setplayerT(0);
            this._playerManager = new PlayerManager(this, this._scene, this._ECSengine, this._roadManager, this._audio, this._gameUI);
            // restart camera
            this._playerCameraManager.getCameraComponent().getCamera.dispose();
            this._playerCameraManager = null;
            this._playerCameraManager = new PlayerCameraManager(this._ECSengine, this._scene, this._playerManager);
            // restart ui
            this._gameUI.setPlayerTOffset(0);
            this._gameUI.restartCamera();
            this._gameUI.setPlayerManager(this._playerManager);
            this._gameUI.openInGame(this._gameUI.inGameUI.GetTutorial);
        }
        else {
            // first start game
            this._playerManager = new PlayerManager(this, this._scene, this._ECSengine, this._roadManager, this._audio, this._gameUI);
            this._playerCameraManager = new PlayerCameraManager(this._ECSengine, this._scene, this._playerManager);
            this._gameUI.restartCamera();
            this._gameUI.setPlayerManager(this._playerManager);
            this._gameUI.openInGame(true);
            // game loop
            this._engine.runRenderLoop(function () {
                // gets deltatime for the playermanagers
                var deltaTime = thisGame._engine.getDeltaTime();
                // update managers (scripts that handel game logic)
                thisGame._roadManager.update(thisGame._playerManager.getplayerT());
                thisGame._playerManager.update(deltaTime);
                thisGame._playerCameraManager.update(deltaTime);
                // update skybox position
                thisGame._skyboxManager.update(thisGame._playerCameraManager.cameraPosition);
            });
            window.addEventListener("keydown", onKeyDown);
            window.addEventListener("touchstart", onTouchStart);
            window.addEventListener("touchend", onTouchEnd);
            window.addEventListener("touchcancel", onTouchEnd);
            window.addEventListener("touchmove", onTouchMove);
        }
        /**
         * Event when key gets pressed.
         * @param keyEvt data about the pressed key
         */
        function onKeyDown(keyEvt) {
            thisGame._playerManager.onKeyDown(keyEvt);
        }
        /**
         * Event when screen gets touched.
         * @param touchEvt data about the touch input
         */
        function onTouchStart(touchEvt) {
            thisGame._playerManager.onTouchStart(touchEvt);
        }
        /**
         * Event when screen stops getting touched.
         * @param touchEvt data about the touch input
         */
        function onTouchEnd(touchEvt) {
            thisGame._playerManager.onTouchEnd(touchEvt);
        }
        /**
         * Event when the screen gets swiped.
         * @param touchEvt data about the touch input
         */
        function onTouchMove(touchEvt) {
            thisGame._playerManager.onTouchMove(touchEvt);
        }
    };
    return GameBase;
}());
//# sourceMappingURL=gameBase.js.map