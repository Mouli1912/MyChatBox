document.addEventListener("DOMContentLoaded", () => {

  const socket = io();

  const messages = document.getElementById("messages");
  const input = document.getElementById("messageInput");
  const btn = document.getElementById("sendButton");

  console.log("JS LOADED 🔥");

  btn.addEventListener("click", () => {
    console.log("CLICK WORKING 🔥");

    const msg = input.value;
    socket.emit("chatMessage", msg);
    input.value = "";
  });

  socket.on("chatMessage", (msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    messages.appendChild(li);
  });

});