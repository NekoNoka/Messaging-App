const fs = require('fs');
const path = require('path');
const { log } = require("../../utils.js");
const event_types = fs.readdirSync(path.join(__dirname)).filter(folder => !folder.startsWith('_'));
const list = [];
for (const event_type of event_types) {
    try {
        const callback = require(path.join(__dirname, event_type));
        if (typeof callback !== "function") throw new Error();
        list.push([path.parse(event_type).name, callback]);
    } catch (error) {
        let log_message = `The file ${path.join(__dirname, packet_type)} is not setup properly.`;
        log("bright red", log_message);
    }
}
module.exports = list;