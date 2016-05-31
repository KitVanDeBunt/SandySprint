/**
 * endScreen
 */ 
class endScreen{
    
    private _objects: Array<BABYLON.Mesh>;
    private _gameUI:GameUI;
    private _scene:BABYLON.Scene;
    
    constructor(gameUI:GameUI, scene:BABYLON.Scene) {
        this._gameUI = gameUI;
        this._scene = scene;
        this._objects = [];
        
        this.StartScreen();
    }
    
    /**
     * start EndScreen
     */
    StartScreen(){
        this._objects = [];
        this._gameUI.menuState = menuState.End;
        
        var backgroundTex = new BABYLON.Texture("/assets/textures/UI textures/ui-background.png", this._scene, true);
        var background = this._gameUI.createImage(new BABYLON.Vector2(0, 0), new BABYLON.Vector2(337 * 0.7, 403 * 0.7), backgroundTex);
        this._objects.push(background);

        backgroundTex = new BABYLON.Texture("/assets/textures/UI textures/restart-button.png", this._scene, true);
        var play = this._gameUI.createImage(new BABYLON.Vector2(0, -200), new BABYLON.Vector2(99, 99), backgroundTex);
        this._objects.push(play);
    }
    
    onInput(inputPos: BABYLON.Vector2) {
        switch (this._gameUI.menuState) {
            case menuState.End:
            this.Dispose();
            //TO DO:Restart Game
            //this._gameUI.preopenInGame();
                break;
            default:
                break;
        }
    }
    
    /**
     * remove all UI objects
     */
    Dispose() {
        for (var i: number = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
        }
    }
}