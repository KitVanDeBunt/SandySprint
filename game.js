/**
 * This class runs the game
 */
var Game = (function () {
    function Game() {
        this._canvas = document.getElementById("renderCanvas");
        this._engine = new BABYLON.Engine(this._canvas, true);
        this.mainMenu();
    }
    Object.defineProperty(Game.prototype, "gameUI", {
        get: function () {
            return this._gameUI;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * creates the scene into a variable.
     */
    Game.prototype.createScene = function () {
        // prevent manifest file error warning
        this._engine.enableOfflineSupport = false;
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
        this._roadManager = new RoadManager(this._ECSengine, scene);
        //starting main menu
        this._gameUI = new GameUI(scene, this._ECSengine, this._canvas, this._engine, this._audio);
        this._gameUI.openMainMenu();
        // create skybox managers
        this._skyboxManager = new SkyBoxManager(scene, this._ECSengine);
        return scene;
    };
    /**
     * creates scene, lighting, ECSengine, and most managers.
     */
    Game.prototype.mainMenu = function () {
        console.log("mainMenu 1");
        this._scene = this.createScene();
        this._engine.runRenderLoop(function () {
            // update entity component system
            this.ECSengine.updateSystems();
            // update babylon
            this.scene.render();
            //update Gameui
            this._gameUI.update();
        });
        /**
         * Event when key gets pressed.
         * @param keyEvt data about the pressed key
         */
        function onKeyDown(keyEvt) {
            this._gameUI.onKeyDown(keyEvt);
        }
        /**
         * Event when screen gets touched.
         * @param touchEvt data about the touch input
         */
        function onTouchStart(touchEvt) {
            this._gameUI.onInputStart(new BABYLON.Vector2(touchEvt.touches[0].pageX, touchEvt.touches[0].pageY));
        }
        /**
         * Event when mousebutton gets clicked.
         * @param mouseEvt data about the mouse input.
         */
        function mouseDown(mouseEvt) {
            this._gameUI.onInputStart(new BABYLON.Vector2(mouseEvt.pageX, mouseEvt.pageY));
        }
        // call resize on babylon engine if the windows resizes
        window.addEventListener("resize", function () {
            this._engine.resize();
        });
        // add input event listener
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("mousedown", mouseDown);
    };
    ;
    /**
     * Creates and updates managers for the player, Sets the UI to InGame-mode, and adds events listeners
     */
    Game.prototype.game = function () {
        if (this._playerManager != null) {
            /**
             * get the playerT from where the player died
             */
            var playerT = this._playerManager.getplayerT();
            /**
             * restart game
             */
            this._playerCameraManager.getCameraComponent().getCamera.dispose();
            this._playerManager = null;
            this._playerCameraManager = null;
            this._playerManager = new PlayerManager(this._scene, this._ECSengine, this._roadManager, this._audio, this._gameUI);
            this._playerCameraManager = new PlayerCameraManager(this._ECSengine, this._scene, this._playerManager);
            this._playerManager.setplayerT(playerT);
            this._gameUI.setPlayerTOffset(playerT);
        }
        else {
            /**
             * first start
             */
            this._playerManager = new PlayerManager(this._scene, this._ECSengine, this._roadManager, this._audio, this._gameUI);
            this._playerCameraManager = new PlayerCameraManager(this._ECSengine, this._scene, this._playerManager);
            this._engine.runRenderLoop(function () {
                /**
                 * gets deltatime for the playermanagers
                 */
                var deltaTime = this._engine.getDeltaTime();
                // update managers (scripts that handel game logic)
                this._roadManager.update(this._playerManager.getplayerT());
                this._playerManager.update(deltaTime);
                this._playerCameraManager.update(deltaTime);
                // update skybox position
                this._skyboxManager.update(this.playerCameraManager.cameraPosition);
            });
            window.addEventListener("keydown", onKeyDown);
            window.addEventListener("touchstart", onTouchStart);
            window.addEventListener("touchend", onTouchEnd);
            window.addEventListener("touchcancel", onTouchEnd);
            window.addEventListener("touchmove", onTouchMove);
        }
        this._gameUI.restartCamera();
        this._gameUI.setPlayerManager(this._playerManager);
        this._gameUI.openInGame();
        /**
         * Event when key gets pressed.
         * @param keyEvt data about the pressed key
         */
        function onKeyDown(keyEvt) {
            this._playerManager.onKeyDown(keyEvt);
        }
        /**
         * Event when screen gets touched.
         * @param touchEvt data about the touch input
         */
        function onTouchStart(touchEvt) {
            this._playerManager.onTouchStart(touchEvt);
        }
        /**
         * Event when screen stops getting touched.
         * @param touchEvt data about the touch input
         */
        function onTouchEnd(touchEvt) {
            this._playerManager.onTouchEnd(touchEvt);
        }
        /**
         * Event when the screen gets swiped.
         * @param touchEvt data about the touch input
         */
        function onTouchMove(touchEvt) {
            this._playerManager.onTouchMove(touchEvt);
        }
    };
    return Game;
}());
//# sourceMappingURL=game.js.map