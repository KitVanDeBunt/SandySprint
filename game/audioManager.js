var audioManager = (function () {
    function audioManager(scene) {
        this.scene = scene;
        this.pickUpSound = new BABYLON.Sound("pickup", "../assets/sounds/253168__suntemple__sfx-ui-button-click.wav", scene, null, { autoplay: false, loop: false });
        this.pickUpSound.setVolume(8);
        this.menuBackgroundSound = new BABYLON.Sound("MenuBackGround", "../assets/sounds/LOOP DRINUS GAME 1.mp3", scene, null, { autoplay: false, loop: true });
        this.menuBackgroundSound.setVolume(0.1);
    }
    audioManager.prototype.playSound = function (sound) {
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
    };
    audioManager.prototype.stopSound = function (sound) {
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
    };
    return audioManager;
}());
var Sounds;
(function (Sounds) {
    Sounds[Sounds["Click"] = 0] = "Click";
    Sounds[Sounds["Background"] = 1] = "Background";
    Sounds[Sounds["MainMenu"] = 2] = "MainMenu";
    Sounds[Sounds["Pickup"] = 3] = "Pickup";
})(Sounds || (Sounds = {}));
//# sourceMappingURL=audioManager.js.map