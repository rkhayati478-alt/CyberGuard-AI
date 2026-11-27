
const questions = [
    {
        question: "What is phishing?",
        answers: [
            "A computer programming language",
            "A fraudulent attempt to steal personal information",
            "A type of computer hardware",
            "A secure website"
        ],
        correct: 1,
        explanation: "Phishing is a cyberattack used to steal sensitive information."
    },
    {
        question: "Which password is the strongest?",
        answers: [
            "123456",
            "password",
            "rania123",
            "T!m3#Blue_92$Sky"
        ],
        correct: 3,
        explanation: "A strong password combines uppercase and lowercase letters, numbers and symbols."
    },
    {
        question: "What should you do with a suspicious link?",
        answers: [
            "Click on it immediately",
            "Share it with friends",
            "Avoid clicking and verify the sender",
            "Enter your password"
        ],
        correct: 2,
        explanation: "Never open suspicious links before checking their source."
    },
    {
        question: "What does HTTPS indicate?",
        answers: [
            "The connection between your browser and website is encrypted",
            "The website is guaranteed to be safe",
            "The website has no viruses",
            "The website is free"
        ],
        correct: 0,
        explanation: "HTTPS encrypts the connection, but it does not guarantee that a website is trustworthy."
    },
    {
        question: "What is malware?",
        answers: [
            "A security update",
            "Malicious software designed to harm or exploit devices",
            "A computer screen",
            "A strong password"
        ],
        correct: 1,
        explanation: "Malware is software designed to damage, disrupt or gain unauthorized access."
    },
    {
        question: "What is the purpose of two-factor authentication (2FA)?",
        answers: [
            "To make the internet faster",
            "To delete old files",
            "To add an extra layer of account security",
            "To create a new email"
        ],
        correct: 2,
        explanation: "2FA requires a second verification step in addition to your password."
    },
    {
        question: "What should you do with an unknown email attachment?",
        answers: [
            "Open it immediately",
            "Download it without checking",
            "Forward it to everyone",
            "Verify the sender before opening it"
        ],
        correct: 3,
        explanation: "Unknown attachments may contain malware. Verify the sender first."
    },
    {
        question: "Why are software updates important?",
        answers: [
            "They fix security vulnerabilities and bugs",
            "They remove all passwords",
            "They disable antivirus software",
            "They make every website safe"
        ],
        correct: 0,
        explanation: "Updates often fix vulnerabilities that attackers could exploit."
    },
    {
        question: "What is a firewall?",
        answers: [
            "A type of keyboard",
            "A security system that monitors and filters network traffic",
            "A social media application",
            "A file storage device"
        ],
        correct: 1,
        explanation: "A firewall controls network traffic according to security rules."
    },
    {
        question: "What should you do if your account is hacked?",
        answers: [
            "Ignore the problem",
            "Delete your computer",
            "Change your password and secure your account",
            "Share your password with friends"
        ],
        correct: 2,
        explanation: "Change your password, enable 2FA and check your account activity."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;


// DISPLAY QUESTION
function showQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    document.getElementById("question-number").textContent =
        `QUESTION ${currentQuestion + 1} / ${questions.length}`;

    document.getElementById("score-display").textContent =
        `⭐ Score: ${score}`;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progress-bar").style.width =
        progress + "%";

    let html = `
        <h3>${question.question}</h3>
        <div class="answers">
    `;

    question.answers.forEach((answer, index) => {

        html += `
            <button
                class="answer-option"
                onclick="checkAnswer(${index})">
                <span>${String.fromCharCode(65 + index)}.</span>
                ${answer}
            </button>
        `;

    });

    html += `
        </div>
        <div id="feedback"></div>
        <button id="next-button"
                onclick="nextQuestion()"
                disabled>
            ${currentQuestion === questions.length - 1
                ? "See Results →"
                : "Next Question →"}
        </button>
    `;

    document.getElementById("question-area").innerHTML = html;
}


// CHECK ANSWER
function checkAnswer(selectedIndex) {

    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer-option");

    const feedback =
        document.getElementById("feedback");

    buttons[question.correct].classList.add("correct-answer");

    if (selectedIndex === question.correct) {

        score++;

        feedback.innerHTML = `
            <p class="correct-feedback">✓ Correct answer!</p>
            <p>${question.explanation}</p>
        `;

    } else {

        buttons[selectedIndex].classList.add("wrong-answer");

        feedback.innerHTML = `
            <p class="wrong-feedback">✗ Incorrect answer!</p>
            <p>${question.explanation}</p>
        `;

    }

    document.getElementById("score-display").textContent =
        `⭐ Score: ${score}`;

    buttons.forEach(button => {
        button.disabled = true;
    });

    document.getElementById("next-button").disabled = false;
}


// NEXT QUESTION
function nextQuestion() {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }

}


// SAVE QUIZ IN DASHBOARD
function saveQuizResult() {

    let stats = JSON.parse(localStorage.getItem("cyberStats")) || {
        messages: 0,
        urls: 0,
        quizzes: 0
    };

    stats.quizzes++;

    localStorage.setItem("cyberStats", JSON.stringify(stats));
}


// SHOW FINAL RESULT
function showResult() {

    document.getElementById("question-area").style.display = "none";

    document.getElementById("question-number").textContent =
        "QUIZ COMPLETED";

    document.getElementById("score-display").textContent =
        `⭐ Score: ${score}/${questions.length}`;

    document.getElementById("progress-bar").style.width = "100%";

    let percentage = (score / questions.length) * 100;

    let emoji;
    let message;

    if (percentage >= 80) {
        emoji = "🏆";
        message = "Excellent! You're a Cybersecurity Expert!";
    } else if (percentage >= 50) {
        emoji = "🌸";
        message = "Good job! Keep learning and improving!";
    } else {
        emoji = "💗";
        message = "Keep practicing! You can become a Cybersecurity Pro!";
    }

    // Save completed quiz
    saveQuizResult();

    document.getElementById("quiz-result").innerHTML = `
        <div class="result-emoji">${emoji}</div>
        <h2>Quiz Completed!</h2>
        <div class="final-score">
            ${score} / ${questions.length}
        </div>
        <h3>${percentage}%</h3>
        <p>${message}</p>
        <button id="next-button" onclick="restartQuiz()">
            ↻ Try Again
        </button>
    `;
}


// RESTART QUIZ
function restartQuiz() {

    currentQuestion = 0;
    score = 0;
    answered = false;

    document.getElementById("question-area").style.display = "block";

    document.getElementById("quiz-result").innerHTML = "";

    showQuestion();
}


// START QUIZ
showQuestion();
