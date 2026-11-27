
function togglePasswordVisibility() {
    const password = document.getElementById("password");
    const button = document.getElementById("togglePassword");

    if (password.type === "password") {
        password.type = "text";
        button.textContent = "Hide";
    } else {
        password.type = "password";
        button.textContent = "Show";
    }
}

function checkPassword() {
    const password = document.getElementById("password").value;
    const result = document.getElementById("password-result");

    if (password.length === 0) {
        result.innerHTML = "";
        return;
    }

    let score = 0;
    let tips = [];

    if (password.length >= 8) score++;
    else tips.push("Use at least 8 characters.");

    if (password.length >= 12) score++;

    if (/[A-Z]/.test(password)) score++;
    else tips.push("Add an uppercase letter.");

    if (/[a-z]/.test(password)) score++;
    else tips.push("Add a lowercase letter.");

    if (/[0-9]/.test(password)) score++;
    else tips.push("Add a number.");

    if (/[^A-Za-z0-9]/.test(password)) score++;
    else tips.push("Add a special character such as @ or !.");

    let level;
    let color;

    if (score <= 2) {
        level = "WEAK";
        color = "#df668b";
    } else if (score <= 4) {
        level = "MEDIUM";
        color = "#d99a48";
    } else {
        level = "STRONG";
        color = "#63a88a";
    }

    let tipsHTML = tips.length
        ? tips.map(tip => "<li>" + tip + "</li>").join("")
        : "<li>Great! Your password meets all the basic checks.</li>";

    result.innerHTML = `
        <h2 style="color:${color}">${level}</h2>
        <p>Strength Score: ${score}/6</p>
        <div class="strength-bar">
            <div style="width:${(score / 6) * 100}%; background:${color};"></div>
        </div>
        <h3>💡 Security Tips</h3>
        <ul>${tipsHTML}</ul>
    `;
}
