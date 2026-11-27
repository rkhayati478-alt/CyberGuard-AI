
function sendMessage(event) {
    event.preventDefault();

    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    const message = input.value.trim();

    if (message === "") return;

    addMessage(message, "user-message");

    const response = getResponse(message);

    setTimeout(function () {
        addMessage(response, "bot-message");
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 400);

    input.value = "";
}

function addMessage(message, className) {
    const chatBox = document.getElementById("chatBox");

    const messageDiv = document.createElement("div");
    messageDiv.className = "message " + className;

    const title = document.createElement("strong");
    title.textContent = className === "user-message"
        ? "👤 You"
        : "🤖 CyberGuard AI";

    const paragraph = document.createElement("p");
    paragraph.textContent = message;

    messageDiv.appendChild(title);
    messageDiv.appendChild(paragraph);

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getResponse(message) {
    const text = message.toLowerCase();

    if (text.includes("phishing")) {
        return "Phishing is a cyberattack where criminals send fake emails or messages to steal personal information. Never click suspicious links!";
    }

    if (text.includes("password")) {
        return "Use a strong password with uppercase and lowercase letters, numbers and symbols. Avoid using the same password for multiple accounts.";
    }

    if (text.includes("virus") || text.includes("malware")) {
        return "Malware is malicious software designed to damage devices or steal information. Use trusted antivirus software and avoid downloading unknown files.";
    }

    if (text.includes("hack") || text.includes("hacked")) {
        return "If your account is hacked, change your password immediately, activate two-factor authentication and check your account activity.";
    }

    if (text.includes("wifi") || text.includes("network")) {
        return "Avoid connecting to unknown public Wi-Fi networks. Use secure networks and avoid entering sensitive information on unsecured connections.";
    }

    if (text.includes("email")) {
        return "Be careful with unexpected emails, suspicious attachments and unknown links. Always verify the sender before responding.";
    }

    if (text.includes("2fa") || text.includes("two-factor")) {
        return "Two-factor authentication (2FA) adds another layer of security by requiring a second verification step when you sign in.";
    }

    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
        return "Hello! 💗 I'm CyberGuard AI. How can I help you with cybersecurity today?";
    }

    if (text.includes("thank")) {
        return "You're welcome! 💗 Stay safe online!";
    }

    return "That's an interesting question! I can help you with phishing, passwords, malware, hacked accounts, email security and Wi-Fi protection. Try asking me about one of these topics.";
}
