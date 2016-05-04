/**
 * ComponentStraightLane
 */
class ComponentStraightLane extends ComponentLaneBase {

    private forwared: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 1);
    private up: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 1);

    points: BABYLON.Vector3[];

    rotPoints: BABYLON.Quaternion[] = [
        BABYLON.Quaternion.Identity(),
        BABYLON.Quaternion.Identity(),
        BABYLON.Quaternion.Identity(),
        BABYLON.Quaternion.Identity()];

    constructor(componentAbstractMesh: ECS.ComponentAbstractMesh, startPos: BABYLON.Vector3, startDirection: BABYLON.Vector3, scene:BABYLON.Scene) {
        super(componentAbstractMesh);
        
        // set bezier points
        this.points = [
        new BABYLON.Vector3(0, 0, startPos.z),
        new BABYLON.Vector3(0, 0, startPos.z+(14 / 3) * 1),
        new BABYLON.Vector3(0, 0, startPos.z+((14 / 3) * 2)),
        new BABYLON.Vector3(0, 0, startPos.z+14)];
        
        // draw
        let curve:BABYLON.Curve3 = BABYLON.Curve3.CreateCubicBezier(this.points[0], this.points[1], this.points[2], this.points[3],20);
        var cubicBezierCurve = BABYLON.Mesh.CreateLines("cbezier", curve.getPoints(), scene);
        cubicBezierCurve.color = new BABYLON.Color3(1, 0, .5);
        //var continued = cubicBezierVectors.continue(cubicBezierVectors);
    }

    getPointAtT(t: number): BABYLON.Vector3 {
        return Utils.Bezier.GetPoint(this.points[0], this.points[1], this.points[2], this.points[3], t);
    }
    
    getRotationAtT(t: number): BABYLON.Quaternion {
        return Utils.Bezier.GetPointRotation(this.rotPoints[0], this.rotPoints[1], this.rotPoints[2], this.rotPoints[3], t);
    }

    forwaredVector(t:number): BABYLON.Vector3 {
        var m = new BABYLON.Matrix();
	    this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(this.forwared,m);
    }

    upVector(t:number): BABYLON.Vector3 {
        var m = new BABYLON.Matrix();
	    this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(this.up,m);
    }
}