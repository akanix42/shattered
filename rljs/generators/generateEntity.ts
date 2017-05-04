import Entity from 'rljs/gameObjects/Entity';
import { IEntityTypeDescription } from 'rljs/entityTypes/IEntityTypeDescription';
import { entityManager } from 'rljs/CurrentGame';
import StatsComponent from 'rljs/components/StatsComponent';

export default function generateEntity(description: IEntityTypeDescription) {
  const entity = new Entity();
  description.components.forEach(createComponent => {
    entity.addComponent(createComponent(entity, description));
  });
  if (!entity.getComponent(StatsComponent)) {
    entity.addComponent(StatsComponent.createDefault())
  }
  entityManager.add(entity);

  return entity;
}
