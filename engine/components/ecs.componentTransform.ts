namespace ECS {
    /**
     * component that handels position data for the engine
     */
    export class ComponentTransform extends Component {
        private _position: BABYLON.Vector3;
        private _scale: BABYLON.Vector3;
        private _rotation: BABYLON.Quaternion;

        /**
         * @param position start position
         * @param scale start scale
         * @param rotation start rotation
         */
        constructor(position: BABYLON.Vector3, scale: BABYLON.Vector3, rotation: BABYLON.Quaternion) {
            super();
            this._position = position;
            this._scale = scale;
            this._rotation = rotation;
        }

        /**
         * @return returns the position of this component
         */
        get getPosition(): BABYLON.Vector3 {
            return this._position;
        }

        /**
         * sets the position of this component
         * @param newPosition the new position of this component
         */
        set setPosition(newPosition: BABYLON.Vector3) {
            this._position = newPosition;
        }

        /**
         * @returns returns the rotation quaturnion of this component
         */
        get getRotationQuaternion(): BABYLON.Quaternion {
            return this._rotation;
        }
        
        /**
         * sets an new roation quaturnion on this component 
         * @param newQuaternion new rotation
         */
        set setRotationQuaternion(newQuaternion: BABYLON.Quaternion) {
            this._rotation = newQuaternion;
        }
        
        /**
         * @returns the scale of this components
         */
        get getScale(): BABYLON.Vector3 {
            return this._scale;
        }

        /**
         * @param newScale sets a new scale on this mesh
         */
        set setScale(newScale: BABYLON.Vector3) {
            this._scale = newScale;
        }

        /**
         * returns a new ComponentTransform
         * @returns new ComponentTransform
         */
        newOfThis(): ComponentTransform {
            return new ComponentTransform(BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero(),BABYLON.Quaternion.Identity());
        }
    }
}