/**
 * GameUI
 */
class GameUI {
    
    context2D;
    playerManager:PlayerManager;
    myMaterial_diffuseTexture:BABYLON.DynamicTexture;
    box:BABYLON.Mesh;
    UICamera:BABYLON.FreeCamera;
    
    constructor(scene:BABYLON.Scene,playerManager:PlayerManager) {
        this.playerManager = playerManager;
        
        //Adding light for UI elements
    var UIlight = new BABYLON.DirectionalLight("UIemit",new BABYLON.Vector3(0,0,1),scene);
    UIlight.includeOnlyWithLayerMask = 0x20000000; 
    
    //Adding UI camera
    //info: layerMask = 0x20000000;
    this.UICamera = new BABYLON.FreeCamera("UICamera",new BABYLON.Vector3(0,0,-5),scene);
    this.UICamera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    this.UICamera.layerMask = 0x20000000;
    scene.activeCameras.push(this.UICamera);
        
        //Adding UI Test Element Material
        var material = new BABYLON.StandardMaterial("texture1", scene);
        material.alpha = 1;
        
        material.diffuseColor = new BABYLON.Color3(1.00, 1.00, 1.00);
        
        this.myMaterial_diffuseTexture = new BABYLON.DynamicTexture('ScoreTex', 512, scene, true);
        this.myMaterial_diffuseTexture.hasAlpha = true;
        //myMaterial_diffuseTexture.clear();
        material.diffuseTexture = this.myMaterial_diffuseTexture;
        
        //Adding UI Test Element
    this.box = BABYLON.Mesh.CreatePlane("Box",5,scene,false);
    this.box.material = material;
    this.box.scaling = new BABYLON.Vector3((178*887)/887,(204*1019)/1019,1);
    this.box.position = BABYLON.Vector3.Zero();
    this.box.layerMask = 0x20000000;
        
        this.context2D = this.myMaterial_diffuseTexture.getContext();
    }
    
    update():void{
		this.context2D.clearRect(0, 0, 512,512);
        this.myMaterial_diffuseTexture.drawText("Score:"+this.playerManager.getplayerT, 0,140,"bold 42px Segoe UI", "white","transparent");
    }
}