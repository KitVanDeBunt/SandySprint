
/**
 * SystemMeshRender
 * creates and updates componentCameras
 */
class SystemCamera extends ECS.System {

    private _canvas: HTMLCanvasElement;
    // for debuging
    private _followPlayer: boolean = true;

    /** 
     * @param canvas the canvas that the game is being displayed on.
     */
    constructor(canvas: HTMLCanvasElement) {
        super();

        // get needed component types
        this.neededComponents[0] = new ECS.ComponentTransform(null, null, null).componentType();
        this.neededComponents[1] = new ComponentCamera(null, null).componentType();

        this._canvas = canvas;
    }

    /**
     * Updates every componentCamera.
     * @param entities entitys system updates
     */
    Update<T extends ECS.Entity>(entities: T[]) {
        for (let i = 0; i < entities.length; i++) {
            if (this.checkCompatibleEntity(entities[i])) {
                // update
                let componentTransform: ECS.ComponentTransform = <ECS.ComponentTransform>entities[i].getComponent(this.neededComponents[0]);
                let componentCamera: ComponentCamera = <ComponentCamera>entities[i].getComponent(this.neededComponents[1]);
                switch (componentCamera.state) {

                    case ComponentCameraState.None:
                        // create camera and push it to the scene
                        let newCam: BABYLON.FreeCamera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 0.5, -1.5), componentCamera.getScene);
                        componentCamera.getScene.activeCameras.push(newCam);

                        // attach control if it does not follow
                        if (!this._followPlayer) {
                            newCam.attachControl(this._canvas, false);
                        }

                        componentCamera.setCamera = newCam;

                        //checks if it is a UI camera or not.
                        if (componentCamera.getLayermask != 0) {
                            newCam.layerMask = 0x20000000;
                            newCam.position = new BABYLON.Vector3(0, 0, -1);
                            newCam.setTarget(BABYLON.Vector3.Zero());
                            newCam.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
                            componentCamera.state = ComponentCameraState.Menu;
                        }
                        else {
                            newCam.cameraRotation = new BABYLON.Vector2(0.03, 0);
                            componentCamera.state = ComponentCameraState.Spawned;
                        }
                        componentCamera.state = ComponentCameraState.Spawned;

                        break;
                    case ComponentCameraState.Spawned:
                        if (this._followPlayer) {
                            // update camera position
                            componentCamera.getCamera.position = componentTransform.getPosition.add(new BABYLON.Vector3(0, 0.5, -1.5));
                        }
                        break;
                    case ComponentCameraState.Menu:
                        break;
                    default:
                        break;
                }
            }
        }
    }

    /**
     * @returns returns name of system as a string
     */
    returnTypeOfSystem(): string {
        return "TYPE_SYSTEM_CAMERA";
    }

    /**
     * returns new instance of SystemCamera
     */
    newOfThis(): SystemCamera {
        return new SystemCamera(this._canvas);
    }
}
