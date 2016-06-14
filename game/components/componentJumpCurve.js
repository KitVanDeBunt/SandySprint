/**
 * ComponentJumpLane
 * Creates an extra curve to make the player jump.
 */
var ComponentJumpCurve = (function () {
    function ComponentJumpCurve() {
        this.jumping = false;
        this._startT = 0;
        this._y = 0;
        this._yVelocity = 0;
    }
    /**
     * player jumps.
     * @param startT current position on the bezier curve.
     */
    ComponentJumpCurve.prototype.jump = function (startT) {
        this.jumping = true;
        this._startT = startT;
        this._y = 0;
        this._yVelocity = 0.013;
    };
    ComponentJumpCurve.prototype.getStartT = function () {
        return this._startT;
    };
    /**
     * returns a point in the jump curve
     * @param deltaTime time between this and last frame
     * @returns point on curve at t
     */
    ComponentJumpCurve.prototype.getPointAtT = function (deltaTime) {
        this._y += this._yVelocity;
        this._yVelocity -= deltaTime / 190000;
        return new BABYLON.Vector3(0, this._y, 0);
    };
    return ComponentJumpCurve;
}());
//# sourceMappingURL=componentJumpCurve.js.map