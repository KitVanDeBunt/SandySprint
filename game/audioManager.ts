class audioManager {

    private scene: BABYLON.Scene;
    state: Sounds;
    pickUpSound:BABYLON.Sound;
    menuBackgroundSound:BABYLON.Sound;

    constructor(scene: BABYLON.Scene) {
        this.scene = scene;
        
        this.pickUpSound = new BABYLON.Sound("pickup", "../assets/sounds/253168__suntemple__sfx-ui-button-click.wav",
                    scene, null, { autoplay: false, loop: false});
        this.pickUpSound.setVolume(8);
        
        this.menuBackgroundSound = new BABYLON.Sound("MenuBackGround", "../assets/sounds/LOOP DRINUS GAME 1.mp3",
                    scene, null, { autoplay: false, loop: true});
        this.menuBackgroundSound.setVolume(0.1);
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
    MainMenu,
    Pickup
}