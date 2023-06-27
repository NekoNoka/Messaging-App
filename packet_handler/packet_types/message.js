module.exports = function (packet, id, connections) {
    let message = "";
    let name = connections[id - 1].name;
    if (!name) {
        message = id + ": " + packet.data.message;
    } else {
        message = name + ": " + packet.data.message;
    }
    console.log(message);
    connections.forEach(user => {
        if (user) user.ws.send(JSON.stringify({ type: "message", data: { message } }));
    });
}