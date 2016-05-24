/**
 * ComponentLaneBase
 */
abstract class ComponentLaneBase extends ECS.Component {

    private leftLaneAvalable: boolean = false;
    private rightLaneAvalable: boolean = false;
    private nextLaneAvalable: boolean = false;
    private leftLane: ComponentLaneBase;
    private rightLane: ComponentLaneBase;
    private nextLane: ComponentLaneBase;
    protected startT: number;
    private endT: number;

    protected componentAbstractMesh: ECS.ComponentAbstractMesh;

    constructor(componentAbstractMesh: ECS.ComponentAbstractMesh, startT: number) {
        super();
        this.startT = startT;
    }

    /**
     * Returns the start interpontation(t) of the lane.
     * @returns start interpontation(t)
     */
    get getStartT(): number {
        return this.startT;
    }

    get getRightLaneAvalable(): boolean {
        return this.rightLaneAvalable;
    }

    get getLeftLaneAvalable(): boolean {
        return this.leftLaneAvalable;
    }

    get getNextLaneAvalable(): boolean {
        return this.nextLaneAvalable;
    }

    set setRightLane(lane: ComponentLaneBase) {
        this.rightLane = lane;
        this.rightLaneAvalable = true;
    }

    get getRightLane(): ComponentLaneBase {
        return this.rightLane;
    }

    set setLeftLane(lane: ComponentLaneBase) {
        this.leftLane = lane;
        this.leftLaneAvalable = true;
    }

    get getLeftLane(): ComponentLaneBase {
        return this.leftLane;
    }

    set setNextLane(lane: ComponentLaneBase) {
        this.nextLane = lane;
        this.nextLaneAvalable = true;
    }

    get getNextLane(): ComponentLaneBase {
        return this.nextLane;
    }

    /**
     * Returns the end interpontation(t) of the lane.
     * @returns end interpontation(t) of the lane
     */
    abstract getEndT(): number;

    /**
     * returns te distance tranvled of the onteroplation value of 't'
     * @param t interpolation value between 0 and 1
     * @returns distance travled
     */
    abstract getDistanceAtT(t: number): number;

    abstract getLaneLength(): number;

    abstract getPointAtT(t: number): BABYLON.Vector3;

    abstract getRotationAtT(t: number): BABYLON.Quaternion;

    abstract forwaredVector(float): BABYLON.Vector3;

    abstract upVector(float): BABYLON.Vector3;
}