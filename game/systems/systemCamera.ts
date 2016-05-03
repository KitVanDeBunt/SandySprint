
/**
 * SystemMeshRender
 */
class SystemCamera extends ECS.System {

    constructor() {
        super();
       
        // get needed component types
        this.neededComponents[0] = new ECS.ComponentTransform(null,null).componentType();
        this.neededComponents[1] = new ComponentCamera(null,null).componentType();
    }

    Update<T extends ECS.Entity>(entities: T[]) {
        for (let i = 0; i < entities.length; i++) {
            let updateAbleEntity: boolean = true;
            for (let j = 0; j < this.neededComponents.length; j++) {
                let neededComponentFound: boolean = false;
                for (let k = 0; k < entities[i].getComponentTypes.length; k++) {
                    if (entities[i].getComponentTypes[k] == this.neededComponents[j]) {
                        neededComponentFound = true;
                        break;
                    };
                }
                if (!neededComponentFound) {
                    updateAbleEntity = false;
                    break;
                }
            }
            if (updateAbleEntity) {
                // update
                let componentTransform : ECS.ComponentTransform = <ECS.ComponentTransform>entities[i].getComponent(this.neededComponents[0]);
                let componentCamera: ComponentCamera = <ComponentCamera>entities[i].getComponent(this.neededComponents[1]);
                
                if(componentCamera.state == ComponentCameraState.None){
                    let cam:BABYLON.FreeCamera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 20, -50), componentCamera.getScene);
                    componentCamera.setCamera = cam;
                    
                    //componentCamera.getCamera. = new BABYLON.Vector3(0,0,-100);
                    componentCamera.state = ComponentCameraState.Spawned;
                    
                }
                
            }
        }
    }

    returnTypeOfSystem(): string {
        return "TYPE_SYSTEM_CAMERA";
    }

    newOfThis(): SystemCamera {
        return new SystemCamera();
    }
}
