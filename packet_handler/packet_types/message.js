module.exports = function ({packet, id, wss: { connections } }) {
    let user = connections[id - 1];
    if (!user.verified) return false;
    let message = user.name + ": " + packet.data.message;
    console.log(message);
    // Messages.create();
    connections.forEach(user => {
        if (user) user.ws.send(JSON.stringify({ type: "message", data: { message } }));
    });
    return true;
}