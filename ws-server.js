const eventSys = require("./event_handler/eventSys");
const packetSys = require("./packet_handler/packetSys");
const sequelize = require("./config/connection.js");
const models = require("./models/index");

const { Server } = require("ws");

const wss = new Server({ port: 5757 });

wss.connections = [];
wss.tokens = {};

wss.on("connection", ws => {
    let id = wss.connections.push({
        ws,
        channel: "",
        name: undefined,
        verified: false,
        bucket: new Array(5).fill(0)
    }) - 1;
    ws.on("message", (packet) => {
        try {
            packet = JSON.parse(packet);
            if (typeof packet.type === "string") packetSys.emit(packet.type, { packet, wss, id, user: wss.clients[id], models });
        } catch (error) {
            console.log(error);
        }
    });
    ws.on("close", (code, reason) => {
        console.log({ code, reason });
        eventSys.emit("user_left", { id, wss });
        wss.connections[id] = undefined;
    });
    eventSys.emit("user_connected", { id, wss });
});

module.exports = wss;

// process.on('exit', () => connections.forEach(user => user?.ws?.close()));
// process.on('SIGINT', () => process.exit());

/*

send messages
live messages
direct messages

channels?
channel state change

friends? - contacts - saved gmail contacts
join leave - updating online statuses of people
updating statuses of people

spam protection

*/
