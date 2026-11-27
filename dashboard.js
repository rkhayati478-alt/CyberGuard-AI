
// Get saved statistics
const stats = JSON.parse(localStorage.getItem("cyberStats")) || {
    messages: 0,
    urls: 0,
    quizzes: 0
};

// Update dashboard numbers
function updateDashboard() {

    const total = stats.messages + stats.urls;

    document.getElementById("total-analyses").textContent = total;
    document.getElementById("message-count").textContent = stats.messages;
    document.getElementById("url-count").textContent = stats.urls;
    document.getElementById("quiz-count").textContent = stats.quizzes;

}

// Display statistics
updateDashboard();
