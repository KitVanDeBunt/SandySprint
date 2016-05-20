/// <reference path="engine/ecs.engine.ts" />
/// <reference path="engine/ecs.entity.ts" />
/// <reference path="engine/systems/ecs.system.ts" />
/// <reference path="engine/components/ecs.component.ts" />
var game = function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var ECSengine;
    var scene;
    var playerCameraManager;
    var roadManager;
    var playerManager;
    var gameUI;
    var skyboxManager;
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
        roadManager = new RoadManager(ECSengine, scene);
        playerManager = new PlayerManager(scene, ECSengine, roadManager);
        playerCameraManager = new PlayerCameraManager(ECSengine, scene, playerManager);
        // create ui
        this.gameUI = new GameUI(scene, playerManager, ECSengine, canvas);
        // create skybox managers
        skyboxManager = new SkyBoxManager(scene, ECSengine);
        return scene;
    };
    scene = createScene();
    engine.runRenderLoop(function () {
        var deltaTime = engine.getDeltaTime();
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
    function onKeyDown(keyEvt) {
        playerManager.onKeyDown(keyEvt);
        console.log("key down: " + keyEvt.keyCode);
    }
    function onTouchStart(touchEvt) {
        playerManager.onTouchStart(touchEvt);
        gameUI.onTouchStart(touchEvt);
    }
    function onTouchEnd(touchEvt) {
        playerManager.onTouchEnd(touchEvt);
        gameUI.onTouchEnd(touchEvt);
    }
    function onTouchMove(touchEvt) {
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
};
game();
//# sourceMappingURL=game.js.map