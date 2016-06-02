class audioManager {

    private _scene: BABYLON.Scene;
    state: Sounds;
    pickUpSound:BABYLON.Sound;
    menuBackgroundSound:BABYLON.Sound;
    inGameSound:BABYLON.Sound;

    constructor(scene: BABYLON.Scene) {
        this._scene = scene;
        
        this.pickUpSound = new BABYLON.Sound("pickup", "assets/sounds/pickUp.wav",
                    this._scene, null, { autoplay: false, loop: false});
        this.pickUpSound.setVolume(2);
        
        this.menuBackgroundSound = new BABYLON.Sound("MenuBackGround", "assets/sounds/menuSound.mp3",
                    this._scene, null, { autoplay: false, loop: true});
        this.menuBackgroundSound.setVolume(0.1);
        
        this.inGameSound = new BABYLON.Sound("MenuBackGround", "assets/sounds/gameSound.mp3",
                    this._scene, null, { autoplay: false, loop: true});
        this.inGameSound.setVolume(1);
    }

    /**
     * Plays a sound
     * @param sound plays a sound defined by enum Sound
     */
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
    
    /**
     * stop a sound
     * @param sound stops a sound defined by enum Sounds
     */
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