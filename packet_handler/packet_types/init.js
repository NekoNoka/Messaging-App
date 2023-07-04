module.exports = function ({ user, packet, wss: { tokens } }) {
    let userData = tokens[packet.data.token];
    if (!userData) return; // send a packet back saying denied
    user.name = userData.name;
    user.verified = true;
    // delete tokens[packet.data.token]
}