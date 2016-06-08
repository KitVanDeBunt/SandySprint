/**
 * Start of the game.
 */
/**
 * the babylon scene of the game.
 */
var scene;
/**
 * the Entity Component System of the game.
 * info: http://www.gamedev.net/page/resources/_/technical/game-programming/understanding-component-entity-systems-r3013
 */
var ECSengine;
/**
 * the audio Manager of the game.
 * loads, starts, and stops all sounds.
 */
var audio;
/**
 * the roadManager of the game.
 * Creates environment objects
 */
var roadManager;
/**
 * The HTML-canvas to render upon.
 */
var canvas = document.getElementById("renderCanvas");
/**
 * the Babylon engine of the game
 */
var engine = new BABYLON.Engine(canvas, true);
/**
 * the SkyboxManager of the game
 * creates and updates the skybox
 */
var skyboxManager;
/**
  * the playerManager for the player
  * creates and updates the playermovement, animation, and collision.
  */
var playerManager;
/**
 * the cameramanager of the player.
 * creates and updates a camera for the player.
 */
var playerCameraManager;
/**
 * The UI of the game
 * creates UI Camera and UI Elements.
 */
var gameUI;
/**
 * creates scene, lighting, ECSengine, and most managers.
 */
var mainMenu = function () {
    /**
     * creates the scene into a variable.
     */
    var createScene = function () {
        // prevent manifest file error warning
        engine.enableOfflineSupport = false;
        var scene = new BABYLON.Scene(engine);
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
        this.ECSengine = new ECS.Engine();
        // add render system
        var ECSrenderSystem = new ECS.SystemMeshRender();
        ECSrenderSystem.initRendering(scene);
        ECSengine.addSystem(ECSrenderSystem);
        // add camera system
        var cameraSystem = new SystemCamera(canvas);
        ECSengine.addSystem(cameraSystem);
        // create managers (scripts that handel game logic) 
        this.audio = new audioManager(scene);
        this.roadManager = new RoadManager(ECSengine, scene);
        //starting main menu
        this.gameUI = new GameUI(scene, ECSengine, canvas, engine, audio);
        this.gameUI.openMainMenu();
        // create skybox managers
        skyboxManager = new SkyBoxManager(scene, ECSengine);
        return scene;
    };
    this.scene = createScene();
    engine.runRenderLoop(function () {
        // update entity component system
        this.ECSengine.updateSystems();
        // update babylon
        this.scene.render();
        //update Gameui
        this.gameUI.update();
    });
    /**
     * Event when key gets pressed.
     * @param keyEvt data about the pressed key
     */
    function onKeyDown(keyEvt) {
        this.gameUI.onKeyDown(keyEvt);
    }
    /**
     * Event when screen gets touched.
     * @param touchEvt data about the touch input
     */
    function onTouchStart(touchEvt) {
        this.gameUI.onInputStart(new BABYLON.Vector2(touchEvt.touches[0].pageX, touchEvt.touches[0].pageY));
    }
    /**
     * Event when mousebutton gets clicked.
     * @param mouseEvt data about the mouse input.
     */
    function mouseDown(mouseEvt) {
        this.gameUI.onInputStart(new BABYLON.Vector2(mouseEvt.pageX, mouseEvt.pageY));
    }
    // call resize on babylon engine if the windows resizes
    window.addEventListener("resize", function () {
        engine.resize();
    });
    // add input event listener
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("mousedown", mouseDown);
};
/**
 * Creates and updates managers for the player, Sets the UI to InGame-mode, and adds events listeners
 */
var game = function () {
    if (this.playerManager != null) {
        /**
         * get the playerT from where the player died
         */
        var playerT = this.playerManager.getplayerT();
        /**
         * restart game
         */
        playerCameraManager.getCameraComponent().getCamera.dispose();
        playerManager = null;
        playerCameraManager = null;
        playerManager = new PlayerManager(scene, ECSengine, roadManager, audio, gameUI);
        playerCameraManager = new PlayerCameraManager(ECSengine, scene, playerManager);
        playerManager.setplayerT(playerT);
        this.gameUI.setPlayerTOffset(playerT);
    }
    else {
        /**
         * first start
         */
        playerManager = new PlayerManager(scene, ECSengine, roadManager, audio, gameUI);
        playerCameraManager = new PlayerCameraManager(ECSengine, scene, playerManager);
        engine.runRenderLoop(function () {
            /**
             * gets deltatime for the playermanagers
             */
            var deltaTime = engine.getDeltaTime();
            // update managers (scripts that handel game logic)
            roadManager.update(playerManager.getplayerT());
            playerManager.update(deltaTime);
            playerCameraManager.update(deltaTime);
            // update skybox position
            skyboxManager.update(this.playerCameraManager.cameraPosition);
        });
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchend", onTouchEnd);
        window.addEventListener("touchcancel", onTouchEnd);
        window.addEventListener("touchmove", onTouchMove);
    }
    this.gameUI.restartCamera();
    this.gameUI.setPlayerManager(this.playerManager);
    this.gameUI.openInGame();
    /**
     * Event when key gets pressed.
     * @param keyEvt data about the pressed key
     */
    function onKeyDown(keyEvt) {
        playerManager.onKeyDown(keyEvt);
    }
    /**
     * Event when screen gets touched.
     * @param touchEvt data about the touch input
     */
    function onTouchStart(touchEvt) {
        playerManager.onTouchStart(touchEvt);
    }
    /**
     * Event when screen stops getting touched.
     * @param touchEvt data about the touch input
     */
    function onTouchEnd(touchEvt) {
        playerManager.onTouchEnd(touchEvt);
    }
    /**
     * Event when the screen gets swiped.
     * @param touchEvt data about the touch input
     */
    function onTouchMove(touchEvt) {
        playerManager.onTouchMove(touchEvt);
    }
};
mainMenu();
//# sourceMappingURL=game.js.map