/// <reference path="engine/ecs.engine.ts" />
/// <reference path="engine/ecs.entity.ts" />
/// <reference path="engine/systems/ecs.system.ts" />
/// <reference path="engine/components/ecs.component.ts" />

var game = function () {

    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("renderCanvas");
    let engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);
    let ECSengine: ECS.Engine;
    let scene: BABYLON.Scene;

    let playerCameraManager: PlayerCameraManager;
    let roadManager: RoadManager;
    let playerManager: PlayerManager;
    let gameUI: GameUI;
    let skyboxManager: SkyBoxManager;
    

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
        roadManager = new RoadManager(ECSengine, scene);
        playerManager = new PlayerManager(scene, ECSengine, roadManager);
        playerCameraManager = new PlayerCameraManager(ECSengine, scene, playerManager);

        // create ui
        this.gameUI = new GameUI(scene, playerManager, ECSengine, canvas);

        // create skybox managers
        skyboxManager = new SkyBoxManager(scene,ECSengine);

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

    // call resize on babylon engine if the windows resizes
    window.addEventListener("resize", function () {
        engine.resize();
        this.gameUI.rescale();
    });

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    window.addEventListener("touchmove", onTouchMove);

    // add input event listener
    window.addEventListener("keydown", onKeyDown);
}

game();