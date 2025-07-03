const { UserHasRoom } = require("../models");

async function guardChats(req, res, next) {
  try {
    if (!req.params || req.params.RoomId === ":RoomId") {
      throw { name: "ValidationError", message: "Params RoomId is required" };
    }

    const { RoomId } = req.params;
    const data = await UserHasRoom.findOne({ where: { RoomId, UserId: req.user.id } });
    if (!data) {
      throw { name: "ForbiddenError" };
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  guardChats
};
