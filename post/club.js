// club.js
const users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
    { username: "user3", password: "password3" },
    { username: "user4", password: "password4" },
    { username: "user5", password: "password5" },
    { username: "user6", password: "password6" },
    { username: "user7", password: "password7" },
    { username: "user8", password: "password8" },
    
    // Add more users here
];

let currentUser = null;

function authenticate() {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    const user = users.find(u => u.username === usernameInput && u.password === passwordInput);

    if (user) {
        currentUser = user;
        displayChatroom();
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

function displayChatroom() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("chatroomSection").style.display = "block";
    fetchStoredMessages()
        .then(messages => {
            const chatMessages = document.getElementById("chatMessages");
            messages.forEach(message => {
                chatMessages.innerHTML += `<p><strong>${message.username}:</strong> ${message.message}</p>`;
            });
        });
}

function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;

    if (message.trim() !== "") {
        document.getElementById("chatMessages").innerHTML += `
            <p><strong>${currentUser.username}:</strong> ${message}</p>
        `;
        saveMessageToServer(currentUser.username, message);
        messageInput.value = "";
    }
}

function logOut() {
    currentUser = null;
    document.getElementById("chatroomSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
}

const messagesEndpoint = 'http://localhost:3000/messages';

async function fetchStoredMessages() {
    try {
        const response = await fetch(messagesEndpoint);
        const messages = await response.json();
        return messages;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function saveMessageToServer(username, message) {
    try {
        const response = await fetch(messagesEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, message })
        });

        if (!response.ok) {
            console.error('Error saving message to server');
        }
    } catch (error) {
        console.error(error);
    }
}

window.onload = function() {
    if (currentUser) {
        displayChatroom();
    }
};
function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;

    if (message.trim() !== "") {
        document.getElementById("chatMessages").innerHTML += `
            <p><strong>${currentUser.username}:</strong> ${message}</p>
        `;
        saveMessageToServer(currentUser.username, message);
        messageInput.value = "";
    }
}
