interface IConstructor<T> {
  // new (): T
  new (...args: any[]): T
}
export default IConstructor;
