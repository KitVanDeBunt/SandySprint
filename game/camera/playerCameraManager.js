/**
 * PlayerCameraManager
 */
var PlayerCameraManager = (function () {
    function PlayerCameraManager(ECSengine, scene, playerManager) {
        this._shaketime = 0;
        this._shaken = false;
        this.playerManager = playerManager;
        // create camera entity
        var cameraECS = ECSengine.createEntity();
        this.cameraTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.005, 0.005, 0.005), BABYLON.Quaternion.Identity());
        this.cameraTranslateComponent.setPosition = this.cameraTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 5));
        cameraECS.addComponent(this.cameraTranslateComponent);
        this.cameraComponent = new ComponentCamera(this.cameraTranslateComponent, scene);
        cameraECS.addComponent(this.cameraComponent);
        this._shakeOffset = BABYLON.Vector3.Zero();
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
        this.cameraTranslateComponent.setPosition = this.playerManager.getplayerPosition().add(new BABYLON.Vector3(0, 0.5, 0.0)).add(this._shakeOffset);
    };
    PlayerCameraManager.prototype.Shake = function () {
        if (!this._shaken) {
            this._shaketime = 0;
            this._shaken = true;
        }
    };
    PlayerCameraManager.prototype.getCameraComponent = function () {
        return this.cameraComponent;
    };
    return PlayerCameraManager;
}());
//# sourceMappingURL=playerCameraManager.js.map