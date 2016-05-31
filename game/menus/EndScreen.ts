/**
 * endScreen
 */ 
class endScreen{
    
    private _objects: Array<BABYLON.Mesh>;
    private _gameUI:GameUI;
    
    constructor(gameUI:GameUI) {
        this._gameUI = gameUI;
        
        this.StartScreen();
    }
    
    /**
     * start EndScreen
     */
    StartScreen(){
        this._gameUI.menuState = menuState.End;
    }
    
    onInput(inputPos: BABYLON.Vector2) {
        switch (this._gameUI.menuState) {
            case menuState.End:
            this.Dispose();
                break;
            default:
                break;
        }
    }
    
    update(){
        
    }
    
    /**
     * remove all UI objects
     */
    Dispose() {
        for (var i: number = 0; i < this._objects.length; i++) {
            this._objects[i].dispose();
            this._objects.splice(i,1);
        }
    }
}