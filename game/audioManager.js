/**
 * Class audioManager
 * Creates, plays, and stops all the sounds.
 */
var audioManager = (function () {
    /**
     * @param scene the scene of the game.
     */
    function audioManager(scene) {
        this._scene = scene;
        this._pickUpSound = this.addSound("Pickup", "../assets/sounds/pickUp.wav", false, 2);
        this.menuBackgroundSound = this.addSound("MenuBackGround", "../assets/sounds/menuSound.mp3", true, 0.1);
        this._inGameSound = this.addSound("InGameSound", "../assets/sounds/gameSound.mp3", true, 1);
        this._jumpSound = this.addSound("Jumpsound", "../assets/sounds/jump.mp3", false, 1);
        this._jumpLandSound = this.addSound("JumpLandSound", "../assets/sounds/jumpland.mp3", false, 1);
        this._startSound = this.addSound("StartSound", "../assets/sounds/start.wav", false, 2);
        this._stopSound = this.addSound("StopSound", "../assets/sounds/stop.mp3", false, 2);
        this._laneSwitchSound = this.addSound("SwitchSound", "../assets/sounds/swipe.wav", false, 1);
        this._walkSound = this.addSound("WalkSound", "../assets/sounds/Walk1.mp3", false, 0.5);
    }
    /**
     * Creates and returns a sound
     * @param name name of the sound
     * @param url location of the sound
     * @param loop boolean if the sound needs to loop
     * @param volume volume of the sound
     */
    audioManager.prototype.addSound = function (name, url, loop, volume) {
        var variable = new BABYLON.Sound(name, url, this._scene, null, { autoplay: false, loop: loop });
        variable.setVolume(volume);
        return variable;
    };
    /**
     * Plays a sound
     * @param sound plays a sound defined by enum Sound
     */
    audioManager.prototype.playSound = function (sound) {
        switch (sound) {
            case Sounds.Pickup:
                this._pickUpSound.play();
                break;
            case Sounds.MainMenu:
                this.menuBackgroundSound.play();
                break;
            case Sounds.Game:
                this._inGameSound.play();
                break;
            case Sounds.Jump:
                this._jumpSound.play();
                break;
            case Sounds.JumpLand:
                this._jumpLandSound.play();
                break;
            case Sounds.Start:
                this._startSound.play();
                break;
            case Sounds.Stop:
                this._stopSound.play();
                break;
            case Sounds.LaneSwitch:
                this._laneSwitchSound.play();
                break;
            case Sounds.Walk:
                this._walkSound.play();
                break;
            default:
                break;
        }
    };
    /**
     * stop a sound
     * @param sound stops a sound defined by enum Sounds
     */
    audioManager.prototype.stopSound = function (sound) {
        switch (sound) {
            case Sounds.Pickup:
                this._pickUpSound.stop();
                break;
            case Sounds.MainMenu:
                this.menuBackgroundSound.stop();
                break;
            case Sounds.Game:
                this._inGameSound.stop();
                break;
            case Sounds.Jump:
                this._jumpSound.stop();
                break;
            case Sounds.JumpLand:
                this._jumpLandSound.stop();
                break;
            case Sounds.Start:
                this._startSound.stop();
                break;
            case Sounds.Stop:
                this._stopSound.stop();
                break;
            case Sounds.LaneSwitch:
                this._laneSwitchSound.stop();
                break;
            case Sounds.Walk:
                this._walkSound.stop();
                break;
            default:
                break;
        }
    };
    return audioManager;
}());
var Sounds;
(function (Sounds) {
    Sounds[Sounds["Pickup"] = 0] = "Pickup";
    Sounds[Sounds["MainMenu"] = 1] = "MainMenu";
    Sounds[Sounds["Game"] = 2] = "Game";
    Sounds[Sounds["Jump"] = 3] = "Jump";
    Sounds[Sounds["JumpLand"] = 4] = "JumpLand";
    Sounds[Sounds["Start"] = 5] = "Start";
    Sounds[Sounds["Stop"] = 6] = "Stop";
    Sounds[Sounds["LaneSwitch"] = 7] = "LaneSwitch";
    Sounds[Sounds["Walk"] = 8] = "Walk";
})(Sounds || (Sounds = {}));
//# sourceMappingURL=audioManager.js.map