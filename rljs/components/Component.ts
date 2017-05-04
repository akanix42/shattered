// import { IConstructor } from "../gameObjects/IConstructor";

import IConstructor from 'rljs/interfaces/IConstructor';

export default class Component {
  entityId: number;
  constructor(arg1?: any, arg2?: any, arg3?: any, arg4?: any){}

  get _name() {
    return this.constructor.name;
  }
}

export type IComponent<T> = IConstructor<T> & typeof Component;
