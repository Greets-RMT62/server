'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHasRoom extends Model {
    static associate(models) {
      UserHasRoom.belongsTo(models.User);
      UserHasRoom.belongsTo(models.Room);
    }
  }
  UserHasRoom.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      RoomId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'UserHasRoom'
    }
  );
  return UserHasRoom;
};
