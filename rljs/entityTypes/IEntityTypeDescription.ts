import Component from 'rljs/components/Component';
import Entity from 'rljs/gameObjects/Entity';

export interface ComponentCreator {
  (entity: Entity, description: IEntityTypeDescription): Component
}
export interface IEntityTypeDescription {
  // name: string,
  // character: string,
  // color: string,
  components: ComponentCreator[]
}
