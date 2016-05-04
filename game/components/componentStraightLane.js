var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * ComponentStraightLane
 */
var ComponentStraightLane = (function (_super) {
    __extends(ComponentStraightLane, _super);
    function ComponentStraightLane(componentAbstractMesh, startPos, startDirection, scene) {
        _super.call(this, componentAbstractMesh);
        this.forwared = new BABYLON.Vector3(0, 0, 1);
        this.up = new BABYLON.Vector3(0, 0, 1);
        this.rotPoints = [
            BABYLON.Quaternion.Identity(),
            BABYLON.Quaternion.Identity(),
            BABYLON.Quaternion.Identity(),
            BABYLON.Quaternion.Identity()];
        // set bezier points
        this.points = [
            new BABYLON.Vector3(0, 0, startPos.z),
            new BABYLON.Vector3(0, 0, startPos.z + (14 / 3) * 1),
            new BABYLON.Vector3(0, 0, startPos.z + ((14 / 3) * 2)),
            new BABYLON.Vector3(0, 0, startPos.z + 14)];
        // draw
        var curve = BABYLON.Curve3.CreateCubicBezier(this.points[0], this.points[1], this.points[2], this.points[3], 20);
        var cubicBezierCurve = BABYLON.Mesh.CreateLines("cbezier", curve.getPoints(), scene);
        cubicBezierCurve.color = new BABYLON.Color3(1, 0, .5);
        //var continued = cubicBezierVectors.continue(cubicBezierVectors);
    }
    ComponentStraightLane.prototype.getPointAtT = function (t) {
        return Utils.Bezier.GetPoint(this.points[0], this.points[1], this.points[2], this.points[3], t);
    };
    ComponentStraightLane.prototype.getRotationAtT = function (t) {
        return Utils.Bezier.GetPointRotation(this.rotPoints[0], this.rotPoints[1], this.rotPoints[2], this.rotPoints[3], t);
    };
    ComponentStraightLane.prototype.forwaredVector = function (t) {
        var m = new BABYLON.Matrix();
        this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(this.forwared, m);
    };
    ComponentStraightLane.prototype.upVector = function (t) {
        var m = new BABYLON.Matrix();
        this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(this.up, m);
    };
    return ComponentStraightLane;
}(ComponentLaneBase));
//# sourceMappingURL=componentStraightLane.js.map