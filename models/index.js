const User = require("./User");
const Messages = require("./Messages");

User.hasMany(Messages, {
  foreignKey: "id",
});

module.exports = { User, Messages };
