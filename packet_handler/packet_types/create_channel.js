module.exports = async function ({
  user,
  packet,
  wss: { tokens },
  models: { Channel, User_Channel },
}) {
  try {
    let channelData = await Channel.create({
      name: packet.data.name,
    });
    channelData = channelData.toJSON();

    let user_channel = await User_Channel.create({
      Channel_channelid: channelData.id,
      User_userid: user.id,
    });

    user.ws.send(
      JSON.stringify({
        type: "create_channel_update",
        data: {
          status: channelData.channel_name,
          name: channelData.channel_name,
        },
      })
    );
  } catch (err) {
    console.log(err, packet);
  }
};
