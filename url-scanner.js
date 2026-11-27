
function scanURL() {

    const input = document.getElementById("url").value.trim();
    const result = document.getElementById("url-result");

    if (input === "") {
        result.innerHTML = "<p>Please enter a URL first!</p>";
        return;
    }

    let url;

    try {
        url = new URL(input);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("Invalid protocol");
        }

    } catch (error) {
        result.innerHTML = `
            <h3>⚠️ Invalid URL</h3>
            <p>Please enter a valid link starting with http:// or https://</p>
        `;
        return;
    }

    let score = 0;
    let reasons = [];

    if (url.protocol !== "https:") {
        score += 2;
        reasons.push("The website does not use HTTPS.");
    }

    if (url.hostname.includes("xn--")) {
        score += 2;
        reasons.push("The domain uses encoded characters.");
    }

    if (url.hostname.split(".").length > 3) {
        score += 1;
        reasons.push("The domain contains several subdomains.");
    }

    if (url.hostname.includes("-")) {
        score += 1;
        reasons.push("The domain contains hyphens.");
    }

    if (url.username || url.password) {
        score += 3;
        reasons.push("The URL contains unusual login information.");
    }

    const suspiciousWords = [
        "login", "verify", "account", "secure",
        "update", "free", "bonus", "bank"
    ];

    suspiciousWords.forEach(word => {
        if (url.href.toLowerCase().includes(word)) {
            score += 1;
            reasons.push("Suspicious keyword detected: " + word);
        }
    });

    let level;
    let color;

    if (score >= 4) {
        level = "HIGH RISK";
        color = "#df668b";
    } else if (score >= 2) {
        level = "MEDIUM RISK";
        color = "#d99a48";
    } else {
        level = "LOW RISK";
        color = "#63a88a";
    }

    let details = reasons.length
        ? reasons.map(reason => "<li>" + reason + "</li>").join("")
        : "<li>No suspicious indicators were detected.</li>";

    result.innerHTML = `
        <h2 style="color:${color}">${level}</h2>
        <p><strong>Risk Score:</strong> ${score}</p>
        <h3>Analysis Details:</h3>
        <ul>${details}</ul>
        <p><strong>Note:</strong> This is a basic URL check. A low-risk result does not guarantee that a website is safe.</p>
    `;

    // SAVE URL SCAN IN DASHBOARD

    let stats = JSON.parse(localStorage.getItem("cyberStats")) || {
        messages: 0,
        urls: 0,
        quizzes: 0
    };

    stats.urls++;

    localStorage.setItem("cyberStats", JSON.stringify(stats));

}
