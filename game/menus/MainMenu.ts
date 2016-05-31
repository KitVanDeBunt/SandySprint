/**
 * MainMenu
 */ 
class MainMenu {

    private _objects: Array<BABYLON.Mesh>;
    private _audio: audioManager;
    private _camera: BABYLON.ArcRotateCamera;
    private _flyCam: BABYLON.FreeCamera;
    private _gameUI: GameUI;
    private _ECSEngine: ECS.Engine;
    private _scene: BABYLON.Scene;
    private _movesToStart: number;
    private _startPos: BABYLON.Vector3;
    private _startRot: BABYLON.Vector3;
    private _movingCam: boolean = false;
    private _targetPosition: BABYLON.Vector3 = new BABYLON.Vector3(0, 0.5, -2);
    private _targetRotation: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 0);
    private _musicPlaying: boolean = false;

    constructor(canvas: HTMLCanvasElement, ecs: ECS.Engine, engine: BABYLON.Engine, scene: BABYLON.Scene, gameUI: GameUI, audio: audioManager) {
        this._objects = [];
        this._audio = audio;
        this._gameUI = gameUI;
        this._ECSEngine = ecs;
        this._scene = scene;

        /**
         *  create camera for main menu screne
         */
        let createCamera = function () {
            this.camera = new BABYLON.ArcRotateCamera("MenuCam", 0, 0.3, 5, new BABYLON.Vector3(0, 0, -8.5), scene);
            scene.activeCameras.push(this.camera);
            return this.camera;
        }
        this._camera = createCamera();

        /**
         * create temple for main menu scene
         */
        BABYLON.SceneLoader.ImportMesh("", "assets/models/", "game_intro_temple.babylon", scene
            , function (newMeshes, newParticlesystems, newSkeletons) {
                newMeshes.forEach(element => {
                });
                newMeshes[0].position = new BABYLON.Vector3(0, 0, 1);
            }
        );

        this.StartScreen();

        /**
         * rotate camera slowly
         */
        engine.runRenderLoop(function () {
            this.camera.alpha -= 0.0042;
        });
    }

    /**
     * creates startscreen
     */
    private StartScreen() {
        this._gameUI.menuState = menuState.Start;
        var startScreenTex = new BABYLON.Texture("/assets/textures/UI textures/logo-final.png", this._scene, true);
        var logo = gameUI.createImage(new BABYLON.Vector2(0, 400), new BABYLON.Vector2(693 * 0.7, 168 * 0.7), startScreenTex);
        this._objects.push(logo);

        startScreenTex = new BABYLON.Texture("/assets/textures/UI textures/play-button.png", this._scene, true);
        var play = gameUI.createImage(new BABYLON.Vector2(0, -200), new BABYLON.Vector2(80, 80), startScreenTex);
        this._objects.push(play);
    }


    /**
     * move camera to start when start is clicked
     */
    Move() {
        this._movesToStart = 0;
        this._flyCam = new BABYLON.FreeCamera("freeCam", this._camera.position, scene);
        this._flyCam.setTarget(new BABYLON.Vector3(0, 0, -8.5));
        this._startPos = this._flyCam.position;
        this._startRot = this._flyCam.rotation;
        console.log(this._flyCam.rotation);
        this._camera.dispose();
        scene.activeCameras.push(this._flyCam);
        this._movingCam = true;

    }

    onInput(inputPos: BABYLON.Vector2) {
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
    }

    onKeyDown(keyEvt: KeyboardEvent) {
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
    }

    /**
     * Checks if the camera needs to move, and how
     * Checks if mainMenu sound is playing
     */
    update() {
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

    }

    /**
     * remove all of mainMenu
     */
    Dispose() {
        for (var i: number = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
            this._objects.splice(i, 1);
        }
        this._flyCam.dispose();
    }

    /**
     * only removes UI Objects
     */
    DisposeObjects() {
        for (var i: number = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
            this._objects.splice(i, 1);
        }
    }


}

