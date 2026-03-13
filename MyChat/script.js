const socket = io();
socket.on =io();
 socket.on("connect", ()=>{
  console.log("connected to server");
 });

 const input = document.getElementById("message");
 const btn = document.getElementById("send");

 btn.addEventListener("click",()=>{
  socket.emit("chat-message",input.value);
 });

function sendMessage() {
  const msg = document.getElementById("msg").value;
  socket.emit("chat-message", msg);
}

socket.on("chat-message", (msg) => {
  let li = document.getElementById("msg").values;
  li.textContent = msg;
  document.getElementById("chat").appendChild(li);
  const chat = document.getElementById("chat");
  chat.innerHTML += "<p>" + msg + "</p>";
});