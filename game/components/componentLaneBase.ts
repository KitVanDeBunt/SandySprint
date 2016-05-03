/**
 * ComponentLaneBase
 */
abstract class ComponentLaneBase extends ECS.Component {
    
    protected componentAbstractMesh : ECS.ComponentAbstractMesh;
    
    constructor(componentAbstractMesh: ECS.ComponentAbstractMesh) {
        super();
    }
    
    abstract forwaredVector(float): BABYLON.Vector3;
    abstract upVector(float): BABYLON.Vector3;
}