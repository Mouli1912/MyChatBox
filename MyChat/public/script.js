document.addEventListener("DOMContentLoaded", () => {

  const socket = io();

  const messages = document.getElementById("messages");
  const input = document.getElementById("messageInput");
  const btn = document.getElementById("sendButton");

  console.log("JS LOADED 🔥");

  // SEND MESSAGE
  btn.addEventListener("click", () => {
    const msg = input.value;

    if (msg.trim() === "") return;

    // show user message instantly
    addMessage(msg, "user");

    socket.emit("chatMessage", msg);
    input.value = "";
  });

  // RECEIVE MESSAGE
  socket.on("chatMessage", (msg) => {
    if (msg.includes("🤖")) {
      addMessage(msg, "bot");
    }
  });

  // FUNCTION to add message
  function addMessage(msg, type) {
    const li = document.createElement("li");
    li.classList.add("message", type);
    li.textContent = msg;
    messages.appendChild(li);

    // socket.on("chatMessage", (msg) => { 
    // // const li = document.createElement("li"); 
    // // li.textContent = msg; 
    // // messages.appendChild(li); 
    // // }); 
    // auto scroll
    messages.scrollTop = messages.scrollHeight;
  }

});