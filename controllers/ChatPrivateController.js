const { Chat, Room, User, UserHasRoom } = require("../models");
class ChatPrivateController {
  static async create(req, res, next) {
    try {
      if (!req.body) {
        throw {
          message: "Target UserId and message are required",
          name: "ValidationError",
        };
      }
      const { targetUserId, message } = req.body;
      const user = req.user; // Assuming the authenticated user's ID is in req.user
      console.log("🚀 ~ ChatPrivateController ~ create ~ user:", user);
      // Validate input
      const targetUser = await User.findByPk(targetUserId);

      if (!targetUser) {
        throw { message: "Target User not found", name: "ErrorDataNotFound" };
      }

      const room = await Room.create({
        name: `private-chat-${user.username}-and-${targetUser.username}`,
        roomType: "private-chat",
        OwnerId: user.id,
      });

      await UserHasRoom.create({
        UserId: user.id,
        RoomId: room.id,
      });

      const chat = await Chat.create({
        UserId: user.id,
        RoomId: room.id,
        text: message,
      });

      res.status(201).json(chat);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ChatPrivateController;
