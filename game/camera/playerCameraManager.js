/**
 * PlayerCameraManager
 */
var PlayerCameraManager = (function () {
    function PlayerCameraManager(ECSengine, scene, playerManager) {
        this.playerManager = playerManager;
        // create camera entity
        var cameraECS = ECSengine.createEntity();
        this.cameraTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.005, 0.005, 0.005), BABYLON.Quaternion.Identity());
        this.cameraTranslateComponent.setPosition = this.cameraTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 5));
        cameraECS.addComponent(this.cameraTranslateComponent);
        cameraECS.addComponent(new ComponentCamera(this.cameraTranslateComponent, scene));
    }
    Object.defineProperty(PlayerCameraManager.prototype, "cameraPosition", {
        get: function () {
            return this.cameraTranslateComponent.getPosition;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * updates the players camera
     */
    PlayerCameraManager.prototype.update = function (deltaTime) {
        this.cameraTranslateComponent.setPosition = this.playerManager.getplayerPosition().add(new BABYLON.Vector3(0, 0.5, 0.0));
    };
    PlayerCameraManager.prototype.getCameraComponent = function () {
        return this.cameraComponent;
    };
    return PlayerCameraManager;
}());
//# sourceMappingURL=playerCameraManager.js.map