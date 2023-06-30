module.exports = function (packet, { connections }, id, models) {
    if (typeof packet?.data?.name === "string") connections[id - 1].name = packet.data.name;
}