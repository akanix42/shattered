export {};

declare global {
  export interface Array<T> {
    random(): T
    randomize(): Array<T>
  }
}
