const { User } = require("../models");

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ["password"]
        }
      });

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
