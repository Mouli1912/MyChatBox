const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server);

// --- MongoDB setup ---
mongoose.connect("mongodb+srv://mouli_db_user:abc123@cluster0.1ub67ev.mongodb.net/chatdb?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Chat Schema
const chatSchema = new mongoose.Schema({
    username: String,       // can be socket.id or "Bot"
    message: String,
    timestamp: { type: Date, default: Date.now }
});
const Chat = mongoose.model("Chat", chatSchema);

// --- Socket.IO ---
io.on("connection", async (socket) => {
    console.log("User connected:", socket.id);

    // Send last 50 messages from DB to the new user
    const lastMessages = await Chat.find().sort({ timestamp: 1 }).limit(50);
    lastMessages.forEach((msg) => {
        socket.emit("chatMessage", `${msg.username}: ${msg.message}`);
    });

    // Welcome message
    const welcome = "🤖 Welcome to MyChat! Type 'hi' or 'hello' to start chatting.";
    socket.emit("chatMessage", `Bot: ${welcome}`);
    const welcomeMsg = new Chat({ username: "Bot", message: welcome });
    await welcomeMsg.save();

    // User sends a message
    socket.on("chatMessage", async (msg) => {
        msg = msg.trim();
        console.log("User:", msg);

        // Save user message
        const userMsg = new Chat({ username: socket.id, message: msg });
        await userMsg.save();

        // Broadcast user message to all
        io.emit("chatMessage", `${socket.id}: ${msg}`);

        // Bot reply logic
        let reply = "";
        const lower = msg.toLowerCase();
        if (lower === "hi" || lower === "hello") {
            reply = "🤖 Hello! How can I help you today?";
        } else {
            reply = "🤖 I can't understand that 😅";
        }

        console.log("Bot:", reply);

        // Save bot message
        const botMsg = new Chat({ username: "Bot", message: reply });
        await botMsg.save();

        // Send bot message after 1 second
        setTimeout(() => {
            io.emit("chatMessage", `Bot: ${reply}`);
        }, 1000);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// --- Start server ---
server.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});