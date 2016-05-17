/**
 * SkyBoxManager
 * info: http://doc.babylonjs.com/extensions/Sky#introduction
 * manages the skybox
 */
class SkyBoxManager {
    constructor(scene: BABYLON.Scene) {
        
        var skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
        skyMaterial.backFaceCulling = false;
        skyMaterial.luminance = 0.1;
        skyMaterial.inclination = 0.42;
        skyMaterial.azimuth = 0.25;
        skyMaterial.rayleigh = 1;
        skyMaterial.mieDirectionalG = 0.90
        skyMaterial.mieCoefficient = 0.005;

        var skybox = BABYLON.Mesh.CreateBox("skyBox", 10000.0, scene);
        skybox.material = skyMaterial;
    }
}