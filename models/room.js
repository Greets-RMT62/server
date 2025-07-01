'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.hasMany(models.UserHasRoom);
      Room.hasMany(models.Chat);
      Room.belongsTo(models.User);
    }
  }
  Room.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: {
          msg: 'Room name must be unique'
        }
      },
      description: DataTypes.STRING,
      OwnerId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      roomType: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Room'
    }
  );
  return Room;
};
