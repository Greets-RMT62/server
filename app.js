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

//
app.post("/rooms/:RoomId/invitations", ChatInviteController.create);

app.post("/rooms/:RoomId/ai-chats", ChatAiController.create);
app.post("/rooms/:RoomId/summaries", ChatAiController.summarize);

app.post("/rooms/private", ChatPrivateController.create);

// middleware error handler
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);
//

module.exports = app;
