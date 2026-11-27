
const questions = [
    {
        question: "What is phishing?",
        answers: [
            "A type of computer",
            "A fake message used to steal information",
            "An antivirus program",
            "A secure website"
        ],
        correct: 1
    },
    {
        question: "Which password is the strongest?",
        answers: [
            "123456",
            "password",
            "Rania123",
            "T!m3#Blue_92"
        ],
        correct: 3
    },
    {
        question: "What should you do with a suspicious link?",
        answers: [
            "Click immediately",
            "Share it with friends",
            "Avoid opening it",
            "Enter your password"
        ],
        correct: 2
    },
    {
        question: "What does HTTPS indicate?",
        answers: [
            "The connection is encrypted",
            "The website is always safe",
            "The computer is protected",
            "The website is free"
        ],
        correct: 0
    },
    {
        question: "What is malware?",
        answers: [
            "A security update",
            "Malicious software",
            "A web browser",
            "A password manager"
        ],
        correct: 1
    },
    {
        question: "What is the purpose of 2FA?",
        answers: [
            "To delete files",
            "To make internet faster",
            "To add an extra security layer",
            "To share passwords"
        ],
        correct: 2
    },
    {
        question: "What should you do with an unknown email attachment?",
        answers: [
            "Open it immediately",
            "Download it",
            "Forward it",
            "Verify the sender first"
        ],
        correct: 3
    },
    {
        question: "Why are software updates important?",
        answers: [
            "They fix security vulnerabilities",
            "They remove all passwords",
            "They disable the internet",
            "They delete accounts"
        ],
        correct: 0
    },
    {
        question: "What is a firewall?",
        answers: [
            "A type of virus",
            "A security system that filters network traffic",
            "A social network",
            "A computer game"
        ],
        correct: 1
    },
    {
        question: "What should you do if your account is hacked?",
        answers: [
            "Ignore it",
            "Share your password",
            "Change your password and secure your account",
            "Delete your computer"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    document.getElementById("question-number").textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    document.getElementById("score-display").textContent =
        `Score: ${score}`;

    document.getElementById("progress-bar").style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    const area = document.getElementById("question-area");

    area.innerHTML = `
        <h3>${q.question}</h3>
        <div class="answers">
            ${q.answers.map((answer, index) => `
                <button class="answer-option" onclick="checkAnswer(${index})">
                    <span>${String.fromCharCode(65 + index)}</span>
                    ${answer}
                </button>
            `).join("")}
        </div>
        <p id="feedback"></p>
        <button id="next-button" onclick="nextQuestion()" disabled>
            Next Question →
        </button>
    `;
}

function checkAnswer(index) {
    if (answered) return;

    answered = true;

    const correct = questions[currentQuestion].correct;
    const options = document.querySelectorAll(".answer-option");
    const feedback = document.getElementById("feedback");

    options.forEach((option, i) => {
        option.disabled = true;

        if (i === correct) {
            option.classList.add("correct-answer");
        } else if (i === index) {
            option.classList.add("wrong-answer");
        }
    });

    if (index === correct) {
        score++;
        feedback.textContent = "✨ Correct answer! Well done!";
        feedback.style.color = "#63a88a";
    } else {
        feedback.textContent = "Not quite! The correct answer is highlighted.";
        feedback.style.color = "#df668b";
    }

    document.getElementById("score-display").textContent =
        `Score: ${score}`;

    document.getElementById("next-button").disabled = false;
}

function nextQuestion() {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("question-area").style.display = "none";
    document.getElementById("progress-bar").style.width = "100%";
    document.getElementById("question-number").textContent = "Quiz completed!";

    let title;
    let message;
    let emoji;

    if (score >= 8) {
        title = "Excellent!";
        message = "You have great cybersecurity knowledge!";
        emoji = "🏆";
    } else if (score >= 5) {
        title = "Good Job!";
        message = "You know the basics. Keep learning!";
        emoji = "🌸";
    } else {
        title = "Keep Learning!";
        message = "Review the cybersecurity basics and try again!";
        emoji = "💗";
    }

    document.getElementById("quiz-result").innerHTML = `
        <div class="result-emoji">${emoji}</div>
        <h2>${title}</h2>
        <div class="final-score">${score} / ${questions.length}</div>
        <p>${message}</p>
        <button onclick="restartQuiz()">↻ Try Again</button>
    `;

    document.getElementById("score-display").textContent =
        `Final Score: ${score}/${questions.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("question-area").style.display = "block";
    document.getElementById("quiz-result").innerHTML = "";

    showQuestion();
}

showQuestion();
