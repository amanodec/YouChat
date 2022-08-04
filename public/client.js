const socket = io();

// Input user's name logic
let name;

do {
  name = prompt("Please enter your name");
} while (!name);

// Logic for text input
let textarea = document.querySelector("#textarea");
textarea.addEventListener("keyup", (e) => {
  // If enter if preseed, then send the message
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

// message sending logic
let messageArea = document.querySelector(".message__area");
// Function to send message
function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };

  //   Append the message to the chat
  appendMessage(msg, "outgoing");
  scrollToBottom();
  textarea.value = '';

  //   Send to Server
  socket.emit('message',msg);
}

// Function to append message
function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  //   Creating the html for message
  let markup = `
    <h4> ${msg.user} </h4>
    <p> ${msg.message} </p>
    `;
  // adding the html to mainDiv
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}


// Recieve message

socket.on('message',(msg) => {
    appendMessage(msg,'incoming');
    scrollToBottom();
})

// Scroll to the newest message
function scrollToBottom() {
    messageArea.scrollTOp = messageArea.scrollHeight;
}