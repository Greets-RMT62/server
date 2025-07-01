const { Chat, Room, User, UserHasRoom } = require("../models");
const ChatAiController = require("./ChatAiController");
class ChatInviteController {
  static async create(req, res, next) {
    try {
      const { UserId, RoomId } = req.params;

      // Validate input
      if (!UserId || !RoomId) {
        throw {
          message: "UserId or RoomId is required",
          name: "ValidationError",
        };
      }
      const user = await User.findByPk(UserId);
      const room = await Room.findByPk(RoomId);

      if (!user || !room) {
        throw { message: "User or Room not found", name: "ErrorDataNotFound" };
      }

      await UserHasRoom.create({
        UserId,
        RoomId,
      });
      const input = `Buat balasan untuk pesan berikut:\nUser ${user.username} telah diundang ke ruang obrolan ${room.name}.`;
      const result = await ChatAiController.createPrompt(input);
      await Chat.create({
        UserId: 1, // Assuming a default user ID for the AI response
        RoomId,
        text: result,
      });

      res.status(201).json({
        message: `User ${user.username} has been invited to room ${room.name}`,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ChatInviteController;
