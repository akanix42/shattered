import ArchitectureComponent from 'rljs/components/ArchitectureComponent';
import { IEntityTypeDescription } from 'rljs/entityTypes/IEntityTypeDescription';
import UIComponent from 'rljs/components/UIComponent';
// import {registerEntityType} from 'rljs/entityTypes/entityTypes';

const dirtFloor: IEntityTypeDescription = {
  // name: 'dirtFloor',

  components: [
    () => new ArchitectureComponent,
    () => new UIComponent(
      'dirt floor',
      '.',
      '#AD642D',
    ),
  ]
};
export default dirtFloor;
// registerEntityType
