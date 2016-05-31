class InGameUI{
    
    private objects: Array<BABYLON.Mesh>;
    private gameUI:GameUI;
        myMaterial_diffuseTexture: BABYLON.DynamicTexture;
    box: BABYLON.Mesh;
    canvas: HTMLCanvasElement;
    context2D;
    playerManager:PlayerManager;
    
    constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine, scene: BABYLON.Scene, gameUI:GameUI, playerManager:PlayerManager) {
        this.gameUI = gameUI;
        this.canvas = canvas;
        this.playerManager = playerManager;
        
        this.CreateUI();
    }
    
    CreateUI(){
        this.gameUI.menuState = menuState.Game;
        
         var material = new BABYLON.StandardMaterial("textuare1", scene);
        material.alpha = 1;

        material.diffuseColor = new BABYLON.Color3(1.00, 1.00, 1.00);

        this.myMaterial_diffuseTexture = new BABYLON.DynamicTexture('ScoreTex', 512, scene, true);
        this.myMaterial_diffuseTexture.hasAlpha = true;
        material.diffuseTexture = this.myMaterial_diffuseTexture;

        //Adding UI Element
        this.box = BABYLON.Mesh.CreatePlane("Box", 5, scene, false);
        this.box.material = material;
            this.box.scaling = new BABYLON.Vector3(200, 200, 1);
            
        console.log("" + "WxH:" + this.canvas.width + "x" + this.canvas.height)
        this.box.layerMask = 0x20000000;

        this.context2D = this.myMaterial_diffuseTexture.getContext();
    }
    
    update(){
         this.context2D.clearRect(0, 0, 512, 512);
       // if (this.canvas.width > this.canvas.height) {
            this.myMaterial_diffuseTexture.drawText("Score:" + Math.round(this.playerManager.getplayerT()), 0, /*240-((1842 / this.canvas.width)*100)*/50, "25px Cooper Std Black", "white", "transparent");
            this.myMaterial_diffuseTexture.drawText("Scarabs:" + this.playerManager.getPickupsCollected(), 0,/*270-((1842 / this.canvas.width)*100)*/80, "25px Cooper Std Black", "white", "transparent");
      /*  }
        else{
            this.myMaterial_diffuseTexture.drawText("Score:" + Math.round(this.playerManager.getplayerT()), 135-(this.canvas.width*0.18645731108930323846908734052993)+(this.canvas.height*0.14), 100, "30px Arial", "white", "transparent");
            this.myMaterial_diffuseTexture.drawText("Scarabs:" + this.playerManager.getPickupsCollected(), 135-(this.canvas.width*0.18645731108930323846908734052993)+(this.canvas.height*0.14),  140, "30px Arial", "white", "transparent");
        }*/
    }
    
    Dispose(){
        for(var i:number=0;i<this.objects.length;i++){
            this.objects[i].dispose();
        }
    }
}