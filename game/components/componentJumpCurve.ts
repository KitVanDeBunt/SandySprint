/**
 * ComponentJumpLane
 * Creates an extra curve to make the player jump.
 */
class ComponentJumpCurve {

    jumping: boolean = false;
    private _startT: number = 0;
    private _y:number = 0;
    private _yVelocity = 0;
    
    constructor() {
    }

    /**
     * player jumps.
     * @param startT current position on the bezier curve.
     */
    jump(startT: number): void {
        this.jumping = true;
        this._startT = startT;
        this._y = 0;
        this._yVelocity = 0.0095;
    }

    getStartT(): number {
        return this._startT;
    }

    /**
     * returns a point in the jump curve
     * @param deltaTime time between this and last frame
     * @returns point on curve at t
     */
    getPointAtT(deltaTime:number): BABYLON.Vector3 {
        this._yVelocity -= deltaTime*0.000004;
        this._y += this._yVelocity * (deltaTime/1000) * 50;
        return new BABYLON.Vector3(0,this._y,0);
    }

}