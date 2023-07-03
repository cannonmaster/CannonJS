const {EventEmitter} = require('events');
class HookSystem extends EventEmitter {
  constructor() {
    super();
    this.hooks = new WeakMap();
  }
  // register(type: string) {
  //   if (!type) return;
  //   return (hook: any)=>{
  //     this.registerHook(type, hook);
  //   }
  // }
  
  registerHook(route: string, hook: any, options: any){
    if (!this.hooks.has(route)) {
      this.hooks.set(route, new Map());
    }
    if (!this.hooks.get(route).has(options.type)) {
      this.hooks.get(route).set(options.type, new Set());
    }
    this.hooks.get(route).get(options.type).push(hook);
  }

  runHooks(route: string, ...args: any) {
    if (this.hooks.has(route)) {
      const hooks = this.hooks.get(route);
      hooks.foreach((hook: (params:any)=>any)=>{
        hook(args);
      })
    }
    this.emit(route, ...args);
  }
}


export default new HookSystem;