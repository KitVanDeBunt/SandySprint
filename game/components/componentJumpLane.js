var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * ComponentJumpLane
 */
var ComponentJumpLane = (function (_super) {
    __extends(ComponentJumpLane, _super);
    function ComponentJumpLane(componentAbstractMesh, startDirection, scene, startT) {
        _super.call(this, componentAbstractMesh, startT);
        this.forwared = new BABYLON.Vector3(0, 0, 1);
        this.up = new BABYLON.Vector3(0, 1, 0);
        this.jumping = false;
        this.T = 0;
        this.rotPoints = [
            BABYLON.Quaternion.Identity(),
            BABYLON.Quaternion.Identity(),
            BABYLON.Quaternion.Identity(),
            //new BABYLON.Quaternion(0.92,0.38,0.0,0.0),  // (45,0,0)
            BABYLON.Quaternion.Identity()];
        // set bezier points
        this.points = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(0, 5, 0),
            new BABYLON.Vector3(0, 3, 0),
            new BABYLON.Vector3(0, 0, 0)];
        // draw lane
        var curve = BABYLON.Curve3.CreateCubicBezier(this.points[0], this.points[1], this.points[2], this.points[3], 20);
        var cubicBezierCurve = BABYLON.Mesh.CreateLines("cbezier", curve.getPoints(), scene);
        cubicBezierCurve.color = new BABYLON.Color3(1, 0, .5);
    }
    ComponentJumpLane.prototype.jump = function (playerT) {
        this.jumping = true;
        this.T = playerT;
    };
    ComponentJumpLane.prototype.done = function () {
        this.jumping = false;
    };
    ComponentJumpLane.prototype.getEndT = function () {
        return this.T + 14;
    };
    ComponentJumpLane.prototype.getT = function () {
        return this.T;
    };
    ComponentJumpLane.prototype.getLaneLength = function () {
        return 14;
    };
    ComponentJumpLane.prototype.getPointAtT = function (t) {
        return Utils.Bezier.GetPoint(this.points[0], this.points[1], this.points[2], this.points[3], t);
    };
    ComponentJumpLane.prototype.getRotationAtT = function (t) {
        return Utils.Bezier.GetPointRotation(this.rotPoints[0], this.rotPoints[1], this.rotPoints[2], this.rotPoints[3], t);
    };
    ComponentJumpLane.prototype.forwaredVector = function (t) {
        var m = new BABYLON.Matrix();
        this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(this.forwared, m);
    };
    ComponentJumpLane.prototype.upVector = function (t) {
        var m = new BABYLON.Matrix();
        this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(this.up, m);
    };
    ComponentJumpLane.prototype.vectorToLineRotationMatrix = function (t, v) {
        var m = new BABYLON.Matrix();
        this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(v, m);
    };
    return ComponentJumpLane;
}(ComponentLaneBase));
//# sourceMappingURL=componentJumpLane.js.map