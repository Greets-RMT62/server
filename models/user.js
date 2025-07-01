'use strict';
const { hashPass } = require('../migrations/helpers/bcrypt');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Room, { foreignKey: 'OwnerId' });
      User.hasMany(models.UserHasRoom);
      User.hasMany(models.Chat);
      User.belongsToMany(models.Room, { through: 'UserHasRoom', foreignKey: 'UserId' });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Username is already used'
        },
        validate: {
          notNull: {
            msg: 'Username is required'
          },
          notEmpty: {
            msg: 'Username is required'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password is required'
          },
          notEmpty: {
            msg: 'Password is required'
          }
        }
      }
    },
    {
      hooks: {
        beforeCreate(model) {
          model.password = hashPass(model.password);
        }
      },
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
