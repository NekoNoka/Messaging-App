const eventSys = new (require("../EventEmitter"))("eventSys");
const event_types = require("./event_types/_index");
event_types.forEach(([type, callback]) => eventSys.on(type, callback));
module.exports = eventSys;