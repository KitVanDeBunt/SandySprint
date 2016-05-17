///-not in use <reference path="../../../src/math/babylon.math.ts" />

namespace ECS {
    /**
     * ComponentPosition
     */
    export class ComponentTransform extends Component {
        private position: BABYLON.Vector3;
        private scale: BABYLON.Vector3;
        private rotation: BABYLON.Quaternion;

        constructor(position: BABYLON.Vector3, scale: BABYLON.Vector3, rotation: BABYLON.Quaternion) {
            super();
            this.position = position;
            this.scale = scale;
            this.rotation = rotation;
        }

        get getPosition(): BABYLON.Vector3 {
            return this.position;
        }

        set setPosition(newPosition: BABYLON.Vector3) {
            this.position = newPosition;
        }

        get getRotationQuaternion(): BABYLON.Quaternion {
            return this.rotation;
        }

        set setRotationQuaternion(newQuaternion: BABYLON.Quaternion) {
            this.rotation = newQuaternion;
        }

        get getScale(): BABYLON.Vector3 {
            return this.scale;
        }

        set setScale(newScale: BABYLON.Vector3) {
            this.scale = newScale;
        }

        newOfThis(): ComponentTransform {
            return new ComponentTransform(BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero(),BABYLON.Quaternion.Identity());
        }
    }
}