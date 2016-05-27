class audioManager {

    private scene: BABYLON.Scene;
    state: Sounds;
    pickUpSound:BABYLON.Sound;

    constructor(scene: BABYLON.Scene) {
        this.scene = scene;
        this.pickUpSound = new BABYLON.Sound("pickup", "../assets/sounds/253168__suntemple__sfx-ui-button-click.wav",
                    scene, null, { autoplay: false, loop: false});
        this.pickUpSound.setVolume(8);
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