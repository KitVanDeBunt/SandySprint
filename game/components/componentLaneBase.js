var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Base class of road lanes
 */
var ComponentLaneBase = (function (_super) {
    __extends(ComponentLaneBase, _super);
    /**
     * @param componentAbstractMesh
     */
    function ComponentLaneBase(startT) {
        _super.call(this);
        this._leftLaneAvalable = false;
        this._rightLaneAvalable = false;
        this._nextLaneAvalable = false;
        this._startT = startT;
    }
    Object.defineProperty(ComponentLaneBase.prototype, "getStartT", {
        /**
         * Returns the start interpontation(t) of the lane.
         * @returns start interpontation(t)
         */
        get: function () {
            return this._startT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "getRightLaneAvalable", {
        get: function () {
            return this._rightLaneAvalable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "getLeftLaneAvalable", {
        get: function () {
            return this._leftLaneAvalable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "getNextLaneAvalable", {
        get: function () {
            return this._nextLaneAvalable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "setRightLane", {
        set: function (lane) {
            this._rightLane = lane;
            this._rightLaneAvalable = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "getRightLane", {
        get: function () {
            return this._rightLane;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "setLeftLane", {
        set: function (lane) {
            this._leftLane = lane;
            this._leftLaneAvalable = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "getLeftLane", {
        get: function () {
            return this._leftLane;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "setNextLane", {
        set: function (lane) {
            this._nextLane = lane;
            this._nextLaneAvalable = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "getNextLane", {
        get: function () {
            return this._nextLane;
        },
        enumerable: true,
        configurable: true
    });
    return ComponentLaneBase;
}(ECS.Component));
//# sourceMappingURL=componentLaneBase.js.map