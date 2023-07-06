const User = require("./User");
const Messages = require("./Messages");
const Channel = require("./Channel");
const User_Channel = require("./User_Channel");

User.hasMany(Messages, {
  foreignKey: "user_id",
});

Channel.hasMany(Messages, {
  foreignKey: "channelId",
});

Channel.belongsToMany(User, {
  through: "User_Channel",
  foreignKey: "Channel_channelid",
});

User.belongsToMany(Channel, {
  through: "User_Channel",
  foreignKey: "User_userid",
});

module.exports = { User, Messages, Channel, User_Channel };
