/**
 * Class LoadingScreen 
 * */
 class loadingScreen{
    
    private _objects: Array<BABYLON.Mesh>;
    private _scene:BABYLON.Scene;
    private _gameUI:GameUI;
    private _meshRender:ECS.SystemMeshRender;
    
    constructor(gameui:GameUI, scene:BABYLON.Scene,systemMeshRender:ECS.SystemMeshRender){
        this._gameUI = gameui;
        this._scene = scene;
        this.showLoadingScreen();
        this._meshRender = systemMeshRender;
        this.showLoadingScreen();
        this._gameUI.menuState = menuState.Loading;
    }
    
    showLoadingScreen(){
        var loadingImage:BABYLON.Texture = new BABYLON.Texture("assets/textures/ui_textures/LoadingScreen.png", this._scene, true);
        var loading = this._gameUI.createImage(new BABYLON.Vector2(0,0),new BABYLON.Vector2(1920,1080),loadingImage);
        this._objects.push(loading);
    }
    
    update(){
        //TO DO: if this._meshRender.loading >= 1 { dispose }
    }
    
    dispose(){
        for (var i: number = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
        }
    }
}