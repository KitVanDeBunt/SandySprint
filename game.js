/// <reference path="engine/ecs.engine.ts" />
/// <reference path="engine/ecs.entity.ts" />
/// <reference path="engine/systems/ecs.system.ts" />
/// <reference path="engine/components/ecs.component.ts" />
var game = function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var ECSengine;
    var scene;
    var cameraECS;
    var cameraTranslateComponent;
    var cameraComponent;
    var roadManager;
    var playerManager;
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
        roadManager = new RoadManager(ECSengine, scene, cameraComponent);
        // create player manager
        playerManager = new PlayerManager(scene, ECSengine, roadManager);
        // create camera entity
        var cameraECS = ECSengine.createEntity();
        cameraTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.005, 0.005, 0.005));
        cameraTranslateComponent.setPosition = cameraTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 5));
        cameraECS.addComponent(cameraTranslateComponent);
        cameraECS.addComponent(new ComponentCamera(cameraTranslateComponent, scene));
        return scene;
    };
    scene = createScene();
    engine.runRenderLoop(function () {
        var deltaTime = engine.getDeltaTime();
        // update game
        roadManager.update(playerManager.getplayerT());
        // update game
        playerManager.update(deltaTime);
        // update entity component system
        ECSengine.updateSystems();
        // update babylon
        scene.render();
    });
    function onKeyDown(keyEvt) {
        playerManager.onKeyDown(keyEvt);
        console.log("key down: " + keyEvt.keyCode);
    }
    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });
    // Input
    window.addEventListener("keydown", onKeyDown);
};
game();
//# sourceMappingURL=game.js.map