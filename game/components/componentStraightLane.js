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
    function ComponentStraightLane(componentAbstractMesh) {
        _super.call(this, componentAbstractMesh);
        this.forwared = new BABYLON.Vector3(0, 0, 1);
        this.up = new BABYLON.Vector3(0, 0, 1);
    }
    ComponentStraightLane.prototype.forwaredVector = function () {
        return this.forwared;
    };
    ComponentStraightLane.prototype.upVector = function () {
        return this.up;
    };
    return ComponentStraightLane;
}(ComponentLaneBase));
//# sourceMappingURL=componentStraightLane.js.map