class Emitter {
  private Events: any;
  constructor(events: any) {
    this.Events = events;
  }
  on(eventName: string, fn: (...args: any[]) => any) {
    this.Events[eventName]
      ? this.Events[eventName].push(fn)
      : (this.Events[eventName] = [fn]);
  }
  emit(eventName: string, ...args: any[]) {
    if (Array.isArray(this.Events[eventName])) {
      this.Events[eventName].forEach((element: (...args: any[]) => any) => {
        element && element(...args);
      });
    }
  }
  off(eventName: string, fn: (...args: any[]) => any) {
    if (Array.isArray(this.Events[eventName])) {
      for (let i = 0; i < this.Events[eventName].length; i++) {
        const element = this.Events[eventName][i];
        if (element && (element === fn || element.fn === fn)) {
          this.Events[eventName][i] = null;
        }
      }
    }
  }
  once(eventName: string, fn: (...args: any[]) => any) {
    const that = this;
    function once(...args: any[]) {
      that.off(eventName, once);
      fn.apply(that, args);
    }
    once.fn = fn;
    this.on(eventName, once);
  }
}
export default (function () {
  let instance: any = null;
  const Events = {};
  if (instance instanceof Emitter) {
    return instance;
  } else {
    instance = new Emitter(Events);
    return instance;
  }
})();
