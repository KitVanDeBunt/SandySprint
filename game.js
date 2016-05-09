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
    var createScene = function () {
        // prevent manifest file error warning
        engine.enableOfflineSupport = false;
        var scene = new BABYLON.Scene(engine);
        // set background color
        scene.clearColor = BABYLON.Color3.Black();
        // set ambiant color
        scene.ambientColor = new BABYLON.Color3(0.9, 0.72, 0.75);
        //Adding a light
        var light = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(20, -100, -100), scene);
        // Move the light with the camera
        /*scene.registerBeforeRender(function () {
            light.position = camera.position;
        });*/
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
        this.gameUI = new GameUI(scene, playerManager);
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
    // call resize on babylon engine if the windows resizes
    window.addEventListener("resize", function () {
        engine.resize();
    });
    // add input event listener
    window.addEventListener("keydown", onKeyDown);
};
game();
//# sourceMappingURL=game.js.map