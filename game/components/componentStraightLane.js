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
    function ComponentStraightLane(componentAbstractMesh, startPos, startDirection, scene, startT) {
        _super.call(this, componentAbstractMesh, startT);
        this.forwared = new BABYLON.Vector3(0, 0, 1);
        this.up = new BABYLON.Vector3(0, 1, 0);
        this.rotPoints = [
            BABYLON.Quaternion.Identity(),
            BABYLON.Quaternion.Identity(),
            BABYLON.Quaternion.Identity(),
            //new BABYLON.Quaternion(0.92,0.38,0.0,0.0),  // (45,0,0)
            BABYLON.Quaternion.Identity()];
        // set bezier points
        this.points = [
            new BABYLON.Vector3(startPos.x, startPos.y, startPos.z),
            //new BABYLON.Vector3(startPos.x, startPos.y, startPos.z+(14 / 3) * 1),
            new BABYLON.Vector3(startPos.x, startPos.y - 1, startPos.z + (14 / 3) * 1),
            //new BABYLON.Vector3(startPos.x, startPos.y, startPos.z+((14 / 3) * 2)),
            new BABYLON.Vector3(startPos.x, startPos.y + 1, startPos.z + ((14 / 3) * 2)),
            new BABYLON.Vector3(startPos.x, startPos.y, startPos.z + 14)];
        // draw lane
        var curve = BABYLON.Curve3.CreateCubicBezier(this.points[0], this.points[1], this.points[2], this.points[3], 20);
        var cubicBezierCurve = BABYLON.Mesh.CreateLines("cbezier", curve.getPoints(), scene);
        cubicBezierCurve.color = new BABYLON.Color3(1, 0, .5);
        /*
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
    ComponentStraightLane.prototype.getEndT = function () {
        return this.startT + 14;
    };
    ComponentStraightLane.prototype.getLaneLength = function () {
        return 14;
    };
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
    ComponentStraightLane.prototype.vectorToLineRotationMatrix = function (t, v) {
        var m = new BABYLON.Matrix();
        this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(v, m);
    };
    return ComponentStraightLane;
}(ComponentLaneBase));
//# sourceMappingURL=componentStraightLane.js.map