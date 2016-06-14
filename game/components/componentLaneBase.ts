/**
 * Base class of road lanes
 */
abstract class ComponentLaneBase extends ECS.Component {

    private _leftLaneAvalable: boolean = false;
    private _rightLaneAvalable: boolean = false;
    private _nextLaneAvalable: boolean = false;
    private _leftLane: ComponentLaneBase;
    private _rightLane: ComponentLaneBase;
    private _nextLane: ComponentLaneBase;
    protected _startT: number;
    private _endT: number;

    /**
     * @param componentAbstractMesh 
     */
    constructor(startT: number) {
        super();
        this._startT = startT;
    }

    /**
     * Returns the start interpontation(t) of the lane.
     * @returns start interpontation(t)
     */
    get getStartT(): number {
        return this._startT;
    }

    get getRightLaneAvalable(): boolean {
        return this._rightLaneAvalable;
    }

    get getLeftLaneAvalable(): boolean {
        return this._leftLaneAvalable;
    }

    get getNextLaneAvalable(): boolean {
        return this._nextLaneAvalable;
    }

    set setRightLane(lane: ComponentLaneBase) {
        this._rightLane = lane;
        this._rightLaneAvalable = true;
    }

    get getRightLane(): ComponentLaneBase {
        return this._rightLane;
    }

    set setLeftLane(lane: ComponentLaneBase) {
        this._leftLane = lane;
        this._leftLaneAvalable = true;
    }

    get getLeftLane(): ComponentLaneBase {
        return this._leftLane;
    }

    set setNextLane(lane: ComponentLaneBase) {
        this._nextLane = lane;
        this._nextLaneAvalable = true;
    }

    get getNextLane(): ComponentLaneBase {
        return this._nextLane;
    }


    /**
     * Returns the end interpontation(t) of the lane.
     * @returns end interpontation(t) of the lane
     */
    abstract getEndT(): number;

    /**
     * returns the distance tranvled of the onteroplation value of 't'
     * @param t interpolation value between 0 and 1
     * @returns distance travled
     */
    abstract getDistanceAtT(t: number): number;

    /**
     * returns the lanes length
     * @returns the lanes length
     */
    abstract getLaneLength(): number;

    /**
     * returns a point on the curve for a given t
     * @param t interpolation number
     * @returns point on the curve
     */
    abstract getPointAtT(t: number): BABYLON.Vector3;


    /**
     * returns a rotation on the curve for a given t
     * @param t interpolation number
     * @returns rotation on the curve
     */
    abstract getRotationAtT(t: number): BABYLON.Quaternion;

    /**
     * returns a forwared vector on the curve for a given t
     * @param t interpolation number
     * @returns forwared vector on the curve
     */
    abstract forwaredVector(float): BABYLON.Vector3;

    /**
     * returns an up vector on the curve for a given t
     * @param t interpolation number
     * @returns an up vector on the curve
     */
    abstract upVector(float): BABYLON.Vector3;
}