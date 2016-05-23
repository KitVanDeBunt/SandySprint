class MainMenu {
    constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
        let scene;
        let createScene = function () {
            let scene: BABYLON.Scene = new BABYLON.Scene(engine);
            let createCamera = function () {
                let camera = new BABYLON.ArcRotateCamera("MenuCam", 0, 1, 100, BABYLON.Vector3.Zero(), scene);
                camera.attachControl(canvas, false);
                return camera;
            }
            this.camera = createCamera();
            // set background color
            scene.clearColor = new BABYLON.Color3(56 / 255, 71 / 255, 79 / 255);
            // set ambiant color
            scene.ambientColor = new BABYLON.Color3(0.9, 0.72, 0.75);
            //Adding a light
            let light: BABYLON.DirectionalLight = new BABYLON.DirectionalLight(
                "MenuLighting"
                , new BABYLON.Vector3(20, -100, -100)
                , scene
            );
            var box = BABYLON.Mesh.CreateBox("Box Ouwe", 10, scene);
            return scene;
        }
        scene = createScene();
        engine.runRenderLoop(function () {
            scene.render();
        });
    }
}

