module.exports = async function ({
  id,
  packet,
  models: { Channel },
  wss: { connections },
}) {
  try {
    const channelData = await Channel.create({
      channel_name: packet.data.name,
    });
    const channeljsonData = channelData.toJSON();
    if (channeljsonData.channel_name == undefined) {
      connections[id - 1].ws.send(
        JSON.stringify({
          type: "error",
          data: { message: "Error creating channel" },
        })
      );
      return;
    }
    connections.forEach((user) => {
      if (user)
        user.ws.send(
          JSON.stringify({
            type: "create_channel",
            data: { channel_id: channeljsonData.id },
          })
        );
    });
  } catch (err) {
    console.log(err);
  }
};
