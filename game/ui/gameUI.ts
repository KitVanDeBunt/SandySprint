/**
 * GameUI
 */
class GameUI {

    context2D;
    playerManager: PlayerManager;
    myMaterial_diffuseTexture: BABYLON.DynamicTexture;
    box: BABYLON.Mesh;
    canvas: HTMLCanvasElement;

    constructor(scene: BABYLON.Scene, playerManager: PlayerManager, ecs: ECS.Engine, canvas: HTMLCanvasElement) {
        this.playerManager = playerManager;
        this.canvas = canvas;

        //Adding light for UI elements
        var UIlight = new BABYLON.DirectionalLight("UIemit", new BABYLON.Vector3(0, 0, 1), scene);
        UIlight.includeOnlyWithLayerMask = 0x20000000;
        var tempLight = new BABYLON.DirectionalLight("UIemit", new BABYLON.Vector3(0, 0, 1), scene);

        // create UIcamera entity
        let cameraECS = ecs.createEntity();
        let cameraTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.005, 0.005, 0.005), new BABYLON.Quaternion(0, 0, 0, 0));
        cameraECS.addComponent(cameraTranslateComponent);
        let UICam = new ComponentCamera(cameraTranslateComponent, scene);

        UICam.setLayermask = 0x20000000;
        cameraECS.addComponent(UICam);
        //   UICam.getCamera.setTarget(new BABYLON.Vector3(0,0,100));

        //Adding UI Element Material
        var material = new BABYLON.StandardMaterial("textuare1", scene);
        material.alpha = 1;

        material.diffuseColor = new BABYLON.Color3(1.00, 1.00, 1.00);

        this.myMaterial_diffuseTexture = new BABYLON.DynamicTexture('ScoreTex', 512, scene, true);
        this.myMaterial_diffuseTexture.hasAlpha = true;
        material.diffuseTexture = this.myMaterial_diffuseTexture;

        //Adding UI Element
        this.box = BABYLON.Mesh.CreatePlane("Box", 5, scene, false);
        this.box.material = material;
        if (screen.width > screen.height) {
            this.box.scaling = new BABYLON.Vector3(400, 400, 1);
            this.box.position = new BABYLON.Vector3(-2500, 2500, 5600);
        }
        else {
            this.box.scaling = new BABYLON.Vector3(800, 800, 1);
            this.box.position = new BABYLON.Vector3(0, 0, 8000);
        }
        this.box.layerMask = 0x20000000;

        this.context2D = this.myMaterial_diffuseTexture.getContext();
    }

    rescale(): void {
        if (screen.width > screen.height) {
            this.box.scaling = new BABYLON.Vector3(400, 400, 1);
            this.box.position = new BABYLON.Vector3(-2500, 2500, 5600);
        }
        else {
            this.box.scaling = new BABYLON.Vector3(800, 800, 1);
            this.box.position = new BABYLON.Vector3(0, 0,8000);
        }
    }

    onTouchStart(touchEvt: TouchEvent) {

    }

    onTouchEnd(touchEvt: TouchEvent) {

    }

    onTouchMove(touchEvt: TouchEvent) {

    }

    update(): void {
        this.context2D.clearRect(0, 0, 512, 512);
        this.myMaterial_diffuseTexture.drawText("Score:" + Math.round(this.playerManager.getplayerT()), 0, 400, "60px Arial", "white", "transparent");
    }
}