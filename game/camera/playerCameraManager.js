/**
 * PlayerCameraManager
 */
var PlayerCameraManager = (function () {
    function PlayerCameraManager(ECSengine, scene, playerManager) {
        this.playerManager = playerManager;
        // create camera entity
        var cameraECS = ECSengine.createEntity();
        this.cameraTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.005, 0.005, 0.005));
        this.cameraTranslateComponent.setPosition = this.cameraTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 5));
        cameraECS.addComponent(this.cameraTranslateComponent);
        cameraECS.addComponent(new ComponentCamera(this.cameraTranslateComponent, scene));
    }
    PlayerCameraManager.prototype.update = function (deltaTime) {
        this.cameraTranslateComponent.setPosition = this.playerManager.getplayerPosition().add(new BABYLON.Vector3(0, 0.5, -1.5));
    };
    return PlayerCameraManager;
}());
//# sourceMappingURL=playerCameraManager.js.map