'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      Chat.belongsTo(models.User);
      Chat.belongsTo(models.Room);
    }
  }
  Chat.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      RoomId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Message is required'
          },
          notEmpty: {
            msg: 'Message is required'
          }
        }
      },
      ChatId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Chat'
    }
  );
  return Chat;
};
