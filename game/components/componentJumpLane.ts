/**
 * ComponentJumpLane
 * Creates an extra curve to make the player jump.
 */
class ComponentJumpCurve {

    jumping: boolean = false;
    private _startT: number = 0;
    private y:number = 0;
    private yVelocity = 0;
    
    constructor() {
    }

    /**
     * player jumps.
     * @param startT current position on the bezier curve.
     */
    jump(startT: number): void {
        this.jumping = true;
        this._startT = startT;
        this.y = 0;
        this.yVelocity = 0.017;
    }

    getStartT(): number {
        return this._startT;
    }

    get doneT():number{
        return this._startT+(Math.PI);
    }

    getPointAtT(t: number,jumpHeight:number,deltaTime:number): BABYLON.Vector3 {
        //let t2:number = ((t-this._startT)*(t-this._startT));
        //t2 = t2/3;
        //return new BABYLON.Vector3(0,Math.sin(t2)*jumpHeight,0);
        this.y += this.yVelocity;
        this.yVelocity -= deltaTime / 190000;
        return new BABYLON.Vector3(0,this.y,0);
    }

}