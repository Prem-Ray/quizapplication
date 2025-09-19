const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hypertext Transfer Protocol",
      "Hypertext Markup Language",
      "Hyperlink and Text Markup Language",
      "Hypertext Machine Language",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which method is used to add elements to an array in JavaScript?",
    options: ["push()", "add()", "append()", "insert()"],
    correctAnswer: 0,
  },
  {
    question: "Which property is used to change the background color in CSS?",
    options: ["color", "bg-color", "bgColor", "background-color"],
    correctAnswer: 3,
  },
  {
    question: "Which element is used for the largest heading in HTML?",
    options: ["<h2>", "<h3>", "<h1>", "<h6>"],
    correctAnswer: 2,
  },
  {
    question: "Which CSS property is used to change the text color?",
    options: ["text-color", "color", "font-color", "text-style"],
    correctAnswer: 1,
  },
  {
    question: "How do you declare a JavaScript variable?",
    options: ["variable name", "declare name", "var name", "define name"],
    correctAnswer: 2,
  },
  {
    question: "Which HTML attribute specifies alternate text for an image?",
    options: ["title", "src", "alt", "longdesc"],
    correctAnswer: 2,
  },
  {
    question: "How do you make a list with square bullets in CSS?",
    options: [
      "list-type: square",
      "list-style-type: square",
      "list-square: true",
      "list-style: square",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onchange", "onmouseclick", "onclick", "onmouseover"],
    correctAnswer: 2,
  },
];

const questions = document.querySelector(".question");
const answers = document.querySelectorAll(".answer");
const optionLabels = ["#option1", "#option2", "#option3", "#option4"].map(
  (id) => document.querySelector(id)
);
const button = document.querySelector("#btn");
const resultSection = document.querySelector(".result");
const scoreSection = document.querySelector(".scoreSection");
const resultMessage = resultSection.querySelector("p");
const startBtn = document.getElementById("startBtn");
const introSection = document.querySelector(".introduction-section");
const quizSection = document.querySelector(".quiz-section");
const clock = document.getElementById("clock");
const totaltime = document.getElementById("timeTaken");
const guideBtn = document.getElementById("viewGuidelinesBtn");
const guideModal = document.getElementById("guidelinesModal");

let currentQuiz = 0;
let score = 0;
let cheatingWarnings = 0;
const MAX_WARNINGS = 3;
let examStarted = false;
let timer;
let totalSeconds = 0;

guideBtn.addEventListener("click", () => {
  guideModal.classList.add("active");
  guideModal.focus();
});

guideModal.addEventListener("click", (e) => {
  if (e.target === guideModal) guideModal.classList.remove("active");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && guideModal.classList.contains("active")) {
    guideModal.classList.remove("active");
  }
});

function loadQuiz() {
  if (!examStarted) return;
  const { question, options } = quizData[currentQuiz];
  questions.innerText = `${currentQuiz + 1}: ${question}`;
  optionLabels.forEach((label, i) => (label.innerText = options[i]));
  deSelectAnswer();
  resultSection.style.display = "none";
  quizSection.style.display = "block";
}

function getSelectedOption() {
  let answerIndex = null;
  answers.forEach((item, i) => {
    if (item.checked) answerIndex = i;
  });
  return answerIndex;
}

function deSelectAnswer() {
  answers.forEach((item) => (item.checked = false));
}

