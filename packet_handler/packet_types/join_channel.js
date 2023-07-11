module.exports = async function ({
  user,
  id,
  packet,
  wss: { connections },
  models: { Channel, Messages },
}) {
  let channelData = await Channel.findByPk(packet.data.id, {
    include: [{ model: Messages }],
  });
  let data = channelData.toJSON();
  user.currentChannel = data.id;
  console.log(data);
  user.ws.emit("message", JSON.stringify({ type: "join_channel", data }));
};
