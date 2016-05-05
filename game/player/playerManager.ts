/**
 * PlayerManager
 */
class PlayerManager {

    player: ECS.Entity;
    playerTranslateComponent: ECS.ComponentTransform;

    constructor(scene: BABYLON.Scene, ECSengine: ECS.Engine) {
        this.player = ECSengine.createEntity();
        this.playerTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.004, 0.004, 0.004));
        this.player.addComponent(this.playerTranslateComponent);
        let playerMeshComponent = new ECS.ComponentAbstractMesh(this.playerTranslateComponent, "assets/models/", "Matthew_Full.babylon");
        this.player.addComponent(playerMeshComponent);
        this.playerTranslateComponent.setPosition = this.playerTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 5));
        playerMeshComponent.meshRotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 2);
        playerMeshComponent.meshRotate(new BABYLON.Vector3(0, 0, 1), Math.PI);

        //playerTranslateComponent.setScale = new BABYLON.Vector3(0.1, 0.1, 0.1);
        console.log(this.playerTranslateComponent.getPosition);
        console.log("componentPosition instance type:" + this.playerTranslateComponent.componentType());
    }

    onKeyDown(keyEvent: KeyboardEvent): void {
        switch (keyEvent.keyCode) {
            case 68: //'D'
                //house.translate(new BABYLON.Vector3(0, 0, 1), 3.5);
                this.playerTranslateComponent.setPosition = this.playerTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 10));
                break;
            case 82: //'R'
                //house.rotate(BABYLON.Vector3.Up(), Math.PI / 4);
                this.playerTranslateComponent.setPosition = this.playerTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 10));
                break;
        }
    }

    update(deltaTime: number): void {

    }
}