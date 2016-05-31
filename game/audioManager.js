var audioManager = (function () {
    function audioManager(scene) {
        this.scene = scene;
        this.pickUpSound = new BABYLON.Sound("pickup", "../assets/sounds/pickUp.wav", scene, null, { autoplay: false, loop: false });
        this.pickUpSound.setVolume(2);
        this.menuBackgroundSound = new BABYLON.Sound("MenuBackGround", "../assets/sounds/menuSound.mp3", scene, null, { autoplay: false, loop: true });
        this.menuBackgroundSound.setVolume(0.1);
        this.inGameSound = new BABYLON.Sound("MenuBackGround", "../assets/sounds/gameSound.mp3", scene, null, { autoplay: false, loop: true });
        this.inGameSound.setVolume(1);
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
            case Sounds.Game:
                this.inGameSound.play();
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
            case Sounds.Game:
                this.inGameSound.stop();
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
    Sounds[Sounds["Game"] = 2] = "Game";
    Sounds[Sounds["MainMenu"] = 3] = "MainMenu";
    Sounds[Sounds["Pickup"] = 4] = "Pickup";
})(Sounds || (Sounds = {}));
//# sourceMappingURL=audioManager.js.map