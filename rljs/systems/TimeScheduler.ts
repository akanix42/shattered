import Entity from '../gameObjects/Entity';
import Signal from '../gameObjects/Signal';
import Component from 'rljs/components/Component';
import BehaviorComponent from 'rljs/components/BehaviorComponent';

export enum TimeSpent {
  WaitForSignal = -1,
  RemoveEntry = -2,
  None = 0,
}

interface IEntitySchedule {
  entityId: number
  time: number
}

export default class TimeScheduler {
  static onAct = Signal.create(function (entityId: number): number { return 0; });
  static onS = Signal.create(function (entityId: number) { });

  private isRunning: boolean;
  private timetable: Array<IEntitySchedule> = [];
  private currentTime: number = 0;
  private currentIndex: number = 0;

  constructor() {
    Entity.onComponentAdded.watch((entityId: number, component: Component) => {
      if (component instanceof BehaviorComponent) {
        this.schedule(entityId, 0);
      }
    });
  }

  private schedule(entityId: number, timeDelta: number) {
    this.timetable.push({ entityId, time: this.currentTime + timeDelta });
  }

  run() {
    this.isRunning = true;
    while (this.isRunning) {
      if (this.timetable.length === 0) {
        return;
      }
      for (let i = this.currentIndex; i < this.timetable.length; i++) {
        const entry = this.timetable[i];
        this.currentTime = entry.time;
        this.currentIndex = i;
        const timeSpentOnAction = TimeScheduler.onAct.dispatch(entry.entityId);
        if (timeSpentOnAction === TimeSpent.WaitForSignal) {
          return;
        }
        if (timeSpentOnAction !== TimeSpent.RemoveEntry) {
          this.schedule(entry.entityId, timeSpentOnAction);
        }
        if (!this.isRunning) {
          return;
        }
      }
      this.clean();
    }
  }

  stop() {
    this.isRunning = false;
  }

  private clean() {
    this.currentIndex = 0;
  }
}
