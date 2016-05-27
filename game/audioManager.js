var audioManager = (function () {
    function audioManager(scene) {
        this.scene = scene;
        this.pickUpSound = new BABYLON.Sound("pickup", "../assets/sounds/253168__suntemple__sfx-ui-button-click.wav", scene, null, { autoplay: false, loop: false });
        this.pickUpSound.setVolume(8);
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