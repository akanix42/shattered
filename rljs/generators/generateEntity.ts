import Entity from 'rljs/gameObjects/Entity';
import { IEntityTypeDescription } from 'rljs/entityTypes/IEntityTypeDescription';
import { entityManager } from 'rljs/CurrentGame';

export default function generateEntity(description: IEntityTypeDescription) {
  const entity = new Entity();
  description.components.forEach(createComponent => {
    entity.addComponent(createComponent(entity, description));
  });
  entityManager.add(entity);
  
  return entity;
}
