namespace ECS {
    /**
     * Component
     */
    export abstract class Component {

        protected _typeOfComponent: string;
        protected _parent: Entity;
        protected _isDestroyed: boolean = false;
        protected _parentEntity: Entity;

        constructor() {
        }
        
        /**
         * sets the parent entity
         */
        public set setParentEntity(e: Entity) {
            this._parentEntity = e;
        }
        
        /**
         * @returns the parent entity of this component
         */
        public get getParentEntity(): Entity {
            return this._parentEntity;
        }

        /**
         * @returns the type of this comonent
         */
        componentType(): string {
            return Describer.getName(this);
        }

        /**
         * called when this component is added to an entity
         */
        onAddedToEntity(parent: Entity) {
            this._parent = parent;
        }
        
        /**
         * sets the component ready to be destroyed by the engine
         */
        destroy() {
            this._isDestroyed = false;
        }

        /**
         * @returns returns if the component has been set to be destroyed by the engine 
         */
        destroyed(): boolean {
            return this._isDestroyed;
        }
    }
}