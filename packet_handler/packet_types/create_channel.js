module.exports = async function ({
  user,
  packet,
  models: { Channel },
}) {
  try {
    const channelData = await Channel.create({
      channel_name: packet.data.name,
    });
    const channeljsonData = channelData.toJSON();
    if (channeljsonData.channel_name == undefined) {
      user.ws.send(
        JSON.stringify({
          type: "error",
          data: { message: "Error creating channel" },
        })
      );
      return;
    }
    user.ws.send(
      JSON.stringify({
        type: "create_channel",
        data: { channel_id: channeljsonData.id },
      })
    );
  } catch (err) {
    console.log(err);
  }
};
