const { Chat, Room } = require("../models");

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
  static async postChat(req, res, next) {
    try {
      if (!req.params || req.params.RoomId === ":RoomId") {
        throw { name: "ValidationError", message: "Params RoomId is required" };
      }
      if (!req.body) {
        throw { name: "ValidationError", message: "Request body is required" };
      }

      let { text, ChatId } = req.body;
      if (!ChatId) {
        ChatId = null;
      }

      const { RoomId } = req.params;
      const data = await Chat.create({
        UserId: req.user.id,
        RoomId,
        text,
        ChatId
      });

      const room = await Room.findOne({ where: { id: RoomId } });
      room.changed("updatedAt", true);
      await room.update({ updatedAt: new Date() });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ChatsController;
