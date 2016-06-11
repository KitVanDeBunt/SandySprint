/**
 * ComponentStraightLane
 */
class ComponentStraightLane extends ComponentLaneBase {

    private forwared: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 1);
    private up: BABYLON.Vector3 = new BABYLON.Vector3(0, 1, 0);

    points: BABYLON.Vector3[];

    rotPoints: BABYLON.Quaternion[] = [
        BABYLON.Quaternion.Identity(),
        BABYLON.Quaternion.Identity(),
        BABYLON.Quaternion.Identity(),
        //new BABYLON.Quaternion(0.92,0.38,0.0,0.0),  // (45,0,0)
        BABYLON.Quaternion.Identity()];

    constructor(componentAbstractMesh: ECS.ComponentAbstractMesh, startPos: BABYLON.Vector3, startDirection: BABYLON.Vector3, scene:BABYLON.Scene, startT:number) {
        super(componentAbstractMesh,startT);
        
        // set bezier points
        this.points = [
        new BABYLON.Vector3(startPos.x, startPos.y, startPos.z),
        new BABYLON.Vector3(startPos.x, startPos.y, startPos.z+((14 / 3) * 1)),
        //new BABYLON.Vector3(startPos.x, startPos.y-1, startPos.z+(14 / 3) * 1),
        new BABYLON.Vector3(startPos.x, startPos.y, startPos.z+((14 / 3) * 2)),
        //new BABYLON.Vector3(startPos.x, startPos.y+1, startPos.z+((14 / 3) * 2)),
        new BABYLON.Vector3(startPos.x, startPos.y, startPos.z+14)];
        
        // draw lane
        let curve:BABYLON.Curve3 = BABYLON.Curve3.CreateCubicBezier(this.points[0], this.points[1], this.points[2], this.points[3],20);
        let cubicBezierCurve: BABYLON.LinesMesh = BABYLON.Mesh.CreateLines("cbezier", curve.getPoints(), scene);
        cubicBezierCurve.color = new BABYLON.Color3(1, 0, .5);
        cubicBezierCurve.isVisible = false;
        
        for (let i = 0; i < this.points.length; i++) {
            let drawPoists:BABYLON.Vector3;
            let drawPoints:BABYLON.Vector3[] = [];
            drawPoints[0] = this.points[i];
            drawPoints[1] = drawPoints[0].add(new BABYLON.Vector3(0,4,0));
            let cubicBezierCurve: BABYLON.LinesMesh = BABYLON.Mesh.CreateLines("up vectors bezier", drawPoints, scene);
            cubicBezierCurve.color = new BABYLON.Color3(0, 1, 1);
        }
        
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
    
    /**
     * returns the end distance of the lane
     */
    getEndT ():number{
        return this.startT+14;
    }
    
    /**
     * returnes a distance at interpolation value(t)
     * @param t interpolation value
     * @returnes distance at interpolation
     */
    getDistanceAtT (t:number):number{
        return this.startT+(this.getLaneLength()*t);
    }
    
    /**
     * returnes the length of this lane
     * @returns the length of this lane
     */
    getLaneLength ():number{
        return 14;
    }
    
    /**
     * returnes a position at interpolation value(t)
     * @param t interpolation value
     * @returnes position at interpolation
     */
    getPointAtT(t: number): BABYLON.Vector3 {
        return Utils.Bezier.GetPoint(this.points[0], this.points[1], this.points[2], this.points[3], t);
    }
    
    /**
     * returnes a rotation at interpolation value(t)
     * @param t interpolation value
     * @returnes rotation at interpolation
     */
    getRotationAtT(t: number): BABYLON.Quaternion {
        return Utils.Bezier.GetPointRotation(this.rotPoints[0], this.rotPoints[1], this.rotPoints[2], this.rotPoints[3], t);
    }

    /**
     * returnes a forwared vector at interpolation value(t)
     * @param t interpolation value
     * @returnes forwared vector at interpolation
     */
    forwaredVector(t:number): BABYLON.Vector3 {
        var m = new BABYLON.Matrix();
	    this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(this.forwared,m);
    }

    /**
     * returnes a upwards vector at interpolation value(t)
     * @param t interpolation value
     * @returnes upwards vector at interpolation
     */
    upVector(t:number): BABYLON.Vector3 {
        var m = new BABYLON.Matrix();
	    this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(this.up,m);
    }
    
    vectorToLineRotationMatrix(t:number,v:BABYLON.Vector3){
        var m = new BABYLON.Matrix();
	    this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(v,m);
    }
}