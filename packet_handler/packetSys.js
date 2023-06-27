const packetSys = new (require("../EventEmitter"))("packetSys");
const packet_types = require("./packet_types/_index");
packet_types.forEach(([type, callback]) => packetSys.on(type, callback));
module.exports = packetSys;