/**
 * PlayerCameraManager
 */
class PlayerCameraManager {

    private cameraECS: ECS.Entity;
    private cameraTranslateComponent: ECS.ComponentTransform;
    private cameraComponent: ComponentCamera;
    private playerManager: PlayerManager;

    //camera shake
    private _shakeOffset: BABYLON.Vector3;
    private _shaketime: number = 0;
    private _shaken: boolean = false;

    get cameraPosition(): BABYLON.Vector3 {
        return this.cameraTranslateComponent.getPosition;
    }

    constructor(ECSengine: ECS.Engine, scene: BABYLON.Scene, playerManager: PlayerManager) {
        this.playerManager = playerManager;

        // create camera entity
        let cameraECS = ECSengine.createEntity();
        this.cameraTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.005, 0.005, 0.005), BABYLON.Quaternion.Identity());
        this.cameraTranslateComponent.setPosition = this.cameraTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 5));
        cameraECS.addComponent(this.cameraTranslateComponent);
        this.cameraComponent = new ComponentCamera(this.cameraTranslateComponent, scene);
        cameraECS.addComponent(this.cameraComponent);

        this._shakeOffset = BABYLON.Vector3.Zero();
    }

    /**
     * updates the players camera
     */
    update(deltaTime: number) {
        if (this._shaken) {
            this._shaketime++;
            if (this._shaketime == 1 ) {
                this._shakeOffset = new BABYLON.Vector3(0.03,0,0);
            }
            else if (this._shaketime == 3 ) {
                this._shakeOffset = new BABYLON.Vector3(-0.03,0,0);
            }
            else if (this._shaketime == 5 ) {
                this._shakeOffset = new BABYLON.Vector3(0.01,0,0);
            }
            else if (this._shaketime == 7 ) {
                this._shakeOffset = new BABYLON.Vector3(-0.01,0,0);
            }
            else if (this._shaketime == 9 ) {
                this._shakeOffset = new BABYLON.Vector3(0,0,0);
                this._shaketime = 0;
                this._shaken = false;
            }
        }
        
        this.cameraTranslateComponent.setPosition = this.playerManager.getplayerPosition().add(new BABYLON.Vector3(0, 0.5, 0.0)).add(this._shakeOffset);

    }

    Shake() {
        if (!this._shaken) {
            this._shaketime = 0;
            this._shaken = true;
        }
    }

    getCameraComponent(): ComponentCamera {
        return this.cameraComponent;
    }
}