var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * straight road lane
 */
var ComponentStraightLane = (function (_super) {
    __extends(ComponentStraightLane, _super);
    /**
     * @param startPos start position of the lane
     * @param startDirection start direction of the lane
     * @param scene scene where the game is renderd used for debuging
     * @param startT the lanes distance in the game
     */
    function ComponentStraightLane(startPos, startDirection, scene, startT) {
        _super.call(this, startT);
        this._forwared = new BABYLON.Vector3(0, 0, 1);
        this._up = new BABYLON.Vector3(0, 1, 0);
        this.rotPoints = [
            BABYLON.Quaternion.Identity(),
            BABYLON.Quaternion.Identity(),
            BABYLON.Quaternion.Identity(),
            //new BABYLON.Quaternion(0.92,0.38,0.0,0.0),  // (45,0,0)
            BABYLON.Quaternion.Identity()];
        // set bezier points
        this.points = [
            new BABYLON.Vector3(startPos.x, startPos.y, startPos.z),
            new BABYLON.Vector3(startPos.x, startPos.y, startPos.z + ((14 / 3) * 1)),
            new BABYLON.Vector3(startPos.x, startPos.y, startPos.z + ((14 / 3) * 2)),
            new BABYLON.Vector3(startPos.x, startPos.y, startPos.z + 14)];
        // draw lane
        var curve = BABYLON.Curve3.CreateCubicBezier(this.points[0], this.points[1], this.points[2], this.points[3], 20);
        var cubicBezierCurve = BABYLON.Mesh.CreateLines("cbezier", curve.getPoints(), scene);
        cubicBezierCurve.color = new BABYLON.Color3(1, 0, .5);
        cubicBezierCurve.isVisible = false;
        /*
        / draw lines for debugging
        for (let i = 0; i < this.points.length; i++) {
            let drawPoists:BABYLON.Vector3;
            let drawPoints:BABYLON.Vector3[] = [];
            drawPoints[0] = this.points[i];
            drawPoints[1] = drawPoints[0].add(new BABYLON.Vector3(0,4,0));
            let cubicBezierCurve: BABYLON.LinesMesh = BABYLON.Mesh.CreateLines("up vectors bezier", drawPoints, scene);
            cubicBezierCurve.color = new BABYLON.Color3(0, 1, 1);
        }
        //draw lane up
        for (let i = 0; i < 10; i++) {
            let tLine:number = i*0.1;
            let drawPoints:BABYLON.Vector3[] = [];
            drawPoints[0] = this.getPointAtT(tLine);
            drawPoints[1] = drawPoints[0];
            console.log(tLine);
            drawPoints[1] = drawPoints[0].add(this.upVector(tLine));
            let cubicBezierCurve: BABYLON.LinesMesh = BABYLON.Mesh.CreateLines("up vectors bezier", drawPoints, scene);
            cubicBezierCurve.color = new BABYLON.Color3(0, 1, 1);
        }
        
        //draw lane right
        for (let i = 0; i < 10; i++) {
            let tLine:number = i*0.1;
            let drawPoints:BABYLON.Vector3[] = [];
            drawPoints[0] = this.getPointAtT(tLine);
            drawPoints[1] = drawPoints[0];
            console.log(tLine);
            drawPoints[1] = drawPoints[0].add(this.vectorToLineRotationMatrix(tLine,new BABYLON.Vector3(1,0,0)));
            let cubicBezierCurve: BABYLON.LinesMesh = BABYLON.Mesh.CreateLines("up vectors bezier", drawPoints, scene);
            cubicBezierCurve.color = new BABYLON.Color3(0, 1, 0);
        }
        */
        //var continued = cubicBezierVectors.continue(cubicBezierVectors);
    }
    /**
     * returns the end distance of the lane
     * @returns end distance of the lane
     */
    ComponentStraightLane.prototype.getEndT = function () {
        return this._startT + 14;
    };
    /**
     * returnes a distance at interpolation value(t)
     * @param t interpolation value
     * @returnes distance at interpolation
     */
    ComponentStraightLane.prototype.getDistanceAtT = function (t) {
        return this._startT + (this.getLaneLength() * t);
    };
    /**
     * returnes the length of this lane
     * @returns the length of this lane
     */
    ComponentStraightLane.prototype.getLaneLength = function () {
        return 14;
    };
    /**
     * returnes a position at interpolation value(t)
     * @param t interpolation value
     * @returnes position at interpolation
     */
    ComponentStraightLane.prototype.getPointAtT = function (t) {
        return Utils.Bezier.GetPoint(this.points[0], this.points[1], this.points[2], this.points[3], t);
    };
    /**
     * returnes a rotation at interpolation value(t)
     * @param t interpolation value
     * @returnes rotation at interpolation
     */
    ComponentStraightLane.prototype.getRotationAtT = function (t) {
        return Utils.Bezier.GetPointRotation(this.rotPoints[0], this.rotPoints[1], this.rotPoints[2], this.rotPoints[3], t);
    };
    /**
     * returnes a forwared vector at interpolation value(t)
     * @param t interpolation value
     * @returnes forwared vector at interpolation
     */
    ComponentStraightLane.prototype.forwaredVector = function (t) {
        var m = new BABYLON.Matrix();
        this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(this._forwared, m);
    };
    /**
     * returnes a upwards vector at interpolation value(t)
     * @param t interpolation value
     * @returnes upwards vector at interpolation
     */
    ComponentStraightLane.prototype.upVector = function (t) {
        var m = new BABYLON.Matrix();
        this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(this._up, m);
    };
    /**
     * returnes a rotation matrix at interpolation value(t)
     * @param t interpolation value
     * @returnes rotation matrix at interpolation
     */
    ComponentStraightLane.prototype.vectorToLineRotationMatrix = function (t, v) {
        var m = new BABYLON.Matrix();
        this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(v, m);
    };
    return ComponentStraightLane;
}(ComponentLaneBase));
//# sourceMappingURL=componentStraightLane.js.map