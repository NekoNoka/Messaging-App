module.exports = function ({ packet, id, wss: { tokens, connections } }) {
    let user = tokens[packet.data.token];
    if (!user) return; // send a packet back saying denied
    let x = connections[id - 1];
    x.name = user.name;
    x.verified = true;
    // delete tokens[packet.data.token]
}