document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  const messages = document.getElementById("messages");
  const input = document.getElementById("messageInput");
  const btn = document.getElementById("sendButton");

  console.log("JS LOADED 🔥");

  // ----------------------
  // Send message
  // ----------------------
  const sendMessage = () => {
    const msg = input.value.trim();
    if (!msg) return;

    // Show user message
    addMessage(msg, "user");

    // 👉 AUTO REPLY (IMPORTANT 🔥)
    if (msg.toLowerCase().includes("hi")) {
      setTimeout(() => {
        addMessage("How can I help you?", "bot");
      }, 500);
    }

    // Send message to server
    socket.emit("chatMessage", msg);

    // Clear input
    input.value = "";
  };

  btn.addEventListener("click", sendMessage);

  // Enter key
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // ----------------------
  // Receive message from server
  // ----------------------
  socket.on("message", (msg) => {
    addMessage(msg, "bot");
  });

  // ----------------------
  // Add message to UI
  // ----------------------
  function addMessage(msg, type) {
    const li = document.createElement("li");
    li.textContent = msg;
    li.classList.add("message", type);
    messages.appendChild(li);

    messages.scrollTop = messages.scrollHeight;
  }
});