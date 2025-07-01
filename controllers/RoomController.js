const { Chat, Room, User, UserHasRoom } = require("../models");
const ChatAiController = require("./ChatAiController");
class RoomController {
  static async create(req, res, next) {
    try {
      if (!req.body) {
        throw { message: "Name is required", name: "ValidationError" };
      }
      const { name, description } = req.body;
      const user = req.user;
      const room = await Room.create({
        name,
        description,
        OwnerId: user.id,
        roomType: "group-chat",
      });
      const input = `Buat balasan untuk pesan berikut:\nSelamat datang di ruang obrolan baru: ${name}. Deskripsi: ${
        description || "tidak ada deskripsi"
      }.`;
      const result = await ChatAiController.createPrompt(input);
      await Chat.create({
        UserId: 1, // Assuming a default user ID for the AI response
        RoomId: room.id,
        text: result,
      });
      res.status(201).json(room);
    } catch (error) {
      console.error("Error creating room:", error);
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const user = req.user; // Assuming user is set in the request by authentication middleware

      const rooms = await UserHasRoom.findAll({
        where: { UserId: user.id },
        include: [
          {
            model: Room,
            include: [
              {
                model: User,
                as: "Owner",
                attributes: ["id", "username"],
              },
            ],
          },
        ],
        order: [["Room", "updatedAt", "DESC"]],
      });
      res.status(200).json(rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      next(error);
    }
  }
}

module.exports = RoomController;
