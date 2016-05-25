/**
 * SkyBoxManager
 * info: https://www.eternalcoding.com/?p=263
 * manages the skybox
 */
var SkyBoxManager = (function () {
    function SkyBoxManager(scene, ECSengine) {
        // Skybox
        this.skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("assets/textures/skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/textures/skybox/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        this.skybox.material = skyboxMaterial;
    }
    SkyBoxManager.prototype.update = function (cameraPosition) {
        this.skybox.position = cameraPosition;
    };
    return SkyBoxManager;
}());
//# sourceMappingURL=skyBoxManager.js.map