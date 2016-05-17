/**
 * GameUI
 */
class GameUI {

    context2D;
    playerManager: PlayerManager;
    myMaterial_diffuseTexture: BABYLON.DynamicTexture;
    box: BABYLON.Mesh;
    canvas: HTMLCanvasElement;

    constructor(scene: BABYLON.Scene, playerManager: PlayerManager, ecs: ECS.Engine, canvas:HTMLCanvasElement) {
        this.playerManager = playerManager;
        this.canvas = canvas;

        //Adding light for UI elements
        var UIlight = new BABYLON.DirectionalLight("UIemit", new BABYLON.Vector3(0, 0, 1), scene);
        UIlight.includeOnlyWithLayerMask = 0x20000000;
        var tempLight = new BABYLON.DirectionalLight("UIemit", new BABYLON.Vector3(0, 0, 1), scene);

        // create UIcamera entity
        let cameraECS = ecs.createEntity();
        let cameraTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.005, 0.005, 0.005));
        cameraECS.addComponent(cameraTranslateComponent);
        let UICam = new ComponentCamera(cameraTranslateComponent, scene);
        UICam.setLayermask = 0x20000000;
        cameraECS.addComponent(UICam);

        //Adding UI Test Element Material
        var material = new BABYLON.StandardMaterial("textuare1", scene);
        material.alpha = 1;

        material.diffuseColor = new BABYLON.Color3(1.00, 1.00, 1.00);

        this.myMaterial_diffuseTexture = new BABYLON.DynamicTexture('ScoreTex', 512, scene, true);
        this.myMaterial_diffuseTexture.hasAlpha = true;
        material.diffuseTexture = this.myMaterial_diffuseTexture;

        //Adding UI Test Element
        this.box = BABYLON.Mesh.CreatePlane("Box", 5, scene, false);
        this.box.material = material;
        this.box.scaling = new BABYLON.Vector3((10*canvas.width)/1842,(10*canvas.width)/1842, 1);
        this.box.position = new BABYLON.Vector3((-53*canvas.width)/1842, (-30*canvas.height)/1019, 100);


        this.box.layerMask = 0x20000000;

        this.context2D = this.myMaterial_diffuseTexture.getContext();
    }
    
    rescale():void{
        this.box.scaling = new BABYLON.Vector3((10*this.canvas.width)/1842,(10*this.canvas.width)/1842, 1);
        this.box.position = new BABYLON.Vector3((-53*this.canvas.width)/1842, (-30*this.canvas.height)/1019, 100);
    }

    update(): void {
        this.context2D.clearRect(0, 0, 512, 512);
        this.myMaterial_diffuseTexture.drawText("Score:" + this.playerManager.getplayerT(), 10, 360, "100px Arial", "white", "transparent");
    }
}