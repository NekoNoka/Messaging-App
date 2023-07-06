const { log } = require("./utils.js");

class EventEmitter {
  constructor(name = "Emitter") {
    this.table = {};
    this.name = name;
  }
  on(eventName, callBack) {
    let temp = this.table[eventName];
    if (temp) {
      temp.push(callBack);
    } else {
      this.table[eventName] = [callBack];
    }
    let log_message = `added event ${eventName} to ${this.name}`;
    log("bright green", log_message);
  }
  emit(eventName, ...args) {
    console.log(eventName, this.table[eventName]);
    this.table[eventName]?.forEach((callBack) => callBack(...args));
    let log_message = `emitted event ${eventName} using ${this.name}`;
    log("bright white", log_message);
  }
}

module.exports = EventEmitter;
