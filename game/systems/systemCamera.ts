
/**
 * SystemMeshRender
 */
class SystemCamera extends ECS.System {

    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        super();

        // get needed component types
        this.neededComponents[0] = new ECS.ComponentTransform(null, null).componentType();
        this.neededComponents[1] = new ComponentCamera(null, null).componentType();
        
        this.canvas = canvas;
    }

    Update<T extends ECS.Entity>(entities: T[]) {
        for (let i = 0; i < entities.length; i++) {
            if (this.checkCompatibleEntity(entities[i])) {
                // update
                let componentTransform: ECS.ComponentTransform = <ECS.ComponentTransform>entities[i].getComponent(this.neededComponents[0]);
                let componentCamera: ComponentCamera = <ComponentCamera>entities[i].getComponent(this.neededComponents[1]);

                if (componentCamera.state == ComponentCameraState.None) {
                    let cam: BABYLON.FreeCamera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 0.5, -1.5), componentCamera.getScene);
                    // attach the camera to the canvas
                    cam.attachControl(this.canvas, false);
                    componentCamera.setCamera = cam;
                    cam.cameraRotation = new BABYLON.Vector2(0.03, 0);
                    //cam.position = new BABYLON.Vector3(0,0,0);
                    componentCamera.state = ComponentCameraState.Spawned;
                }
            }
        }
    }

    returnTypeOfSystem(): string {
        return "TYPE_SYSTEM_CAMERA";
    }

    newOfThis(): SystemCamera {
        return new SystemCamera(this.canvas);
    }
}
