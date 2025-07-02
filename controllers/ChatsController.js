const { Chat } = require("../models");

class ChatsController {
  static async getChats(req, res, next) {
    try {
      if (!req.params || req.params.RoomId === ":RoomId") {
        throw { name: "ValidationError", message: "Params RoomId is required" };
      }

      const { RoomId } = req.params;
      const data = await Chat.findAll({
        where: {
          RoomId
        },
        order: [["createdAt", "ASC"]]
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ChatsController;
