const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Messages extends Model {}

Messages.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    channelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: "Channel",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    updatedAt: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Messages",
  }
);

module.exports = Messages;
