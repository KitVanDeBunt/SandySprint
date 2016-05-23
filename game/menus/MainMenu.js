var MainMenu = (function () {
    function MainMenu(canvas, engine) {
        var scene;
        var createScene = function () {
            var scene = new BABYLON.Scene(engine);
            var createCamera = function () {
                var camera = new BABYLON.ArcRotateCamera("MenuCam", 0, 1, 100, BABYLON.Vector3.Zero(), scene);
                camera.attachControl(canvas, false);
                return camera;
            };
            this.camera = createCamera();
            // set background color
            scene.clearColor = new BABYLON.Color3(56 / 255, 71 / 255, 79 / 255);
            // set ambiant color
            scene.ambientColor = new BABYLON.Color3(0.9, 0.72, 0.75);
            //Adding a light
            var light = new BABYLON.DirectionalLight("MenuLighting", new BABYLON.Vector3(20, -100, -100), scene);
            var box = BABYLON.Mesh.CreateBox("Box Ouwe", 10, scene);
            return scene;
        };
        scene = createScene();
        engine.runRenderLoop(function () {
            scene.render();
        });
    }
    return MainMenu;
}());
//# sourceMappingURL=MainMenu.js.map