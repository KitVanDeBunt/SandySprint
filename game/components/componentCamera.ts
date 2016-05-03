/**
 * ComponentCamera
 */
class ComponentCamera extends ECS.Component {

    state: ComponentCameraState;
    private camera: BABYLON.FreeCamera;
    private scene: BABYLON.Scene;

    constructor(transformComponent: ECS.ComponentTransform, scene: BABYLON.Scene) {
        super();
        this.state = ComponentCameraState.None;
        this.scene = scene;
    }

    public get getScene(): BABYLON.Scene {
        return this.scene;
    }

    public get getCamera(): BABYLON.FreeCamera {
        return this.camera;
    }

    public set setCamera(camera: BABYLON.FreeCamera) {
        this.camera = camera;
    }
}

enum ComponentCameraState {
    None,
    Spawned
}