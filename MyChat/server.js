const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("user connected:", socket.id);

    socket.on("chatMessage", (msg) => {
        io.emit("chatMessage", msg);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected:", socket.id);
    });
});

// MongoDB connect
mongoose.connect("mongodb+srv://mouli_db_user:abc123@cluster0.1ub67ev.mongodb.net/chatdb?retryWrites=true&w=majority")
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));

// Root route
app.get("/", (req, res) =>{
    res.send("Server Running Successfully 🚀");
});



// Start server
server.listen(8000, ()=>{
    console.log("Server running on http://localhost:8000");
});