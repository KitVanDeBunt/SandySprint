/**
 * PlayerCameraManager
 * managers the camera begind the player.
 */
class PlayerCameraManager {

    private _cameraECS: ECS.Entity;
    private _cameraTranslateComponent: ECS.ComponentTransform;
    private _cameraComponent: ComponentCamera;
    private _playerManager: PlayerManager;

    //camera shake
    private _shakeOffset: BABYLON.Vector3;
    private _shaketime: number = 0;
    private _shaken: boolean = false;

    /**
     * @param ECSengine the Entity Component System of the game.
     * @param scene the scene that the game is using.
     * @playerManager the playerManager of the player that it is following.
     */
    constructor(ECSengine: ECS.Engine, scene: BABYLON.Scene, playerManager: PlayerManager) {
        this._playerManager = playerManager;

        // create camera entity
        let cameraECS = ECSengine.createEntity();
        this._cameraTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.005, 0.005, 0.005), BABYLON.Quaternion.Identity());
        this._cameraTranslateComponent.setPosition = this._cameraTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 5));
        cameraECS.addComponent(this._cameraTranslateComponent);
        this._cameraComponent = new ComponentCamera(this._cameraTranslateComponent, scene);
        cameraECS.addComponent(this._cameraComponent);

        this._shakeOffset = BABYLON.Vector3.Zero();
    }

    /**
     * check the camera shake.
     * updates the players camera position.
     */
    update(deltaTime: number) {
        if (this._shaken) {
            this._shaketime++;
            if (this._shaketime == 1) {
                this._shakeOffset = new BABYLON.Vector3(0.03, 0, 0);
            }
            else if (this._shaketime == 3) {
                this._shakeOffset = new BABYLON.Vector3(-0.03, 0, 0);
            }
            else if (this._shaketime == 5) {
                this._shakeOffset = new BABYLON.Vector3(0.01, 0, 0);
            }
            else if (this._shaketime == 7) {
                this._shakeOffset = new BABYLON.Vector3(-0.01, 0, 0);
            }
            else if (this._shaketime == 9) {
                this._shakeOffset = new BABYLON.Vector3(0, 0, 0);
                this._shaketime = 0;
                this._shaken = false;
            }
        }

        this._cameraTranslateComponent.setPosition = this._playerManager.getplayerPosition().add(new BABYLON.Vector3(0, 0.5, 0.0)).add(this._shakeOffset);

    }

    /**
     * starts the camera shake.
     */
    Shake() {
        if (!this._shaken) {
            this._shaketime = 0;
            this._shaken = true;
        }
    }

    get cameraPosition(): BABYLON.Vector3 {
        return this._cameraTranslateComponent.getPosition;
    }

    getCameraComponent(): ComponentCamera {
        return this._cameraComponent;
    }
}