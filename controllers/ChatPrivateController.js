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
      const { targetUserId } = req.body;
      const user = req.user; // Assuming the authenticated user's ID is in req.user
      console.log("🚀 ~ ChatPrivateController ~ create ~ user:", user);
      // Validate input
      const targetUser = await User.findByPk(targetUserId);

      if (!targetUser) {
        throw { message: "Target User not found", name: "ErrorDataNotFound" };
      }

      const cekRoom = await Room.findOne({
        where: {
          roomType: "private-chat",
          name: `private-chat-${user.username}-and-${targetUser.username}`,
        },
      });

      if (cekRoom) {
        return res
          .status(200)
          .json({ message: "Private chat already exists", room: cekRoom });
      }
      // Create a new private chat room
      const room = await Room.create({
        name: `private-chat-${user.username}-and-${targetUser.username}`,
        roomType: "private-chat",
        OwnerId: user.id,
      });

      await UserHasRoom.create({
        UserId: user.id,
        RoomId: room.id,
      });
      await UserHasRoom.create({
        UserId: targetUser.id,
        RoomId: room.id,
      });

      res
        .status(201)
        .json({ message: "Private chat created successfully", room });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ChatPrivateController;
