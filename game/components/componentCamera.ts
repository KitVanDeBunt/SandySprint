/**
 * ComponentCamera
 * A component that contains a camera.
 * Managed by SystemCamera.
 */
class ComponentCamera extends ECS.Component {

    state: ComponentCameraState;
    private _camera: BABYLON.FreeCamera;
    private _scene: BABYLON.Scene;
    private _layer: number = 0;

    /**
     * @param transformComponent the ComponentTransform attached to the entity.
     * @param scene the scene of the game.
     */
    constructor(transformComponent: ECS.ComponentTransform, scene: BABYLON.Scene) {
        super();
        this.state = ComponentCameraState.None;
        this._scene = scene;
    }

    public get getScene(): BABYLON.Scene {
        return this._scene;
    }

    public get getCamera(): BABYLON.FreeCamera {
        return this._camera;
    }
    
    public get getLayermask() : number {
        return this._layer;
    }

    public set setCamera(camera: BABYLON.FreeCamera) {
        this._camera = camera;
    }
    
    public set setLayermask(layer: number) {
        this._layer = layer;   
    }
}

enum ComponentCameraState {
    None,
    Menu,
    Spawned
}