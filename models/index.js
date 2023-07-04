const User = require("./User");
const Messages = require("./Messages");
const Channel = require("./Channel");

User.hasMany(Messages, {
  foreignKey: "user_id",
});

Channel.belongsToMany(User, {
  through: "User_Channel",
  foreignKey: "channelid",
});

User.belongsToMany(Channel, {
  through: "User_Channel",
  foreignKey: "userid",
});

module.exports = { User, Messages, Channel };
