const { Chat, Room, User, UserHasRoom } = require("../models");
const OpenAI = require("openai");
class ChatAiController {
  static async createPrompt(input) {
    try {
      const client = new OpenAI();

      const response = await client.responses.create({
        model: "gpt-4.1-nano",
        input: [
          {
            role: "system",
            content:
              "Jawablah setiap pertanyaan dengan gaya santai, ramah, dan fun. Jangan terlalu formal.",
          },
          { role: "user", content: input },
        ],
      });

      // Perhatikan properti response, sesuaikan dengan struktur response dari openai
      return response.output_text;
    } catch (error) {
      console.error("Error creating chat completion:", error);
      throw error;
    }
  }
  static async create(req, res, next) {
    try {
      const { RoomId } = req.params;

      const room = await Room.findOne({ where: { id: RoomId } });
      if (!room) {
        throw { message: "Room not found", name: "ErrorDataNotFound" };
      }
      if (!req.body || !req.body.message) {
        throw { message: "Message is required", name: "ValidationError" };
      }
      const { message } = req.body;
      const input = `Buat balasan untuk pesan berikut:\n${message}`;
      console.log("🚀 ~ ChatAiController ~ create ~ input:", input);
      const result = await ChatAiController.createPrompt(input);
      const chat = await Chat.create({
        UserId: 1, // Assuming a default user ID for the AI response
        RoomId,
        text: result,
      });
      await Room.update({ updatedAt: new Date() }, { where: { id: RoomId } });
      res.status(201).json(chat);
    } catch (error) {
      console.error("Error creating chat AI:", error);
      next(error);
    }
  }
  static async summarize(req, res, next) {
    try {
      const { RoomId } = req.params;

      const room = await Room.findByPk(RoomId);
      if (!room) {
        throw { message: "Room not found", name: "ErrorDataNotFound" };
      }

      const chats = await Chat.findAll({
        include: {
          model: User,
          attributes: ["id", "username"],
        },
        where: {
          RoomId,
        },
      });
      if (!chats || chats.length === 0) {
        throw { message: "No chats found", name: "ErrorDataNotFound" };
      }
      let input = chats
        .map((chat) => chat.User.username + ": " + chat.text)
        .join("\n");
      input = `Buat konteks apa yang dibicarakan dari percakapan berikut:\n${input}`;
      const result = await ChatAiController.createPrompt(input);
      console.log("🚀 ~ ChatAiController ~ summarize ~ result:", result);
      await Room.update({ updatedAt: new Date() }, { where: { id: RoomId } });
      if (!result) {
        throw {
          message: "Failed to generate summary",
          name: "InternalServerError",
        };
      }
      const chat = await Chat.create({
        UserId: 1, // Assuming a default user ID for the AI response
        RoomId,
        text: result,
      });
      res.status(201).json(chat);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ChatAiController;
