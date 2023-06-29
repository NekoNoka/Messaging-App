const User = require("./User");
const Messages = require("./Messages");
const Channel = require("./Channel");

User.hasMany(Messages, {
  foreignKey: "id",
});

module.exports = { User, Messages, Channel };
