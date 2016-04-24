/// <reference path="engine/ecs.engine.ts" />
/// <reference path="engine/ecs.entity.ts" />
/// <reference path="engine/systems/ecs.system.ts" />
/// <reference path="engine/components/ecs.component.ts" />
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var ECSengine;
var scene;
var player;
var playerTranslateComponent;
var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    // set background color
    scene.clearColor = BABYLON.Color3.Black();
    // set ambiant color
    scene.ambientColor = new BABYLON.Color3(0.9, 0.72, 0.75);
    //Adding a light
    var light = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(20, -100, -100), scene);
    //Adding an Arc Rotate Camera
    var camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 20, -50), scene);
    camera.attachControl(canvas, false);
    //camera.target = BABYLON.Vector3.Zero();
    // Move the light with the camera
    scene.registerBeforeRender(function () {
        light.position = camera.position;
    });
    ECSengine = new ECS.Engine();
    var ECSrenderSystem = new ECS.SystemMeshRender();
    ECSrenderSystem.initRendering(scene);
    ECSengine.addSystem(ECSrenderSystem);
    //console.log("typeof:"+ ECSengine.getSystem<ECS.SystemMeshRender>(new ECS.SystemMeshRender()).returnTypeOfSystem() );
    player = ECSengine.createEntity();
    playerTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.01, 0.01, 0.01));
    player.addComponent(playerTranslateComponent);
    player.addComponent(new ECS.ComponentAbstractMesh(playerTranslateComponent, "assets/models/", "Matthew_Full.babylon"));
    
    for (var i = 0; i < 5; i++) {
        var road = ECSengine.createEntity();
        var roadPositionComponent = new ECS.ComponentTransform(new BABYLON.Vector3(0, 0, 14 * i), new BABYLON.Vector3(1, 1, 1));
        road.addComponent(roadPositionComponent);
        road.addComponent(new ECS.ComponentAbstractMesh(roadPositionComponent, "assets/models/", "Road_02.babylon"));
    }
    
    playerTranslateComponent.setPosition = playerTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 5));
    //playerTranslateComponent.setScale = new BABYLON.Vector3(0.1, 0.1, 0.1);
    console.log(playerTranslateComponent.getPosition);
    console.log("componentPosition instance type:" + playerTranslateComponent.componentType());
    return scene;
};
scene = createScene();
engine.runRenderLoop(function () {
    ECSengine.updateSystems();
    scene.render();
});
function onKeyDown(evt) {
    switch (evt.keyCode) {
        case 68:
            //house.translate(new BABYLON.Vector3(0, 0, 1), 3.5);
            playerTranslateComponent.setPosition = playerTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 5));
            break;
        case 82:
            //house.rotate(BABYLON.Vector3.Up(), Math.PI / 4);
            playerTranslateComponent.setPosition = playerTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 5));
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
//# sourceMappingURL=game.js.map