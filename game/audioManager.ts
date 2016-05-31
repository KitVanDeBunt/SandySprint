class audioManager {

    private scene: BABYLON.Scene;
    state: Sounds;
    pickUpSound:BABYLON.Sound;
    menuBackgroundSound:BABYLON.Sound;
    inGameSound:BABYLON.Sound;

    constructor(scene: BABYLON.Scene) {
        this.scene = scene;
        
        this.pickUpSound = new BABYLON.Sound("pickup", "../assets/sounds/pickUp.wav",
                    scene, null, { autoplay: false, loop: false});
        this.pickUpSound.setVolume(2);
        
        this.menuBackgroundSound = new BABYLON.Sound("MenuBackGround", "../assets/sounds/menuSound.mp3",
                    scene, null, { autoplay: false, loop: true});
        this.menuBackgroundSound.setVolume(0.1);
        
        this.inGameSound = new BABYLON.Sound("MenuBackGround", "../assets/sounds/gameSound.mp3",
                    scene, null, { autoplay: false, loop: true});
        this.inGameSound.setVolume(1);
    }

    playSound(sound:Sounds) {
        switch (sound) {
            case Sounds.Click:
                break;
                
            case Sounds.Pickup:
                    this.pickUpSound.play();
                break;
            case Sounds.Background:
            
                break;
                case Sounds.Game:
                this.inGameSound.play();
                break;
            case Sounds.MainMenu:
                this.menuBackgroundSound.play();
            break;
            default:
                break;
        }
    }
    
    stopSound(sound:Sounds) {
        switch (sound) {
            case Sounds.Click:
                break;
                
            case Sounds.Pickup:
                    this.pickUpSound.stop();
                break;
            case Sounds.Background:
            
                break;
                case Sounds.Game:
                this.inGameSound.stop();
                break;
            case Sounds.MainMenu:
                this.menuBackgroundSound.stop();
            break;
            default:
                break;
        }
    }
}

enum Sounds {
    Click,
    Background,
    Game,
    MainMenu,
    Pickup
}