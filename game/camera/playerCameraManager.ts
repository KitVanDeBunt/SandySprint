/**
 * PlayerCameraManager
 */
class PlayerCameraManager {

    private cameraECS: ECS.Entity;
    private cameraTranslateComponent: ECS.ComponentTransform;
    private cameraComponent: ComponentCamera;
    private playerManager: PlayerManager;

    constructor(ECSengine: ECS.Engine, scene: BABYLON.Scene, playerManager: PlayerManager) {
        this.playerManager = playerManager;
        
        // create camera entity
        let cameraECS = ECSengine.createEntity();
        this.cameraTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.005, 0.005, 0.005),BABYLON.Quaternion.Identity());
        this.cameraTranslateComponent.setPosition = this.cameraTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 5));
        cameraECS.addComponent(this.cameraTranslateComponent);
        cameraECS.addComponent(new ComponentCamera(this.cameraTranslateComponent, scene));
    }

    update(deltaTime:number){
        this.cameraTranslateComponent.setPosition = this.playerManager.getplayerPosition().add(new BABYLON.Vector3(0, 0.5, 0.0));
    }
}