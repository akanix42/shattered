import Signal, { AbstractSignal } from "../gameObjects/Signal";
import IPoint from 'rljs/interfaces/IPoint';

const events = {
    PrepareMove: Signal.create(function (entityId: number, position: IPoint): number { return 0; }),
    Move: Signal.create(function (entityId: number): number { return 0; }),
}

export default events;

