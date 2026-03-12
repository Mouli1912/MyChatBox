const socket = io();

function sendMessage() {
  const msg = document.getElementById("msg").value;
  socket.emit("chat-message", msg);
}

socket.on("chat-message", (msg) => {
  const chat = document.getElementById("chat");
  chat.innerHTML += "<p>" + msg + "</p>";
});