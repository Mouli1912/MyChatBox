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

const message = document.getElementById("message");

//Default message 

window.onload = function(){
  const li = this.document.createElement("li");
  li.textContent = "How can I help you?";
  // styling 
  li.style.color ="grey";
  li.style.fontstyle ="italic";
  message.appendChild(li);
  
  li.classList.add("bot-message");

};