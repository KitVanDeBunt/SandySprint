/**
 * PlayerManager
 */
var PlayerManager = (function () {
    function PlayerManager(scene, ECSengine, roadManager) {
        this.playerSpeed = 0.01;
        this.animationStarted = false;
        this.temp = 0;
        this.roadManager = roadManager;
        this.scene = scene;
        this.player = ECSengine.createEntity();
        this.playerTranslateComponent = new ECS.ComponentTransform(BABYLON.Vector3.Zero(), new BABYLON.Vector3(0.003, 0.003, 0.003), BABYLON.Quaternion.Identity());
        this.player.addComponent(this.playerTranslateComponent);
        this.playerMeshComponent = new ECS.ComponentAbstractMesh(this.playerTranslateComponent, "assets/models/", "Matthew_Full.babylon");
        this.player.addComponent(this.playerMeshComponent);
        this.playerTranslateComponent.setPosition = this.playerTranslateComponent.getPosition.add(new BABYLON.Vector3(0, 0, 0));
        this.playerMeshComponent.meshRotate(new BABYLON.Vector3(1, 0, 0), Math.PI / 2);
        this.playerMeshComponent.meshRotate(new BABYLON.Vector3(0, 0, 1), Math.PI);
        this.playerMeshComponent.setCollision(BABYLON.Mesh.CreateBox("CollBox", 0.2, this.scene, false));
        this.playerT = 0;
        this.jumpManager = new ComponentJumpLane(this.playerMeshComponent, BABYLON.Vector3.Zero(), this.scene, this.playerT);
        //playerTranslateComponent.setScale = new BABYLON.Vector3(0.1, 0.1, 0.1);
        console.log(this.playerTranslateComponent.getPosition);
        console.log("componentPosition instance type:" + this.playerTranslateComponent.componentType());
        this.currentLane = this.roadManager.getStartLane;
    }
    /**
     * Returns the players interpontation(t or dictance in game).
     * @returns players t
     */
    PlayerManager.prototype.getplayerT = function () {
        return this.playerT;
    };
    /**
     * Returns the players position
     * @returns players position
     */
    PlayerManager.prototype.getplayerPosition = function () {
        return this.playerTranslateComponent.getPosition;
    };
    PlayerManager.prototype.onTouchStart = function (touchEvt) {
        this.touchStart = new BABYLON.Vector2(touchEvt.touches[0].screenX, touchEvt.touches[0].screenY);
    };
    PlayerManager.prototype.onTouchEnd = function (touchEvt) {
    };
    PlayerManager.prototype.onTouchMove = function (touchEvt) {
        this.touchEnd = new BABYLON.Vector2(touchEvt.touches[0].screenX, touchEvt.touches[0].screenY);
        if (this.touchEnd.x - this.touchStart.x > screen.width * 0.3 && this.currentLane.getRightLaneAvalable) {
            this.currentLane = this.currentLane.getRightLane;
        }
        if (this.touchEnd.x - this.touchStart.x < -screen.width * 0.3 && this.currentLane.getLeftLaneAvalable) {
            this.currentLane = this.currentLane.getLeftLane;
        }
    };
    PlayerManager.prototype.onKeyDown = function (keyEvent) {
        switch (keyEvent.keyCode) {
            case 65:
                if (this.currentLane.getLeftLaneAvalable) {
                    this.currentLane = this.currentLane.getLeftLane;
                }
                break;
            case 68:
                if (this.currentLane.getRightLaneAvalable) {
                    this.currentLane = this.currentLane.getRightLane;
                }
                break;
            case 32:
                if (this.jumpManager.jumping == false) {
                    this.jumpManager.jump(this.playerT);
                }
                break;
        }
    };
    PlayerManager.prototype.update = function (deltaTime) {
        if (!this.animationStarted && this.playerMeshComponent.meshState == ECS.MeshLoadState.Loaded) {
            this.animationStarted = true;
            // set run animation
            this.scene.beginAnimation(this.playerMeshComponent.babylonSkeleton, 2, 18, true, 1);
        }
        //check collision with obstacles
        for (var index = 0; index < this.roadManager.obstacles.length; index++) {
            if (this.roadManager.obstacles[index] != null) {
                var coll = this.playerMeshComponent.getCollider.intersectsMesh(this.roadManager.obstacles[index]);
                if (coll) {
                    this.temp++;
                    if (this.temp > 2) {
                        this.playerSpeed = 0;
                    }
                }
            }
        }
        this.playerT += (deltaTime * this.playerSpeed);
        // spawn lane if needed
        if (!this.currentLane.getNextLaneAvalable) {
            if (!this.currentLane.getNextLane.getNextLaneAvalable) {
                this.roadManager.createRaodPart();
            }
        }
        else {
            if (!this.currentLane.getNextLane.getNextLaneAvalable) {
                this.roadManager.createRaodPart();
            }
        }
        // set next lane if at end of current lane
        if (this.playerT > this.currentLane.getEndT()) {
            this.currentLane = this.currentLane.getNextLane;
        }
        var laneInputT = (this.playerT - this.currentLane.getStartT) / this.currentLane.getLaneLength();
        var pos = this.currentLane.getPointAtT(laneInputT);
        if (this.jumpManager.jumping == true) {
            var jumpInputT = (this.playerT - this.jumpManager.getT()) / this.jumpManager.getLaneLength();
            if (jumpInputT > 1) {
                this.jumpManager.done();
            }
            pos = this.currentLane.getPointAtT(laneInputT).add(this.jumpManager.getPointAtT(jumpInputT));
        }
        this.playerTranslateComponent.setPosition = pos;
        this.playerMeshComponent.updateCollision = pos;
    };
    return PlayerManager;
}());
//# sourceMappingURL=playerManager.js.map