class endScreen{
    
    private objects: Array<BABYLON.Mesh>;
    gameUI:GameUI;
    
    constructor(gameUI:GameUI) {
        this.gameUI = gameUI;
        
        this.StartScreen();
    }
    
    StartScreen(){
        this.gameUI.menuState = menuState.End;
    }
    
    onInput(inputPos: BABYLON.Vector2) {
        switch (this.gameUI.menuState) {
            case menuState.End:
            this.Dispose();
                break;
            default:
                break;
        }
    }
    
    update(){
        
    }
    
    Dispose() {
        for (var i: number = 0; i < this.objects.length; i++) {
            this.objects[i].dispose();
            this.objects.splice(i,1);
        }
    }
}