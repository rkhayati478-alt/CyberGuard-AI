
function showConversation() {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("chatBox").style.display = "block";
}

function addMessage(message, type) {
    const chatBox = document.getElementById("chatBox");

    const row = document.createElement("div");
    row.className = "chat-message " + type;

    const avatar = document.createElement("div");
    avatar.className = "chat-avatar";
    avatar.textContent = type === "user" ? "👤" : "🤖";

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    bubble.textContent = message;

    row.appendChild(avatar);
    row.appendChild(bubble);

    chatBox.appendChild(row);

    document.getElementById("userInput").focus();

    const content = document.querySelector(".ai-content");
    content.scrollTop = content.scrollHeight;
}

function sendMessage(event) {
    event.preventDefault();

    const input = document.getElementById("userInput");
    const message = input.value.trim();

    if (!message) return;

    showConversation();

    addMessage(message, "user");

    input.value = "";

    const response = getResponse(message);

    setTimeout(function () {
        addMessage(response, "bot");
    }, 400);
}

function askQuestion(question) {
    showConversation();

    addMessage(question, "user");

    setTimeout(function () {
        addMessage(getResponse(question), "bot");
    }, 400);
}

function newChat() {
    document.getElementById("chatBox").innerHTML = "";
    document.getElementById("chatBox").style.display = "none";
    document.getElementById("welcomeScreen").style.display = "block";
    document.getElementById("userInput").value = "";
}

function getResponse(message) {
    const text = message.toLowerCase();

    if (text.includes("phishing")) {
        return "Phishing is a cyberattack where criminals use fake emails, messages or websites to steal personal information. Always verify the sender and avoid suspicious links.";
    }

    if (text.includes("password")) {
        return "Create a long and unique password. Use a mix of letters, numbers and symbols. Never reuse passwords, and activate two-factor authentication whenever possible.";
    }

    if (text.includes("malware") || text.includes("virus")) {
        return "Malware is software designed to harm devices or steal information. Avoid unknown downloads, keep your system updated and use trusted security software.";
    }

    if (text.includes("hack") || text.includes("hacked")) {
        return "If your account is hacked, change its password from a trusted device, secure your recovery email, activate two-factor authentication and review recent account activity.";
    }

    if (text.includes("wifi") || text.includes("network")) {
        return "Protect your Wi-Fi with WPA2 or WPA3 encryption and a strong router password. Update your router and avoid sensitive activities on untrusted public Wi-Fi.";
    }

    if (text.includes("email")) {
        return "Check the sender's address carefully. Avoid unexpected attachments and links, and never share passwords or verification codes by email.";
    }

    if (text.includes("2fa") || text.includes("two-factor")) {
        return "Two-factor authentication adds an extra security step when you sign in. Even if someone discovers your password, they may still be unable to access your account.";
    }

    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
        return "Hello! 💗 Welcome to CyberGuard AI. What would you like to learn about cybersecurity?";
    }

    if (text.includes("thank")) {
        return "You're welcome! 💗 Stay safe and protected online!";
    }

    return "I'm here to help with cybersecurity! You can ask me about phishing, password security, malware, hacked accounts, email protection or Wi-Fi security.";
}
