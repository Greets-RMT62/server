const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class LoginController {
  static async login(req, res, next) {
    try {
      if (!req.body) {
        throw { name: "AuthenticationError", message: "Username and Password is required" };
      }
      if (!req.body.username) {
        throw { name: "AuthenticationError", message: "Username is required" };
      }
      if (!req.body.password) {
        throw { name: "AuthenticationError", message: "Password is required" };
      }

      const { username, password } = req.body;
      let user = await User.findOne({ where: { username } });
      if (user) {
        const compare = comparePass(password, user.password);
        if (!compare) {
          throw { name: "AuthenticationError", message: "Invalid Username/Password" };
        }

        const access_token = signToken({ id: user.id });
        res.status(200).json({ access_token });
      } else {
        user = await User.create({ username, password });
        const access_token = signToken({ id: user.id });
        res.status(201).json({ access_token });
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = LoginController;
