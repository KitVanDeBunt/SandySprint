/**
 * PlayerCameraManager
 * managers the camera begind the player.
 */
var PlayerCameraManager = (function () {
    /**
     * @param ECSengine the Entity Component System of the game.
     * @param scene the scene that the game is using.
     * @playerManager the playerManager of the player that it is following.
     */
    function PlayerCameraManager(ECSengine, scene, playerManager) {
        this._shaketime = 0;
        this._shaken = false;
        this._playerManager = playerManager;
        // create camera entity
        var cameraECS = ECSengine.createEntity();
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
     * @param deltaTime deltatime
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
        this._cameraTranslateComponent.setPosition = this._playerManager.getplayerPosition().add(new BABYLON.Vector3(0, 0.5, 0.0)).add(this._shakeOffset);
    };
    /**
     * starts the camera shake.
     */
    PlayerCameraManager.prototype.Shake = function () {
        if (!this._shaken) {
            this._shaketime = 0;
            this._shaken = true;
        }
    };
    Object.defineProperty(PlayerCameraManager.prototype, "cameraPosition", {
        get: function () {
            return this._cameraTranslateComponent.getPosition;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * returns the camera component used in this manager
     * @returns camera component
     */
    PlayerCameraManager.prototype.getCameraComponent = function () {
        return this._cameraComponent;
    };
    return PlayerCameraManager;
}());
//# sourceMappingURL=playerCameraManager.js.map