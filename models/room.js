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
      name: DataTypes.STRING,
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
