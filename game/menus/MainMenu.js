var MainMenu = (function () {
    function MainMenu(canvas, ecs, engine, scene, gameUI, audio) {
        this.movingCam = false;
        this.targetPosition = new BABYLON.Vector3(0, 0.5, -2);
        this.targetRotation = new BABYLON.Vector3(0, 0, 0);
        this.musicPlaying = false;
        this.objects = [];
        this.audio = audio;
        this.gameUI = gameUI;
        this.ECSEngine = ecs;
        this.scene = scene;
        var createCamera = function () {
            this.camera = new BABYLON.ArcRotateCamera("MenuCam", 0, 0.3, 5, new BABYLON.Vector3(0, 0, -8.5), scene);
            scene.activeCameras.push(this.camera);
            return this.camera;
        };
        this.camera = createCamera();
        BABYLON.SceneLoader.ImportMesh("", "assets/models/", "game_intro_temple.babylon", scene, function (newMeshes, newParticlesystems, newSkeletons) {
            newMeshes.forEach(function (element) {
            });
            newMeshes[0].position = new BABYLON.Vector3(0, 0, 1);
        });
        this.StartScreen();
        engine.runRenderLoop(function () {
            this.camera.alpha -= 0.0042;
        });
    }
    MainMenu.prototype.StartScreen = function () {
        this.gameUI.menuState = menuState.Start;
        var startScreenTex = new BABYLON.Texture("/assets/textures/UI textures/logo-final.png", this.scene, true);
        var logo = gameUI.createImage(new BABYLON.Vector2(0, 400), new BABYLON.Vector2(693 * 0.7, 168 * 0.7), startScreenTex);
        this.objects.push(logo);
        startScreenTex = new BABYLON.Texture("/assets/textures/UI textures/play-button.png", this.scene, true);
        var play = gameUI.createImage(new BABYLON.Vector2(0, -200), new BABYLON.Vector2(80, 80), startScreenTex);
        this.objects.push(play);
    };
    MainMenu.prototype.Move = function () {
        this.movesToStart = 0;
        this.flyCam = new BABYLON.FreeCamera("freeCam", this.camera.position, scene);
        this.flyCam.setTarget(new BABYLON.Vector3(0, 0, -8.5));
        this.startPos = this.flyCam.position;
        this.startRot = this.flyCam.rotation;
        console.log(this.flyCam.rotation);
        this.camera.dispose();
        scene.activeCameras.push(this.flyCam);
        this.movingCam = true;
    };
    MainMenu.prototype.onInput = function (inputPos) {
        switch (this.gameUI.menuState) {
            case menuState.Start:
                this.DisposeObjects();
                this.Move();
                break;
            default:
                break;
        }
    };
    MainMenu.prototype.onKeyDown = function (keyEvt) {
        switch (this.gameUI.menuState) {
            case menuState.Start:
                this.DisposeObjects();
                this.Move();
                break;
            default:
                break;
        }
    };
    MainMenu.prototype.update = function () {
        if (this.movingCam) {
            this.movesToStart += 0.01;
            this.flyCam.position = BABYLON.Vector3.Lerp(this.startPos, this.targetPosition, this.movesToStart);
            this.flyCam.rotation = BABYLON.Vector3.Lerp(this.startRot, this.targetRotation, this.movesToStart);
            if (this.movesToStart > 1) {
                this.flyCam.position = this.targetPosition;
                this.flyCam.rotation = this.targetRotation;
                this.movingCam = false;
                this.gameUI.preopenInGame();
            }
        }
        if (!this.audio.menuBackgroundSound.isPlaying) {
            this.audio.playSound(Sounds.MainMenu);
        }
    };
    /*  rescale(): void {
          if (this.canvas.width > this.canvas.height) {
              this.box.scaling = new BABYLON.Vector3(350, 350, 1);
          }
          else {
              this.box.scaling = new BABYLON.Vector3(500, 500, 1);
          }
      }*/
    MainMenu.prototype.Dispose = function () {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].dispose();
            this.objects.splice(i, 1);
        }
        this.flyCam.dispose();
    };
    MainMenu.prototype.DisposeObjects = function () {
        for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].dispose();
            this.objects.splice(i, 1);
        }
    };
    return MainMenu;
}());
//# sourceMappingURL=MainMenu.js.map