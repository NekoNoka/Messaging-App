const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User_Channel extends Model {}

User_Channel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    channelid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Channel",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: "User_Channel",
  }
);

module.exports = User_Channel;
