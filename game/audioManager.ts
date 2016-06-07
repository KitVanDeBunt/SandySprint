/**
 * Class audioManager
 * Creates, plays, and stops all the sounds.
 */
class audioManager {

    private _scene: BABYLON.Scene;
    state: Sounds;
    private _pickUpSound: BABYLON.Sound;
    menuBackgroundSound: BABYLON.Sound;
    private _inGameSound: BABYLON.Sound;
    private _jumpSound: BABYLON.Sound;
    private _jumpLandSound: BABYLON.Sound;
    private _startSound: BABYLON.Sound;
    private _stopSound: BABYLON.Sound;
    private _laneSwitchSound: BABYLON.Sound;
    private _walkSound: BABYLON.Sound;

    /**
     * @param scene the scene of the game.
     */
    constructor(scene: BABYLON.Scene) {
        this._scene = scene;
        this._pickUpSound = this.addSound("Pickup", "../assets/sounds/pickUp.wav", false, 2);
        this.menuBackgroundSound = this.addSound("MenuBackGround", "../assets/sounds/menuSound.mp3", true, 0.1);
        this._inGameSound = this.addSound("InGameSound", "../assets/sounds/gameSound.mp3", true, 1);
        this._jumpSound = this.addSound("Jumpsound", "../assets/sounds/jump.flac", false, 1);
        this._jumpLandSound = this.addSound("JumpLandSound", "../assets/sounds/jumpland.mp3", false, 1);
        this._startSound = this.addSound("StartSound", "../assets/sounds/start.wav", false, 2);
        this._stopSound = this.addSound("StopSound", "../assets/sounds/stop.flac", false, 2);
        this._laneSwitchSound = this.addSound("SwitchSound", "../assets/sounds/swipe.wav", false, 1);
        this._walkSound = this.addSound("WalkSound", "../assets/sounds/Walk1.flac", false, 0.5);
    }

    /**
     * Creates and returns a sound
     * @param name name of the sound
     * @param url location of the sound
     * @param loop boolean if the sound needs to loop
     * @param volume volume of the sound
     */
    addSound(name: string, url: string, loop: boolean, volume: number): BABYLON.Sound {
        var variable = new BABYLON.Sound(name, url, this._scene, null, { autoplay: false, loop: loop });
        variable.setVolume(volume);
        return variable;
    }

    /**
     * Plays a sound
     * @param sound plays a sound defined by enum Sound
     */
    playSound(sound: Sounds) {
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
    }

    /**
     * stop a sound
     * @param sound stops a sound defined by enum Sounds
     */
    stopSound(sound: Sounds) {
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
    }
}

enum Sounds {
    Pickup,
    MainMenu,
    Game,
    Jump,
    JumpLand,
    Start,
    Stop,
    LaneSwitch,
    Walk
}