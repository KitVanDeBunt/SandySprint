/**
 * MainMenu
 * Creates
 */
var MainMenu = (function () {
    function MainMenu(canvas, ecs, engine, scene, gameUI, audio) {
        this._movingCam = false;
        this._targetPosition = new BABYLON.Vector3(0, 0.5, -2);
        this._targetRotation = new BABYLON.Vector3(0, 0, 0);
        this._musicPlaying = false;
        this._objects = [];
        this._audio = audio;
        this._gameUI = gameUI;
        this._ECSEngine = ecs;
        this._scene = scene;
        var createCamera = function () {
            this._camera = new BABYLON.ArcRotateCamera("MenuCam", 0, 0.3, 5, new BABYLON.Vector3(0, 0, -8.5), scene);
            scene.activeCameras.push(this._camera);
            return this._camera;
        };
        this._camera = createCamera();
        BABYLON.SceneLoader.ImportMesh("", "assets/models/", "game_intro_temple.babylon", this._scene, function (newMeshes, newParticlesystems, newSkeletons) {
            newMeshes.forEach(function (element) {
            });
            newMeshes[0].position = new BABYLON.Vector3(0, 0, 1);
        });
        this.StartScreen();
        engine.runRenderLoop(function () {
            this._camera.alpha -= 0.0042;
        });
    }
    MainMenu.prototype.StartScreen = function () {
        this._gameUI.menuState = menuState.Start;
        var startScreenTex = new BABYLON.Texture("assets/textures/ui_textures/logo-final.png", this._scene, true);
        var logo = this._gameUI.createImage(new BABYLON.Vector2(0, 380), new BABYLON.Vector2(693 * 0.7, 168 * 0.7), startScreenTex);
        this._objects.push(logo);
        startScreenTex = new BABYLON.Texture("assets/textures/ui_textures/play-button.png", this._scene, true);
        var play = this._gameUI.createImage(new BABYLON.Vector2(0, -200), new BABYLON.Vector2(80, 80), startScreenTex);
        this._objects.push(play);
    };
    /**
     * move camera to start when start is clicked
     */
    MainMenu.prototype.Move = function () {
        this._movesToStart = 0;
        this._flyCam = new BABYLON.FreeCamera("freeCam", this._camera.position, this._scene);
        this._flyCam.setTarget(new BABYLON.Vector3(0, 0, -8.5));
        this._startPos = this._flyCam.position;
        this._startRot = this._flyCam.rotation;
        this._camera.dispose();
        this._audio.playSound(Sounds.Start);
        this._audio.stopSound(Sounds.MainMenu);
        this._audio.playSound(Sounds.Game);
        this._scene.activeCameras.push(this._flyCam);
        this._movingCam = true;
    };
    MainMenu.prototype.onInput = function (inputPos) {
        switch (this._gameUI.menuState) {
            case menuState.Start:
                if (this._movingCam == false) {
                    this.Move();
                }
                this.DisposeObjects();
                break;
            default:
                break;
        }
    };
    MainMenu.prototype.onKeyDown = function (keyEvt) {
        switch (this._gameUI.menuState) {
            case menuState.Start:
                if (this._movingCam == false) {
                    this.Move();
                }
                this.DisposeObjects();
                break;
            default:
                break;
        }
    };
    /**
     * Checks if the camera needs to move, and how
     * Checks if mainMenu sound is playing
     */
    MainMenu.prototype.update = function () {
        if (this._movingCam) {
            this._movesToStart += 0.01;
            this._flyCam.position = BABYLON.Vector3.Lerp(this._startPos, this._targetPosition, this._movesToStart);
            this._flyCam.rotation = BABYLON.Vector3.Lerp(this._startRot, this._targetRotation, this._movesToStart);
            if (this._movesToStart > 1) {
                this._flyCam.position = this._targetPosition;
                this._flyCam.rotation = this._targetRotation;
                this._movingCam = false;
                this._gameUI.preopenInGame();
            }
        }
        if (!this._audio.menuBackgroundSound.isPlaying) {
            if (this._musicPlaying == false) {
                this._audio.playSound(Sounds.MainMenu);
            }
        }
        else {
            this._musicPlaying = true;
        }
    };
    /**
     * remove all of mainMenu
     */
    MainMenu.prototype.Dispose = function () {
        for (var i = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
            this._objects.splice(i, 1);
        }
        this._flyCam.dispose();
    };
    /**
     * only removes UI Objects
     */
    MainMenu.prototype.DisposeObjects = function () {
        for (var i = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
        }
    };
    return MainMenu;
}());
//# sourceMappingURL=MainMenu.js.map