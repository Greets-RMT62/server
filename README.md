# Greets

## API Documentation

---

### Authentication

#### Login / Register

- **POST** `/login`
- **Request Params:** None
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `200 OK` (login success) or `201 Created` (register success)
  ```json
  {
    "access_token": "jwt_token"
  }
  ```

---

### Users

#### Get All Users

- **GET** `/users`
- **Request Params:** None
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`
  ```json
  [
    {
      "id": 1,
      "username": "string"
    }
  ]
  ```

---

### Rooms

#### Create Room

- **POST** `/rooms`
- **Request Params:** None
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Response:**
  - `201 Created`
  ```json
  {
    "id": 1,
    "name": "string",
    "description": "string",
    "OwnerId": 1,
    "roomType": "group-chat",
    ...
  }
  ```

#### Get All Rooms (joined by user)

- **GET** `/rooms`
- **Request Params:** None
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`
  ```json
  [
    {
      "UserId": 2,
      "RoomId": 1,
      "createdAt": "2025-07-01T23:31:07.874Z",
      "updatedAt": "2025-07-01T23:31:07.874Z",
      "Room": {
        "id": 1,
        "name": "General Chat",
        "description": "Tempat ngobrol santai semua member.",
        "OwnerId": 2,
        "roomType": "group-chat",
        "createdAt": "2025-07-02T00:00:00.000Z",
        "updatedAt": "2025-07-02T00:00:00.000Z",
        "Owner": {
          "id": 2,
          "username": "Andi"
        }
      }
    }
  ]
  ```

---

### Chats

#### Get Chats in Room

- **GET** `/chats/:RoomId`
- **Request Params:**
  - `RoomId` (path param, integer): Room ID
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  - `200 OK`
  ```json
  [
    {
      "id": 1,
      "UserId": 2,
      "RoomId": 1,
      "text": "Hello!",
      "createdAt": "2025-07-02T08:00:00.000Z",
      "updatedAt": "2025-07-02T08:00:00.000Z"
    }
  ]
  ```

#### Post Chat in Room

- **POST** `/chats/:RoomId`
- **Request Params:**
  - `RoomId` (path param, integer): Room ID
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "text": "string",
    "ChatId": 1 // optional, for reply/threads
  }
  ```
- **Response:**
  - `200 OK`
  ```json
  {
    "id": 1,
    "UserId": 2,
    "RoomId": 1,
    "text": "string",
    "createdAt": "2025-07-02T08:00:00.000Z",
    "updatedAt": "2025-07-02T08:00:00.000Z"
  }
  ```

#### Create AI Chat in Room

- **POST** `/rooms/:RoomId/ai-chats`
- **Request Params:**
  - `RoomId` (path param, integer): Room ID
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "message": "string"
  }
  ```
- **Response:**
  - `201 Created`
  ```json
  {
    "id": 1,
    "UserId": 1,
    "RoomId": 1,
    "text": "AI response",
    ...
  }
  ```

#### Summarize Room Chat

- **POST** `/rooms/:RoomId/summaries`
- **Request Params:**
  - `RoomId` (path param, integer): Room ID
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  - `201 Created`
  ```json
  {
    "id": 1,
    "UserId": 1,
    "RoomId": 1,
    "text": "Summary text",
    ...
  }
  ```

---

### Private Chat

#### Create Private Chat Room

- **POST** `/rooms/private`
- **Request Params:** None
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "targetUserId": 2,
    "message": "string"
  }
  ```
- **Response:**
  - `201 Created`
  ```json
  {
    "message": "Private chat created successfully",
    "room": {
      "id": 1,
      "name": "private-chat-UserA-and-UserB",
      "roomType": "private-chat",
      "OwnerId": 1,
      ...
    }
  }
  ```

---

### Room Invitation

#### Invite User to Room

- **POST** `/rooms/:RoomId/invitations`
- **Request Params:**
  - `RoomId` (path param, integer): Room ID
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "UserId": 2
  }
  ```
- **Response:**
  - `201 Created`
  ```json
  {
    "message": "User <username> has been invited to room <room name>"
  }
  ```

---

### Error Handling

- All errors will return a JSON response with a `message` field describing the error.

---

### Notes

- All endpoints (except `/login`) require JWT authentication via the `Authorization` header.
- Replace `<token>` with your JWT access token.
- Replace path params (e.g., `:RoomId`) with actual values.
