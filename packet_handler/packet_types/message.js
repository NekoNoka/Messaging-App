module.exports = function ({
  packet,
  user,
  wss: { connections },
  models: { Messages },
}) {
  if (!user.verified) return false;
  if (!user.currentChannel) return false;
  let message = user.name + ": " + packet.data.message;
  Messages.create({
    channelId: user.currentChannel,
    message,
    user_id: user.id,
  });
  let currentChannel = user.currentChannel;
  connections.forEach((user) => {
    if (user && user.currentChannel == currentChannel)
      user.ws.emit("message", JSON.stringify({ type: "message", data: { message } }));
  });
  return true;
};
