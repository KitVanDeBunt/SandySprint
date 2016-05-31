let scene: BABYLON.Scene;
let ECSengine: ECS.Engine;
let audio: audioManager;
let roadManager: RoadManager;
let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("renderCanvas");
let engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);
let skyboxManager: SkyBoxManager;
let menu: MainMenu;
let gameUI: GameUI;


//create scene and main menu
var mainMenu = function () {

    let createScene = function () {

        // prevent manifest file error warning
        engine.enableOfflineSupport = false;

        let scene: BABYLON.Scene = new BABYLON.Scene(engine);

        //enable collision
        scene.collisionsEnabled = true;

        // set background color
        scene.clearColor = new BABYLON.Color3(56 / 255, 71 / 255, 79 / 255);
        // set ambiant color
        scene.ambientColor = new BABYLON.Color3(0.9, 0.72, 0.75);

        //enable physcis for collision
        scene.enablePhysics();

        //Adding a light
        let light: BABYLON.DirectionalLight = new BABYLON.DirectionalLight(
            "Omni"
            , new BABYLON.Vector3(20, -100, -100)
            , scene
        );

        // create entity component system
        ECSengine = new ECS.Engine();

        // add render system
        let ECSrenderSystem: ECS.SystemMeshRender = new ECS.SystemMeshRender();
        ECSrenderSystem.initRendering(scene);
        ECSengine.addSystem(ECSrenderSystem);

        // add camera system
        let cameraSystem: SystemCamera = new SystemCamera(canvas);
        ECSengine.addSystem(cameraSystem);

        // create managers (scripts that handel game logic) 
        this.audio = new audioManager(scene);
        roadManager = new RoadManager(ECSengine, scene);

        //starting main menu
        this.gameUI = new GameUI(scene, ECSengine, canvas, engine,audio);
        this.gameUI.openMainMenu();

        // create skybox managers
        skyboxManager = new SkyBoxManager(scene, ECSengine);

        return scene;
    }

    scene = createScene();

    engine.runRenderLoop(function () {
        // update entity component system
        ECSengine.updateSystems();
        // update babylon
        scene.render();
        //update Gameui
        this.gameUI.update();
    });

    function onKeyDown(keyEvt: KeyboardEvent) {
        this.gameUI.onKeyDown(keyEvt);
    }

    function onTouchStart(touchEvt: TouchEvent) {
        this.gameUI.onInputStart(new BABYLON.Vector2(touchEvt.touches[0].pageX, touchEvt.touches[0].pageY));
    }

    function mouseDown(mouseEvt: MouseEvent): void {
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

//start game
var game = function () {

    let playerManager: PlayerManager;
    let playerCameraManager: PlayerCameraManager;

    scene.activeCameras.slice(0, scene.activeCameras.length);
    playerManager = new PlayerManager(scene, ECSengine, roadManager, audio, gameUI);
    playerCameraManager = new PlayerCameraManager(ECSengine, scene, playerManager);
    
    gameUI.restartCamera();
    gameUI.setPlayerManager(playerManager);
    gameUI.openInGame();

    function onKeyDown(keyEvt: KeyboardEvent) {
        playerManager.onKeyDown(keyEvt);
    }

    function onTouchStart(touchEvt: TouchEvent) {
        playerManager.onTouchStart(touchEvt);
    }

    function onTouchEnd(touchEvt: TouchEvent) {
        playerManager.onTouchEnd(touchEvt);
    }

    function onTouchMove(touchEvt: TouchEvent) {
        playerManager.onTouchMove(touchEvt);
    }

    engine.runRenderLoop(function () {
        let deltaTime: number = engine.getDeltaTime();

        // update managers (scripts that handel game logic)
        roadManager.update(playerManager.getplayerT());
        playerManager.update(deltaTime);
        playerCameraManager.update(deltaTime);

        // update skybox position
        skyboxManager.update(playerCameraManager.cameraPosition);
    });

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    window.addEventListener("touchmove", onTouchMove);
}

mainMenu();