const eventSys = require("./event_handler/eventSys");
const packetSys = require("./packet_handler/packetSys");

const { Server } = require("ws");

const wss = new Server({ port: 5757 });

const connections = [];

wss.on("connection", ws => {
    // (function () {
    //     let oldWS = ws.send;
    //     ws.send = function (...args) {
    //         console.log(...args);
    //         oldWS.bind(this)(...args);
    //     }
    // })();
    let id = connections.push({
        ws,
        channel: "",
        name: undefined,
        bucket: new Array(5).fill(0)
    });
    ws.on("message", (packet) => {
        try {
            packet = JSON.parse(packet);
            if (typeof packet.type === "string") packetSys.emit(packet.type, packet, id, connections);
        } catch (error) {
            console.log(error);
        }
    });
    ws.on("close", (code, reason) => {
        console.log({ code, reason });
        eventSys.emit("user_left", id, connections);
        connections[id - 1] = undefined;
    });
    eventSys.emit("user_connected", id, connections);
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