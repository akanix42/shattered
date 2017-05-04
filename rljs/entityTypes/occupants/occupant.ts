import { IEntityTypeDescription } from 'rljs/entityTypes/IEntityTypeDescription';
import SpaceComponent, { Space } from 'rljs/components/SpaceComponent';

export default function occupant(description: IEntityTypeDescription) {
  description.components = description.components.concat([
    () => new SpaceComponent(Space.Occupant)
  ]);
  return description;
}
