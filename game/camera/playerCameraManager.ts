/**
 * PlayerCameraManager
 */
class PlayerCameraManager {

    private cameraECS: ECS.Entity;
    private cameraTranslateComponent: ECS.ComponentTransform;
    private cameraComponent: ComponentCamera;
    private playerManager: PlayerManager;

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
    }

    /**
     * updates the players camera
     */
    update(deltaTime: number) {
        this.cameraTranslateComponent.setPosition = this.playerManager.getplayerPosition().add(new BABYLON.Vector3(0, 0.5, 0.0));
    }
    
    getCameraComponent():ComponentCamera{
        return this.cameraComponent;
    }
}