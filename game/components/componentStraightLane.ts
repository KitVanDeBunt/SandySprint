/**
 * ComponentStraightLane
 */
class ComponentStraightLane extends ComponentLaneBase {
    
    private forwared : BABYLON.Vector3 = new BABYLON.Vector3(0,0,1);
    private up : BABYLON.Vector3 = new BABYLON.Vector3(0,0,1);
    
    constructor(componentAbstractMesh: ECS.ComponentAbstractMesh) {
        super(componentAbstractMesh)
    }
    
    forwaredVector() :BABYLON.Vector3{
        return this.forwared;
    }
    
    upVector() :BABYLON.Vector3{
        return this.up;
    }
}