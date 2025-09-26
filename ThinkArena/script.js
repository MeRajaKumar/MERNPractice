// Question Bank
const quizData = {
  math: mathQuestions,
  science: scienceQuestions
};


// Variables
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Start Quiz
document.getElementById("startBtn").addEventListener("click", () => {
  let subject = document.getElementById("subject").value;
  let difficulty = document.getElementById("difficulty").value;
  questions = quizData[subject][difficulty];

  currentQuestionIndex = 0;
  score = 0;

  document.getElementById("setup").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  loadQuestion();
});

// Load Question
function loadQuestion() {
  let q = questions[currentQuestionIndex];
  document.getElementById("question").innerText = q.question;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => selectAnswer(opt, q.answer);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("nextBtn").style.display = "none";
}

// Select Answer
function selectAnswer(selected, correct) {
  if (selected === correct) score++;
  document.getElementById("nextBtn").style.display = "inline-block";
}

// Next Question
document.getElementById("nextBtn").addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
});

// End Quiz
function endQuiz() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("score").innerText = `${score}/${questions.length}`;
}

// Restart Quiz
document.getElementById("restartBtn").addEventListener("click", () => {
  document.getElementById("result").style.display = "none";
  document.getElementById("setup").style.display = "block";
});

// Hero Start Button
document.getElementById("heroStartBtn").addEventListener("click", () => {
  document.querySelector(".hero").style.display = "none";
  document.getElementById("setup").style.display = "block";
});


// Back button - Hero Section pe wapas
document.getElementById("backBtn").addEventListener("click", () => {
  document.getElementById("setup").style.display = "none";  // Setup hide
  document.querySelector(".hero").style.display = "flex";    // Hero show
});

// Hero Start Button
document.getElementById("heroStartBtn").addEventListener("click", () => {
  document.querySelector(".hero").style.display = "none";
  document.getElementById("subjectDashboard").style.display = "block";
});

// Subject Card Click
const subjectCards = document.querySelectorAll(".subject-card");
subjectCards.forEach(card => {
  card.addEventListener("click", () => {
    const selectedSubject = card.getAttribute("data-subject");
    // Save selected subject globally
    window.selectedSubject = selectedSubject;

    // Hide dashboard, show difficulty selection
    document.getElementById("subjectDashboard").style.display = "none";
    document.getElementById("setup").style.display = "block";

    // Optional: Preselect subject in setup dropdown
    document.getElementById("subject").value = selectedSubject;
  });
});
