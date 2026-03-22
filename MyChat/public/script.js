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

    // Show user message instantly
    addMessage(msg, "user");

    // Send message to server
    socket.emit("chatMessage", msg);

    // Clear input
    input.value = "";
  };

  btn.addEventListener("click", sendMessage);

  // Send on Enter key
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // ----------------------
  // Receive message
  // ----------------------
  socket.on("chatMessage", (msg) => {
    // Only show bot messages
    if (msg.includes("🤖")) {
      add.Message(msg, "bot");
    }
  });

  // ----------------------
  // Function to add message
  // ----------------------
  function addMessage(msg, type) {
    const li = document.createElement("li");
    li.textContent = msg;
    li.classList.add("message", type);
    messages.appendChild(li);

    // Auto-scroll to bottom
    messages.scrollTop = messages.scrollHeight;
  }
});