function startTimer() {
  totalSeconds = 0;
  clock.textContent = "Time: 00:00";
  timer = setInterval(() => {
    totalSeconds++;
    clock.textContent = "Time: " + formatTime(totalSeconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

function endQuizWithCheating(message) {
  cheatingWarnings++;
  if (cheatingWarnings < MAX_WARNINGS) {
    alert(`Warning ${cheatingWarnings}/${MAX_WARNINGS}: ${message}`);
  } else {
    alert(
      `Final Warning ${MAX_WARNINGS}/${MAX_WARNINGS}: ${message} - Exam closed.`
    );
    examStarted = false;
    stopTimer();
    showResultSection(
      `${score}/${quizData.length} Correct Answers`,
      `Exam closed due to repeated cheating: ${message}`
    );
  }
}

function showResultSection(scoreText, messageText) {
  stopTimer();
  scoreSection.innerText = scoreText;
  resultMessage.innerText = messageText;
  totaltime.textContent = formatTime(totalSeconds);
  quizSection.style.display = "none";
  resultSection.style.display = "block";
}

button.addEventListener("click", () => {
  if (!examStarted) return alert("Please start the exam.");
  const selected = getSelectedOption();
  if (selected === null) return;
  if (selected === quizData[currentQuiz].correctAnswer) score++;
  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    examStarted = false;
    showResultSection(
      `${score}/${quizData.length} Correct Answers`,
      "🎉Congratulations on completing the quiz! 🎊 "
    );
  }
});

startBtn.addEventListener("click", () => {
  guideModal.classList.remove("active");
  examStarted = true;
  cheatingWarnings = 0;
  currentQuiz = 0;
  score = 0;
  introSection.style.display = "none";
  quizSection.style.display = "block";
  loadQuiz();
  startTimer();
});

function reload() {
  cheatingWarnings = 0;
  currentQuiz = 0;
  score = 0;
  examStarted = false;
  deSelectAnswer();
  resultSection.style.display = "none";
  quizSection.style.display = "none";
  introSection.style.display = "block";
  clock.textContent = "Time: 00:00";
  totalSeconds = 0;
  stopTimer();
}

const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

if (isMobile) {
  let lastBlurTime = 0;
  let blurTimeout;

  window.addEventListener("blur", () => {
    if (examStarted) {
      blurTimeout = setTimeout(() => {
        const now = Date.now();

        if (now - lastBlurTime < 2000) return;
        lastBlurTime = now;

        endQuizWithCheating("Cheating detected: You switched away from the quiz (mobile).");
      }, 1000); 
    }
  });

  window.addEventListener("focus", () => {
    clearTimeout(blurTimeout);
  });
}



document.addEventListener("visibilitychange", () => {
  if (examStarted && document.hidden) {
    endQuizWithCheating("You switched tabs or minimized the browser.");
  }
});

document.addEventListener("contextmenu", (e) => {
  if (examStarted) {
    e.preventDefault();
    endQuizWithCheating("Right click is disabled.");
  }
});

["copy", "paste"].forEach((evt) =>
  document.addEventListener(evt, (e) => {
    if (examStarted) {
      e.preventDefault();
      endQuizWithCheating(`${evt} action is disabled.`);
    }
  })
);

const blockedKeys = [
  "F12",
  "Tab",
  "Escape",
  "F3",
  "F4",
  "F5",
  "F6",
  "Meta",
  "Alt",
];
const blockedCombinations = [
  { ctrl: true, key: "u" },
  { ctrl: true, key: "i" },
  { ctrl: true, key: "c" },
  { ctrl: true, key: "j" },
  { ctrl: true, key: "s" },
  { ctrl: true, key: "p" },
  { ctrl: true, key: "h" },
  { ctrl: true, key: "f" },
  { ctrl: true, key: "n" },
  { ctrl: true, key: "t" },
  { ctrl: true, key: "w" },
  { ctrl: true, key: "q" },
  { ctrl: true, key: "r" },
  { ctrl: true, key: "l" },
  { ctrl: true, key: "d" },
  { ctrl: true, key: "e" },
  { ctrl: true, key: "b" },
  { ctrl: true, key: "m" },
  { ctrl: true, key: "k" },
  { ctrl: true, key: "y" },
  { ctrl: true, key: "z" },
];

document.addEventListener("keydown", (e) => {
  if (!examStarted) return;
  if (blockedKeys.includes(e.key)) {
    e.preventDefault();
    endQuizWithCheating("Blocked key detected.");
  }
  if (
    blockedCombinations.some(
      (combo) =>
        !!combo.ctrl === (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === combo.key
    )
  ) {
    e.preventDefault();
    endQuizWithCheating("Blocked shortcut detected.");
  }
});

window.addEventListener("beforeunload", (e) => {
  if (examStarted) {
    endQuizWithCheating("Page reload is not allowed.");
  }
});

deSelectAnswer();
