module.exports = function (id, connections) {
    console.log("connection removed: " + id);
    connections.forEach(user => {
        if (user) user.ws.send(JSON.stringify({type: "user_left", data: { id }}));
    });
}