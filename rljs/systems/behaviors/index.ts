import aimlessWander from 'rljs/systems/behaviors/aimlessWander';
import testSlow from 'rljs/systems/behaviors/test/slowBehavior';
import IStringMap from 'rljs/interfaces/IStringMap';
import { IBehavior } from 'rljs/systems/BehaviorSystem';

const behaviors: IStringMap<IBehavior> = {
  aimlessWander,
  testSlow,

};
export default behaviors;

export const behaviorNames = {
  aimlessWander: 'aimlessWander',
  testSlow: 'testSlow',
};
