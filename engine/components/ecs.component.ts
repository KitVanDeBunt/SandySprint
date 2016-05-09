namespace ECS {
    /**
     * Component
     */
    export abstract class Component {

        protected typeOfComponent: string;
        protected parent: Entity;
        protected isDestroyed: boolean = false;
        protected parentEntity: Entity;

        constructor() {
        }


        public set setParentEntity(e: Entity) {
            this.parentEntity = e;
        }

        public get getParentEntity(): Entity {
            return this.parentEntity;
        }


        componentType(): string {
            return Describer.getName(this);
        }

        static testfunc() {

        }

        onAddedToEntity(parent: Entity) {
            this.parent = parent;
        }

        destroy() {
            this.isDestroyed = false;
        }

        destroyed(): boolean {
            return this.isDestroyed;
        }
    }
}