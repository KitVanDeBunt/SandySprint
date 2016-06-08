/**
 * ComponentJumpLane
 * Creates an extra curve to make the player jump.
 */
class ComponentJumpLane extends ComponentLaneBase {

    private _forward: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 1);
    private _up: BABYLON.Vector3 = new BABYLON.Vector3(0, 1, 0);
    jumping: boolean = false;
    private _T: number = 0;

    points: BABYLON.Vector3[];

    rotPoints: BABYLON.Quaternion[] = [
        BABYLON.Quaternion.Identity(),
        BABYLON.Quaternion.Identity(),
        BABYLON.Quaternion.Identity(),
        BABYLON.Quaternion.Identity()];


    /**
     * @param componentAbstractMesh the componentAbstractMesh attached to the player, containing the player mesh.
     * @param startDirection direction that the player is going.
     * @param scene the scene of the game.
     * @param startT the position of the player when the jump starts.
     */
    constructor(componentAbstractMesh: ECS.ComponentAbstractMesh, startDirection: BABYLON.Vector3, scene: BABYLON.Scene, startT: number) {
        super(componentAbstractMesh, startT);

        // set bezier points
        this.points = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(0, 2, 0),
            new BABYLON.Vector3(0, 0, 0)];

        // draw lane
        let curve: BABYLON.Curve3 = BABYLON.Curve3.CreateCubicBezier(this.points[0], this.points[1], this.points[2], this.points[3], 20);
        let cubicBezierCurve: BABYLON.LinesMesh = BABYLON.Mesh.CreateLines("cbezier", curve.getPoints(), scene);
        cubicBezierCurve.color = new BABYLON.Color3(1, 0, .5);
        cubicBezierCurve.isVisible = false;
    }

    /**
     * player jumps.
     * @param playerT current position on the bezier curve.
     */
    jump(playerT: number): void {
        this.jumping = true;
        this._T = playerT;
    }

    getEndT(): number {
        return this._T + 14;
    }

    getDistanceAtT(t: number): number {
        return 0;
    }

    getT(): number {
        return this._T;
    }
    getLaneLength(): number {
        return 14;
    }

    getPointAtT(t: number): BABYLON.Vector3 {
        return Utils.Bezier.GetPoint(this.points[0], this.points[1], this.points[2], this.points[3], t);
    }

    getRotationAtT(t: number): BABYLON.Quaternion {
        return Utils.Bezier.GetPointRotation(this.rotPoints[0], this.rotPoints[1], this.rotPoints[2], this.rotPoints[3], t);
    }

    forwaredVector(t: number): BABYLON.Vector3 {
        var m = new BABYLON.Matrix();
        this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(this._forward, m);
    }

    upVector(t: number): BABYLON.Vector3 {
        var m = new BABYLON.Matrix();
        this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(this._up, m);
    }

    vectorToLineRotationMatrix(t: number, v: BABYLON.Vector3) {
        var m = new BABYLON.Matrix();
        this.getRotationAtT(t).toRotationMatrix(m);
        return BABYLON.Vector3.TransformCoordinates(v, m);
    }
}