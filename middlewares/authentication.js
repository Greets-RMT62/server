const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

module.exports = async function authentication(req, res, next) {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      throw { name: "UnauthorizedError" };
    }

    const [type, token] = bearerToken.split(" ");
    const data = verifyToken(token);

    const user = await User.findByPk(data.id, {
      attributes: {
        exclude: ["password"]
      }
    });
    if (!user) {
      throw { name: "UnauthorizedError" };
    }

    req.user = user.toJSON();
    next();
  } catch (error) {
    next(error);
  }
};
