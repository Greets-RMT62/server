if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");

const ChatInviteController = require("./controllers/ChatInviteController");
const ChatPrivateController = require("./controllers/ChatPrivateController");
const ChatsController = require("./controllers/ChatsController");
const LoginController = require("./controllers/LoginController");
const ChatAiController = require("./controllers/ChatAiController");
const RoomController = require("./controllers/RoomController");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/login", LoginController.login);

// middleware authentication
const authentication = require("./middlewares/authentication");
app.use(authentication);
//

app.post("/rooms", RoomController.create);
app.get("/rooms", RoomController.getAll);

// app.post("/chats", ChatsController);
// app.post("/chats/:RoomId", ChatsController);

// app.post("/chats/private/:UserId", ChatPrivateController);
// app.post("/chats/invite/:UserId/:RoomId", ChatInviteController);

app.post("/chats/ai/:RoomId", ChatAiController.create);
app.post("/chats/ai/summarize/:RoomId", ChatAiController.summarize);

// middleware error handler
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);
//

module.exports = app;
