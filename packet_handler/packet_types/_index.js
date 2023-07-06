const fs = require("fs");
const path = require("path");
const { log } = require("../../utils.js");
const packet_types = fs
  .readdirSync(path.join(__dirname))
  .filter((file) => !file.startsWith("_"));
const list = [];
for (const packet_type of packet_types) {
  try {
    const callback = require(path.join(__dirname, packet_type));
    if (typeof callback !== "function") throw new Error();
    list.push([path.parse(packet_type).name, callback]);
  } catch (error) {
    let log_message = `The file ${path.join(
      __dirname,
      packet_type
    )} is not setup properly.`;
    log("bright red", log_message);
  }
}
module.exports = list;
