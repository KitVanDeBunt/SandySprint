/**
 * GameUI
 */
class GameUI {
    
    context2D;
    playerManager:PlayerManager;
    myMaterial_diffuseTexture:BABYLON.DynamicTexture;
    
    constructor(scene:BABYLON.Scene,playerManager:PlayerManager) {
        this.playerManager = playerManager;
        
        //Adding UI Test Element Material
        var material = new BABYLON.StandardMaterial("texture1", scene);
        material.alpha = 1;
        material.diffuseColor = new BABYLON.Color3(1.00, 1.00, 1.00);
        
        this.myMaterial_diffuseTexture = new BABYLON.DynamicTexture('ScoreTex', 512, scene, true);
        this.myMaterial_diffuseTexture.hasAlpha = true;
        //myMaterial_diffuseTexture.clear();
        material.diffuseTexture = this.myMaterial_diffuseTexture;
        
        this.context2D = this.myMaterial_diffuseTexture.getContext();
    }
    
    update():void{
		this.context2D.clearRect(0, 0, 512,512);
        this.myMaterial_diffuseTexture.drawText("Score:"+this.playerManager.getplayerT, 0,140,"bold 42px Segoe UI", "white","transparent");
    }
}