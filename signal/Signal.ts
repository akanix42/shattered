export abstract class AbstractSignal {

}

export default class Signal<TF, T, T1, T2, T3, T4, T5, TR> extends AbstractSignal {

 static create<TF,T, TR>(fn: ((arg: T) => TR) & TF) :Signal<TF, T, void, void, void, void, void, TR>
 static create<TF, T, T1, T2, T3, T4, T5, TR>(fn: ((arg: T, arg1: T1) => TR) & TF): Signal<TF, T, T1, T2, T3, T4, T5, TR>
 static create<TF, T, T1, T2, T3, T4, T5, TR>(fn: ((arg: T, arg1?: T1, arg2?: T2)=> TR) & TF): Signal<TF, T, T1, T2, T3, T4, T5, TR>
 static create<TF, T, T1, T2, T3, T4, T5, TR>(fn: ((arg: T, arg1?: T1, arg2?: T2, arg3?: T3)=> TR) & TF): Signal<TF, T, T1, T2, T3, T4, T5, TR>
 static create<TF, T, T1, T2, T3, T4, T5, TR>(fn: ((arg: T, arg1?: T1, arg2?: T2, arg3?: T3, arg4?: T4) => TR) & TF): Signal<TF, T, T1, T2, T3, T4, T5, TR>
 static create<TF, T, T1, T2, T3, T4, T5, TR>(fn: ((arg: T, arg1?: T1, arg2?: T2, arg3?: T3, arg4?: T4, arg5?: T5) => TR) & TF): Signal<TF, T, T1, T2, T3, T4, T5, TR>
 static create<TF, T, T1, T2, T3, T4, T5, TR>(fn: ((arg: T, arg1?: T1, arg2?: T2, arg3?: T3, arg4?: T4, arg5?: T5) => TR) & TF): Signal<TF, T, T1, T2, T3, T4, T5, TR> {
   return new Signal<TF, T, T1, T2, T3, T4, T5, TR>();
 }


  private handlers: Array<TF> = [];
  watch(watcher: TF) {
    this.handlers.push(watcher);
  }

  dispatch = ((...args: any[]) => {
    this.handlers.forEach(handler => (handler as any)(...args));
  }) as any as TF
}
