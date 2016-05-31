/// <reference path="engine/ecs.engine.ts" />
/// <reference path="engine/ecs.entity.ts" />
/// <reference path="engine/systems/ecs.system.ts" />
/// <reference path="engine/components/ecs.component.ts" />
var scene;
var ECSengine;
var audio;
var roadManager;
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var skyboxManager;
var menu;
var gameUI;
//create scene and main menu
var mainMenu = function () {
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
        //Adding a light
        var light = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(20, -100, -100), scene);
        // create entity component system
        ECSengine = new ECS.Engine();
        // add render system
        var ECSrenderSystem = new ECS.SystemMeshRender();
        ECSrenderSystem.initRendering(scene);
        ECSengine.addSystem(ECSrenderSystem);
        // add camera system
        var cameraSystem = new SystemCamera(canvas);
        ECSengine.addSystem(cameraSystem);
        // create managers (scripts that handel game logic) 
        this.audio = new audioManager(scene);
        roadManager = new RoadManager(ECSengine, scene);
        //starting main menu
        this.gameUI = new GameUI(scene, ECSengine, canvas, engine, audio);
        this.gameUI.openMainMenu();
        // create skybox managers
        skyboxManager = new SkyBoxManager(scene, ECSengine);
        return scene;
    };
    scene = createScene();
    engine.runRenderLoop(function () {
        // update entity component system
        ECSengine.updateSystems();
        // update babylon
        scene.render();
        //update Gameui
        this.gameUI.update();
    });
    function onKeyDown(keyEvt) {
        this.gameUI.onKeyDown(keyEvt);
    }
    function onTouchStart(touchEvt) {
        this.gameUI.onInputStart(new BABYLON.Vector2(touchEvt.touches[0].pageX, touchEvt.touches[0].pageY));
    }
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
//start game
var game = function () {
    var playerManager;
    var playerCameraManager;
    scene.activeCameras.slice(0, scene.activeCameras.length);
    playerManager = new PlayerManager(scene, ECSengine, roadManager, audio, gameUI);
    playerCameraManager = new PlayerCameraManager(ECSengine, scene, playerManager);
    gameUI.restartCamera();
    gameUI.setPlayerManager(playerManager);
    gameUI.openInGame();
    function onKeyDown(keyEvt) {
        playerManager.onKeyDown(keyEvt);
    }
    function onTouchStart(touchEvt) {
        playerManager.onTouchStart(touchEvt);
    }
    function onTouchEnd(touchEvt) {
        playerManager.onTouchEnd(touchEvt);
    }
    function onTouchMove(touchEvt) {
        playerManager.onTouchMove(touchEvt);
    }
    engine.runRenderLoop(function () {
        var deltaTime = engine.getDeltaTime();
        // update managers (scripts that handel game logic)
        roadManager.update(playerManager.getplayerT());
        playerManager.update(deltaTime);
        playerCameraManager.update(deltaTime);
        // update game ui
        // update skybox position
        skyboxManager.update(playerCameraManager.cameraPosition);
    });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    window.addEventListener("touchmove", onTouchMove);
};
mainMenu();
//game();
/*var game = function () {

    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("renderCanvas");
    let engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);
    let ECSengine: ECS.Engine;
    let scene: BABYLON.Scene;

    let playerCameraManager: PlayerCameraManager;
    let roadManager: RoadManager;
    let playerManager: PlayerManager;
    let gameUI: GameUI;
    let skyboxManager: SkyBoxManager;
    let audio:audioManager;


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
        audio = new audioManager(scene);
        roadManager = new RoadManager(ECSengine, scene);
        playerManager = new PlayerManager(scene, ECSengine, roadManager, audio);
        playerCameraManager = new PlayerCameraManager(ECSengine, scene, playerManager);

        // create ui
        this.gameUI = new GameUI(scene, playerManager, ECSengine, canvas);

        // create skybox managers
        skyboxManager = new SkyBoxManager(scene, ECSengine);

        return scene;
    };

    scene = createScene();

    engine.runRenderLoop(function () {
        let deltaTime: number = engine.getDeltaTime();

        // update managers (scripts that handel game logic)
        roadManager.update(playerManager.getplayerT());
        playerManager.update(deltaTime);
        playerCameraManager.update(deltaTime);

        // update entity component system
        ECSengine.updateSystems();

        // update game ui
        this.gameUI.update();

        // update babylon
        scene.render();
        
        // update skybox position
        skyboxManager.update(playerCameraManager.cameraPosition);
    });

    function onKeyDown(keyEvt: KeyboardEvent) {
        playerManager.onKeyDown(keyEvt);
        console.log("key down: " + keyEvt.keyCode);
    }

    function onTouchStart(touchEvt: TouchEvent) {
        playerManager.onTouchStart(touchEvt);
        gameUI.onTouchStart(touchEvt);
    }

    function onTouchEnd(touchEvt: TouchEvent) {
        playerManager.onTouchEnd(touchEvt);
        gameUI.onTouchEnd(touchEvt);
    }

    function onTouchMove(touchEvt: TouchEvent) {
        playerManager.onTouchMove(touchEvt);
        gameUI.onTouchMove(touchEvt);
    }
    
    function mouseDown(mouseEvt:MouseEvent):void{
        console.log("awyis");
        
    }

    // call resize on babylon engine if the windows resizes
    window.addEventListener("resize", function () {
        engine.resize();
    });

    // add input event listener
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("mousedown", mouseDown);
}*/
//# sourceMappingURL=game.js.map