/**
 * ComponentJumpLane
 */
class ComponentJumpLane extends ComponentLaneBase {

    private forwared: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 1);
    private up: BABYLON.Vector3 = new BABYLON.Vector3(0, 1, 0);
    jumping: boolean = false;
    private T:number=0;

    points: BABYLON.Vector3[];

    rotPoints: BABYLON.Quaternion[] = [
        BABYLON.Quaternion.Identity(),
        BABYLON.Quaternion.Identity(),
        BABYLON.Quaternion.Identity(),
        //new BABYLON.Quaternion(0.92,0.38,0.0,0.0),  // (45,0,0)
        BABYLON.Quaternion.Identity()];


    constructor(componentAbstractMesh: ECS.ComponentAbstractMesh, startDirection: BABYLON.Vector3, scene:BABYLON.Scene, startT:number) {
        super(componentAbstractMesh,startT);
        
        // set bezier points
        this.points = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(0, 2, 0),
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(0, 0, 0)];
        
        // draw lane
        let curve:BABYLON.Curve3 = BABYLON.Curve3.CreateCubicBezier(this.points[0], this.points[1], this.points[2], this.points[3],20);
        let cubicBezierCurve: BABYLON.LinesMesh = BABYLON.Mesh.CreateLines("cbezier", curve.getPoints(), scene);
        cubicBezierCurve.color = new BABYLON.Color3(1, 0, .5);
        cubicBezierCurve.isVisible = false;
    }
    
    jump (playerT:number):void{
        this.jumping = true;
        this.T = playerT;
    }
    
    done ():void{
        this.jumping = false;
    }
    
    getEndT ():number{
        return this.T+14;
    }
    
    getT():number{
        return this.T;
    }
    
    getLaneLength ():number{
        return 14;
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
    
    vectorToLineRotationMatrix(t:number,v:BABYLON.Vector3){
        var m = new BABYLON.Matrix();
	    this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(v,m);
    }
}