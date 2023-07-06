const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Channel extends Model {}

Channel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    messages: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    channel_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Channel",
  }
);

module.exports = Channel;
