const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server);

// Socket.IO
io.on("connection", (socket) => {
    console.log("user connected:", socket.id);

    // default message
    socket.emit("chatMessage", "🤖 How can I help you?");

    socket.on("chatMessage", (msg) => {
        console.log("User:", msg);

        // user message show
        io.emit("chatMessage", msg);

        // 🔥 IMPORTANT FIX
        msg = msg.trim().toLowerCase();  // 👈 ye line add ki

        let reply = "";

        if (msg === "hi") {
            reply = "🤖 How can I help you today?";
        } 
        else if (msg === "hello") {
            reply = "🤖 Hello! What do you need help with?";
        } 
        else {
            reply = "🤖 I can't understand that 😅";
        }

        console.log("Bot:", reply);

        // bot reply
        setTimeout(() => {
            socket.emit("chatMessage", reply);
        }, 1000);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected:", socket.id);
    });
});

// MongoDB
mongoose.connect("mongodb+srv://mouli_db_user:abc123@cluster0.1ub67ev.mongodb.net/chatdb?retryWrites=true&w=majority")
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));

// server start
server.listen(8000, ()=>{
    console.log("Server running on http://localhost:8000");
});