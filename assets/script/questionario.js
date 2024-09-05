//import { questionsEasy, questionsMedium, questionsHard } from "./domande.js";

document.addEventListener("DOMContentLoaded", function () {
  const questionNumberElement = document.getElementById("questionNumber");
  const questionElement = document.getElementById("question");
  const answerList = document.getElementById("answerList");
  const startQuizButton = document.getElementById("startQuizButton");
  const timer = document.getElementById("timer");
  timer.style.display = "none";

  startQuizButton.addEventListener("click", function () {
    const difficultySelect = document.getElementById("difficultySelect");
    const selectedDifficulty = difficultySelect.value;
    const numQuestionsInput = document.getElementById("numQuestions");
    const numQuestions = parseInt(numQuestionsInput.value, 10);
    
    
    let selectedQuestions = [];

    if (selectedDifficulty === "easy") {
      selectedQuestions = questionsEasy.slice(0, numQuestions);
    } else if (selectedDifficulty === "medium") {
      selectedQuestions = questionsMedium.slice(0, numQuestions);
    } else if (selectedDifficulty === "hard") {
      selectedQuestions = questionsHard.slice(0, numQuestions);
    }

    document.getElementById("selectChoice").style.display = "none";
    timer.style.display = "block";
    startQuiz(selectedQuestions);
  });

  function startQuiz(questions) {
    let countdown; // Imposta il timer a 60 secondi
    let interval; // Variabile per il timer
    let currentQuestionIndex = 0; // Indice della domanda corrente
    let score = 0; // Punteggio del giocatore
    let userAnswers = []; // Storico delle risposte dell'utente
    let selectedQuestions = []; // Domande selezionate per il quiz

    const startCountdown = () => {
      countdown = 60;
      updateDisplay(countdown); // Aggiorna subito il display del timer
      updateCircleProgress(); // Aggiorna subito il cerchio di progresso

      interval = setInterval(() => {
        countdown--;
        updateDisplay(countdown); // Aggiorna il display del timer
        updateCircleProgress(); // Aggiorna il cerchio di progresso
        if (countdown <= 0) {
          clearInterval(interval); // Ferma il timer quando il countdown arriva a 0
          loadNextQuestion(); // Carica la prossima domanda
        }
      }, 1000);
    };

    const updateDisplay = (countdown) => {
      const remainingSeconds = countdown % 61;
      const timer = document.getElementById("textTimer");
      timer.innerHTML = `seconds <span class="remainingSeconds">${remainingSeconds} </span>remaining`;
      timer.style.color = "white";
      timer.style.display = "block";
      timer.style.width = "75px";
      timer.style.width = "75px";
      timer.style.textAlign = "center";
      timer.style.position = "relative";
      timer.style.bottom = "108px";
      timer.style.left = "51px";
    };

    function updateCircleProgress() {
      const progress = (countdown / 61) * 351;
      const circleProgress = document.querySelector("#circle-progress");
      circleProgress.style.strokeDashoffset = 351 - progress;
    }

    function loadNextQuestion() {
      currentQuestionIndex++; // Incrementa l'indice della domanda corrente
      if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Carica la prossima domanda se ce ne sono ancora
      } else {
        endTest(); // Termina il quiz se non ci sono più domande
      }
    }

    function loadQuestion() {
      const question = questions[currentQuestionIndex];
      questionElement.textContent = question.question; // Visualizza la domanda corrente

      questionNumberElement.innerHTML = `QUESTION  ${currentQuestionIndex + 1}  / <span id="color-span">
      ${questions.length}
      </span>`;
      const span = document.getElementById("color-span");
      span.style.color = "#d20094";

      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      const answers = [question.correct_answer, ...question.incorrect_answers];
      shuffleArray(answers); // Mescola l'array delle risposte

      answerList.innerHTML = ""; // Pulisce le risposte precedenti

      answers.forEach((answer) => {
        const li = document.createElement("li");
        li.classList.add("answer");
        li.dataset.answer = answer;
        li.textContent = answer;
        li.onclick = () => selectAnswer(answer); // Assegna l'evento click alla risposta
        answerList.appendChild(li);
      });
      startCountdown(); // Avvia il timer per la nuova domanda
    }

    function selectAnswer(selectedAnswer) {
      const question = questions[currentQuestionIndex];
      const correctAnswer = question.correct_answer;

      userAnswers.push({
        question: question.question,
        selectedAnswer,
        correctAnswer,
        isCorrect: selectedAnswer === correctAnswer,
      });

      if (selectedAnswer === correctAnswer) {
        score++;
      }

      const answerButtons = document.querySelectorAll(".answer");
      answerButtons.forEach((button) => {
        button.classList.remove("selected", "correct", "incorrect");
        if (button.dataset.answer === correctAnswer) {
          button.classList.add("correct");
        }
        if (button.dataset.answer === selectedAnswer && selectedAnswer !== correctAnswer) {
          button.classList.add("incorrect");
        }
      });

      const selectedButton = answerList.querySelector(`li[data-answer="${selectedAnswer}"]`);
      selectedButton.classList.add("selected");

      clearInterval(interval); // Ferma il timer corrente

      setTimeout(() => {
        loadNextQuestion(); // Carica la prossima domanda
      }, 400);
    }

    function endTest() {
      console.log("User Answers:", userAnswers); // Visualizza le risposte dell'utente nel console log
      localStorage.setItem("score", score); // Salva il punteggio in localStorage
      localStorage.setItem("totalQuestions", questions.length); // Salva il numero di domande totali in localStorage
      localStorage.setItem("currentQuestionIndex", currentQuestionIndex); // Salva l'indice della domanda corrente in localStorage
      window.location.href = "results.html"; // Reindirizza alla pagina dei risultati
    }

    loadQuestion(); // Inizia il quiz caricando la prima domanda
  }
});
