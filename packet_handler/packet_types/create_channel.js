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
    user_channel = user_channel.toJSON();
    console.log(channelData);
    user.ws.emit("message", 
      JSON.stringify({
        type: "create_channel",
        data: {
          name: user_channel.name,
          id: user_channel.id
        },
      })
    );
  } catch (err) {
    console.log(err, packet);
  }
};
