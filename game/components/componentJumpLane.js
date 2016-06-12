/**
 * ComponentJumpLane
 * Creates an extra curve to make the player jump.
 */
var ComponentJumpCurve = (function () {
    /**
     */
    function ComponentJumpCurve() {
        this.jumping = false;
        this._startT = 0;
        this.y = 0;
        this.yVelocity = 0;
    }
    /**
     * player jumps.
     * @param startT current position on the bezier curve.
     */
    ComponentJumpCurve.prototype.jump = function (startT) {
        this.jumping = true;
        this._startT = startT;
        this.y = 0;
        this.yVelocity = 0.013;
    };
    ComponentJumpCurve.prototype.getStartT = function () {
        return this._startT;
    };
    Object.defineProperty(ComponentJumpCurve.prototype, "doneT", {
        get: function () {
            return this._startT + (Math.PI);
        },
        enumerable: true,
        configurable: true
    });
    ComponentJumpCurve.prototype.getPointAtT = function (t, jumpHeight, deltaTime) {
        //let t2:number = ((t-this._startT)*(t-this._startT));
        //t2 = t2/3;
        //return new BABYLON.Vector3(0,Math.sin(t2)*jumpHeight,0);
        this.y += this.yVelocity;
        this.yVelocity -= deltaTime / 190000;
        return new BABYLON.Vector3(0, this.y, 0);
    };
    return ComponentJumpCurve;
}());
//# sourceMappingURL=componentJumpLane.js.map