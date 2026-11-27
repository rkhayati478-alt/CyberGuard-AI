
function analyzeMessage() {

    const message = document.getElementById("message").value.trim();
    const result = document.getElementById("result");

    if (message === "") {
        result.innerHTML = "<p>Please enter a message first!</p>";
        return;
    }

    let score = 0;
    let reasons = [];

    const suspiciousWords = [
        "urgent",
        "verify your account",
        "click here",
        "password",
        "bank account",
        "suspended",
        "confirm your identity",
        "winner",
        "free money",
        "limited time"
    ];

    const lowerMessage = message.toLowerCase();

    suspiciousWords.forEach(word => {
        if (lowerMessage.includes(word)) {
            score += 1;
            reasons.push("Suspicious expression detected: " + word);
        }
    });

    const urls = message.match(/https?:\/\/[^\s]+/gi) || [];

    urls.forEach(url => {
        try {
            const parsedURL = new URL(url);

            if (parsedURL.protocol !== "https:") {
                score += 2;
                reasons.push("The link does not use HTTPS.");
            }

            // Check suspicious @ in URL
            if (parsedURL.username || parsedURL.password) {
                score += 2;
                reasons.push("The URL contains suspicious login information.");
            }

            if (parsedURL.hostname.split(".").length > 3) {
                score += 1;
                reasons.push("The URL contains several subdomains.");
            }

        } catch (error) {
            score += 1;
            reasons.push("An invalid URL was detected.");
        }
    });

    let level;
    let color;

    if (score >= 4) {
        level = "HIGH RISK";
        color = "#ff4444";
    } else if (score >= 2) {
        level = "MEDIUM RISK";
        color = "#ffaa33";
    } else {
        level = "LOW RISK";
        color = "#35d07f";
    }

    let details = reasons.length
        ? reasons.map(reason => "<li>" + reason + "</li>").join("")
        : "<li>No suspicious indicators were detected.</li>";

    result.innerHTML = `
        <h2 style="color:${color}">${level}</h2>
        <p>Risk Score: ${score}</p>
        <h3>Analysis details:</h3>
        <ul>${details}</ul>
        <p><strong>Note:</strong> This is a basic rule-based analysis, not a guarantee that the message is safe.</p>
    `;

    // SAVE ANALYSIS IN DASHBOARD
    let stats = JSON.parse(localStorage.getItem("cyberStats")) || {
        messages: 0,
        urls: 0,
        quizzes: 0
    };

    stats.messages++;

    localStorage.setItem("cyberStats", JSON.stringify(stats));
}
