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
const UserController = require("./controllers/UserController");
const { guardChats } = require("./middlewares/authorization");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/login", LoginController.login);

// middleware authentication
const authentication = require("./middlewares/authentication");
app.use(authentication);
//

app.get("/users", UserController.getAllUsers);

app.post("/rooms", RoomController.create);
app.get("/rooms", RoomController.getAll);

app.get("/chats/:RoomId", guardChats, ChatsController.getChats);
app.post("/chats/:RoomId", guardChats, ChatsController.postChat);

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
