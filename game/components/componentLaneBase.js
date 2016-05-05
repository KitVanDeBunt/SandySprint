var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * ComponentLaneBase
 */
var ComponentLaneBase = (function (_super) {
    __extends(ComponentLaneBase, _super);
    function ComponentLaneBase(componentAbstractMesh, startT) {
        _super.call(this);
        this.leftLaneAvalable = false;
        this.rightLaneAvalable = false;
        this.nextLaneAvalable = false;
        this.startT = startT;
    }
    Object.defineProperty(ComponentLaneBase.prototype, "getStartT", {
        /**
         * Returns the start interpontation(t) of the lane.
         * @returns start interpontation(t)
         */
        get: function () {
            return this.startT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "getRightLaneAvalable", {
        get: function () {
            return this.rightLaneAvalable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "getLeftLaneAvalable", {
        get: function () {
            return this.leftLaneAvalable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "getNextLaneAvalable", {
        get: function () {
            return this.nextLaneAvalable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "setRightLane", {
        set: function (lane) {
            this.rightLane = lane;
            this.rightLaneAvalable = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "getRightLane", {
        get: function () {
            return this.rightLane;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "setLeftLane", {
        set: function (lane) {
            this.leftLane = lane;
            this.leftLaneAvalable = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "getLeftLane", {
        get: function () {
            return this.leftLane;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "setNextLane", {
        set: function (lane) {
            this.nextLane = lane;
            this.nextLaneAvalable = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentLaneBase.prototype, "getNextLane", {
        get: function () {
            return this.nextLane;
        },
        enumerable: true,
        configurable: true
    });
    return ComponentLaneBase;
}(ECS.Component));
//# sourceMappingURL=componentLaneBase.js.map