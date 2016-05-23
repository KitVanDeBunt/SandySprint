class MainMenu {
    constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
        let camera: BABYLON.ArcRotateCamera;
        let createScene = function () {
            let scene: BABYLON.Scene = new BABYLON.Scene(engine);
            let createCamera = function () {
                let camera = new BABYLON.ArcRotateCamera("MenuCam", 0, 1, 100, BABYLON.Vector3.Zero(), scene);
                scene.activeCameras.push(camera);
                return camera;
            }
            camera = createCamera();
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
            var box = BABYLON.Mesh.CreateBox("Background", 10, scene);
            box.position = BABYLON.Vector3.Zero();
            return scene;
        }
        let scene = createScene();

        let createInterface = function () {
            let createCamera = function () {
                let interfaceCamera = new BABYLON.FreeCamera("InterfaceCamera", new BABYLON.Vector3(0, 0, -10), scene);
                interfaceCamera.setTarget(BABYLON.Vector3.Zero());
                scene.activeCameras.push(interfaceCamera);
                interfaceCamera.layerMask = 0x20000000;
            }
            createCamera();
            var interfaceBox = BABYLON.Mesh.CreateBox("InterfaceBox", 2, scene);
            interfaceBox.position = BABYLON.Vector3.Zero();
            interfaceBox.layerMask = 0x20000000;

        }

        //let menuInterface = createInterface();

        engine.runRenderLoop(function () {
            camera.alpha-=0.001;
            scene.render();
        });
    }
}

