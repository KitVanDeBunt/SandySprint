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
        this._walkSwitch = true;
        this._pickUpSound = this.addSound("Pickup", "../assets/sounds/pickUp.wav", false, 2, 1);
        this.menuBackgroundSound = this.addSound("MenuBackGround", "../assets/sounds/menuSound.mp3", true, 0.1, 1);
        this._inGameSound = this.addSound("InGameSound", "../assets/sounds/gameSound.mp3", true, 0.6, 1);
        this._jumpSound = this.addSound("Jumpsound", "../assets/sounds/jump.wav", false, 0.3, 1);
        this._jumpLandSound = this.addSound("JumpLandSound", "../assets/sounds/jumpland.mp3", false, 0.9, 1);
        this._startSound = this.addSound("StartSound", "../assets/sounds/start.wav", false, 2, 0.6);
        this._stopSound = this.addSound("StopSound", "../assets/sounds/stop.mp3", false, 1, 1);
        this._spikeSound = this.addSound("SpikeSound", "../assets/sounds/Sword.mp3", false, 1, 1);
        this._laneSwitchSound = this.addSound("SwitchSound", "../assets/sounds/swipe.wav", false, 0.1, 1);
        this._walkSoundL = this.addSound("WalkSoundL", "../assets/sounds/Walk1.mp3", false, 0.1, 0.8);
        this._walkSoundR = this.addSound("WalkSoundR", "../assets/sounds/Walk2.mp3", false, 0.1, 0.8);
    }
    /**
     * Creates and returns a sound
     * @param name name of the sound
     * @param url location of the sound
     * @param loop boolean if the sound needs to loop
     * @param volume volume of the sound
     */
    audioManager.prototype.addSound = function (name, url, loop, volume, playbackRate) {
        var sound = new BABYLON.Sound(name, url, this._scene, null, { autoplay: false, loop: loop });
        sound.setVolume(volume);
        sound.setPlaybackRate(playbackRate);
        return sound;
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
                this._jumpSound.setPlaybackRate(1 + (Math.random() * 0.2));
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
            case Sounds.Spike:
                this._spikeSound.play();
                break;
            case Sounds.LaneSwitch:
                this._laneSwitchSound.play();
                break;
            case Sounds.Walk:
                if (this._walkSwitch) {
                    this._walkSoundL.play();
                }
                else {
                    this._walkSoundR.play();
                }
                this._walkSwitch = !this._walkSwitch;
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
            case Sounds.Spike:
                this._spikeSound.stop();
                break;
            case Sounds.LaneSwitch:
                this._laneSwitchSound.stop();
                break;
            case Sounds.Walk:
                this._walkSoundL.stop();
                this._walkSoundR.stop();
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
    Sounds[Sounds["Spike"] = 7] = "Spike";
    Sounds[Sounds["LaneSwitch"] = 8] = "LaneSwitch";
    Sounds[Sounds["Walk"] = 9] = "Walk";
})(Sounds || (Sounds = {}));
//# sourceMappingURL=audioManager.js.map