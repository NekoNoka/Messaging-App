module.exports = async function ({
  user,
  id,
  packet,
  wss: { connections },
  models: { Channel },
}) {
  let channels = await Channel.findAll();
  channels = channels.map((e) => e.toJSON());
  user.ws.send(JSON.stringify({ type: "public_channels", data: { channels } }));
};
