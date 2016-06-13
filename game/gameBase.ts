/**
 * This class runs the game
 */
class GameBase {

    /**
     * the babylon scene of the game.
     */
    private _scene: BABYLON.Scene;

    /**
     * the Entity Component System of the game.
     * info: http://www.gamedev.net/page/resources/_/technical/game-programming/understanding-component-entity-systems-r3013
     */
    private _ECSengine: ECS.Engine;

    /**
     * the audio Manager of the game.
     * loads, starts, and stops all sounds.
     */
    private _audio: audioManager;

    /**
     * the roadManager of the game.
     * Creates environment objects
     */
    private _roadManager: RoadManager;

    /**
     * The HTML-canvas to render upon.
     */
    private _canvas: HTMLCanvasElement;

    /**
     * the Babylon engine of the game
     */
    private _engine: BABYLON.Engine;

    /**
     * the SkyboxManager of the game
     * creates and updates the skybox
     */
    private _skyboxManager: SkyBoxManager;

    /**
      * the playerManager for the player
      * creates and updates the playermovement, animation, and collision.
      */
    private _playerManager: PlayerManager;

    /**
     * the cameramanager of the player.
     * creates and updates a camera for the player.
     */
    private _playerCameraManager: PlayerCameraManager;

    /**
     * The UI of the game
     * creates UI Camera and UI Elements.
     */
    private _gameUI: GameUI;


    get gameUI(): GameUI {
        return this._gameUI;
    }

    constructor() {
        this._canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._scene = this.createScene();
        this.mainMenu();
    }

    /**
     * creates the scene into a variable.
     */
    private createScene() {

        // prevent manifest file error warning
        this._engine.enableOfflineSupport = false;
            var gamebase:GameBase = this;
        // call resize on babylon engine if the windows resizes
        window.addEventListener("resize", function () {
            gamebase._engine.resize();
        });

        let scene: BABYLON.Scene = new BABYLON.Scene(this._engine);

        //enable collision
        scene.collisionsEnabled = true;

        // set background color
        scene.clearColor = new BABYLON.Color3(56 / 255, 71 / 255, 79 / 255);
        // set ambiant color
        scene.ambientColor = new BABYLON.Color3(0.9, 0.72, 0.75);

        //enable physcis for collision
        scene.enablePhysics();

        //Adding lighting
        let light: BABYLON.DirectionalLight = new BABYLON.DirectionalLight(
            "Omni"
            , new BABYLON.Vector3(20, -100, -100)
            , scene
        );
        var tempLight = new BABYLON.DirectionalLight("UIemit", new BABYLON.Vector3(0, 0, 1), scene);

        // create entity component system
        this._ECSengine = new ECS.Engine();

        // add render system
        let ECSrenderSystem: ECS.SystemMeshRender = new ECS.SystemMeshRender();
        ECSrenderSystem.initRendering(scene);
        this._ECSengine.addSystem(ECSrenderSystem);

        // add camera system
        let cameraSystem: SystemCamera = new SystemCamera(this._canvas);
        this._ECSengine.addSystem(cameraSystem);

        // create managers (scripts that handel game logic) 
        this._audio = new audioManager(scene);
        this._roadManager = new RoadManager(this._ECSengine, scene);
        //starting main menu
        this._gameUI = new GameUI(scene, this._ECSengine, this._canvas, this._engine, this._audio, ECSrenderSystem);
        this._gameUI.openLoadingScreen();

        // create skybox managers
        this._skyboxManager = new SkyBoxManager(scene, this._ECSengine);

        return scene;

    }

    /**
     * creates scene, lighting, ECSengine, and most managers.
     */
    private mainMenu() {
        let ECSengine: ECS.Engine = this._ECSengine;
        let scene: BABYLON.Scene = this._scene;
        let gameUI: GameUI = this._gameUI;

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
        function onKeyDown(keyEvt: KeyboardEvent) {
            gameUI.onKeyDown(keyEvt);
        }

        /**
         * Event when screen gets touched.
         * @param touchEvt data about the touch input
         */
        function onTouchStart(touchEvt: TouchEvent) {
            gameUI.onInputStart(new BABYLON.Vector2(touchEvt.touches[0].pageX, touchEvt.touches[0].pageY));
        }

        /**
         * Event when screen gets swiped.
         * @param touchEvt data about the touch input.
         */
        function onTouchMove(touchEvt: TouchEvent) {
            gameUI.onInputMove(new BABYLON.Vector2(touchEvt.touches[0].pageX, touchEvt.touches[0].pageY));
        }

        /**
         * Event when mousebutton gets clicked.
         * @param mouseEvt data about the mouse input.
         */
        function mouseDown(mouseEvt: MouseEvent): void {
            gameUI.onInputStart(new BABYLON.Vector2(mouseEvt.pageX, mouseEvt.pageY));
        }

        // add input event listener
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("mousedown", mouseDown);
    };

    /**
     * Creates and updates managers for the player, Sets the UI to InGame-mode, and adds events listeners
     */
    game() {

        let thisGame: GameBase = this;
        if (this._playerManager != null) {
            /**
             * get the playerT from where the player died
             */
            let playerT = this._playerManager.getplayerT();

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
            this._gameUI.restartCamera();
            this._gameUI.setPlayerManager(this._playerManager);
            this._gameUI.openInGame(this._gameUI.inGameUI.tutorialEnabled);
        }
        else {
            /**
             * first start
             */
            this._playerManager = new PlayerManager(this._scene, this._ECSengine, this._roadManager, this._audio, this._gameUI);
            this._playerCameraManager = new PlayerCameraManager(this._ECSengine, this._scene, this._playerManager);
            this._gameUI.restartCamera();
            this._gameUI.setPlayerManager(this._playerManager);
            this._gameUI.openInGame(true);

            this._engine.runRenderLoop(function () {
                /**
                 * gets deltatime for the playermanagers
                 */
                let deltaTime: number = thisGame._engine.getDeltaTime();

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
        function onKeyDown(keyEvt: KeyboardEvent) {
            thisGame._playerManager.onKeyDown(keyEvt);
        }

        /**
         * Event when screen gets touched.
         * @param touchEvt data about the touch input
         */
        function onTouchStart(touchEvt: TouchEvent) {
            thisGame._playerManager.onTouchStart(touchEvt);
        }

        /**
         * Event when screen stops getting touched.
         * @param touchEvt data about the touch input
         */
        function onTouchEnd(touchEvt: TouchEvent) {
            thisGame._playerManager.onTouchEnd(touchEvt);
        }

        /**
         * Event when the screen gets swiped.
         * @param touchEvt data about the touch input
         */
        function onTouchMove(touchEvt: TouchEvent) {
            thisGame._playerManager.onTouchMove(touchEvt);
        }




    }
}
