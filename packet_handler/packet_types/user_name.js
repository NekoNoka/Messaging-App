module.exports = function (packet, id, connections) {
    if (typeof packet?.data?.name === "string") connections[id - 1].name = packet.data.name;
}