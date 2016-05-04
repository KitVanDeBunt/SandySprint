/// <reference path="engine/ecs.engine.ts" />
/// <reference path="engine/ecs.entity.ts" />
/// <reference path="engine/systems/ecs.system.ts" />
/// <reference path="engine/components/ecs.component.ts" />

var game = function () {
    
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("renderCanvas");
    let engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);
    let ECSengine: ECS.Engine;
    let scene: BABYLON.Scene;
    let player: ECS.Entity;
    let cameraECS: ECS.Entity;
    let playerTranslateComponent: ECS.ComponentTransform;
    let cameraTranslateComponent: ECS.ComponentTransform;
    let cameraComponent: ComponentCamera;
    let roadManager:RoadManager;

    let createScene = function () {
        
        // prevent manifest file error warning
        engine.enableOfflineSupport = false;
        
        let scene: BABYLON.Scene = new BABYLON.Scene(engine);

        // set background color
        scene.clearColor = BABYLON.Color3.Black();
        // set ambiant color
        scene.ambientColor = new BABYLON.Color3(0.9, 0.72, 0.75);

        //Adding a light
        let light: BABYLON.DirectionalLight = new BABYLON.DirectionalLight(
            "Omni"
            , new BABYLON.Vector3(20, -100, -100)
            , scene
        );

        // Move the light with the camera
        /*scene.registerBeforeRender(function () {
            light.position = camera.position;
        });*/

        // create entity component system
        ECSengine = new ECS.Engine();
        
        // add render system
        let ECSrenderSystem: ECS.SystemMeshRender = new ECS.SystemMeshRender();
        ECSrenderSystem.initRendering(scene);
        ECSengine.addSystem(ECSrenderSystem);
        
        // add camera system
        let cameraSystem: SystemCamera = new SystemCamera(canvas);
        ECSengine.addSystem(cameraSystem);
        
        // create player entity
        player = ECSengine.createEntity();
        playerTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.004, 0.004, 0.004));
        player.addComponent(playerTranslateComponent);
        let playerMeshComponent = new ECS.ComponentAbstractMesh(playerTranslateComponent, "assets/models/", "Matthew_Full.babylon");
        player.addComponent(playerMeshComponent);
        playerTranslateComponent.setPosition = playerTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 5));
        playerMeshComponent.meshRotate(new BABYLON.Vector3(1,0,0),Math.PI/2);
        playerMeshComponent.meshRotate(new BABYLON.Vector3(0,0,1),Math.PI);
    
        // create camera entity
        let cameraECS = ECSengine.createEntity();
        cameraTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.005, 0.005, 0.005));
        cameraTranslateComponent.setPosition = cameraTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 5));
        cameraECS.addComponent(cameraTranslateComponent);
        cameraECS.addComponent(new ComponentCamera(cameraTranslateComponent,scene));
    
        
        //playerTranslateComponent.setScale = new BABYLON.Vector3(0.1, 0.1, 0.1);
        console.log(playerTranslateComponent.getPosition);

        console.log("componentPosition instance type:" + playerTranslateComponent.componentType());
        
        roadManager = new RoadManager(ECSengine,scene,cameraComponent);
        
        return scene;
    };
    
    scene = createScene();

    engine.runRenderLoop(function () {
        let deltaTime:number = engine.getDeltaTime();
        
        // update game
        roadManager.update();
        
        // update entity component system
        ECSengine.updateSystems();
        
        // update babylon
        scene.render();
    });

    function onKeyDown(evt) {
        switch (evt.keyCode) {
            case 68: //'D'
                //house.translate(new BABYLON.Vector3(0, 0, 1), 3.5);
                playerTranslateComponent.setPosition = playerTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 10));
                break;
            case 82: //'R'
                //house.rotate(BABYLON.Vector3.Up(), Math.PI / 4);
                playerTranslateComponent.setPosition = playerTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 10));
                break;
        }
        console.log("key down: " + evt.keyCode);
    }

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });
    // Input
    window.addEventListener("keydown", onKeyDown);
}

game();