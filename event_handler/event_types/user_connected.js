module.exports = function ({ id, wss: { connections } }) {
    console.log("connection added: " + id);
    connections.forEach(user => {
        if (user) user.ws.send(JSON.stringify({ type: "user_joined", data: { id } }));
    });
}