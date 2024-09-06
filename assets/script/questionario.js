document.addEventListener("DOMContentLoaded", function () {
  const questionNumberElement = document.getElementById("questionNumber");
  const questionElement = document.getElementById("question");
  const answerList = document.getElementById("answerList");
  const startQuizButton = document.getElementById("startQuizButton");
  const extractedQuestions = [];
  const timer = document.getElementById("timer");

  timer.style.display = "none";

  startQuizButton.addEventListener("click", function () {
    const difficultySelect = document.getElementById("difficultySelect");
    const selectedDifficulty = difficultySelect.value;
    const numQuestionsInput = document.getElementById("numQuestions");
    const numQuestions = parseInt(numQuestionsInput.value, 10);

    let selectedQuestions = [];

    switch (selectedDifficulty) {
      case "easy":
        selectedQuestions = questionsEasy;
        break;
      case "medium":
        selectedQuestions = questionsMedium;
        break;
      case "hard":
        selectedQuestions = questionsHard;
        break;
    }

    document.getElementById("selectChoice").style.display = "none";
    timer.style.display = "block";
    startQuiz(selectedQuestions, numQuestions);
  });

  function startQuiz(questions, numQuestions) {
    let countdown;
    let interval;
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
    let selectedQuestions = [];

    const startCountdown = () => {
      countdown = 60;
      updateDisplay(countdown);
      updateCircleProgress();

      interval = setInterval(() => {
        countdown--;
        updateDisplay(countdown);
        updateCircleProgress();
        if (countdown <= 0) {
          clearInterval(interval);
          loadNextQuestion();
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
      const progress = (countdown / 61) * 352;
      const circleProgress = document.querySelector("#circle-progress");
      circleProgress.style.strokeDashoffset = progress;
    }

    function loadNextQuestion() {
      currentQuestionIndex = getQuestionIndex();
      if (extractedQuestions.length < numQuestions) {
        loadQuestion();
      } else {
        endTest();
      }
    }

    function loadQuestion() {
      const question = questions[currentQuestionIndex];
      questionElement.textContent = question.question;

      questionNumberElement.innerHTML = `QUESTION  ${extractedQuestions.length}  / <span id="color-span">
      ${numQuestions}
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
      shuffleArray(answers);

      answerList.innerHTML = "";

      answers.forEach((answer) => {
        const li = document.createElement("li");
        li.classList.add("answer");
        li.dataset.answer = answer;
        li.textContent = answer;
        li.onclick = () => selectAnswer(answer);
        answerList.appendChild(li);
      });
      startCountdown();
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

      clearInterval(interval);

      setTimeout(() => {
        loadNextQuestion();
      }, 1000);
    }

    function endTest() {
      localStorage.setItem("score", score);
      localStorage.setItem("totalQuestions", numQuestions);
      localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
      localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
      window.location.href = "results.html";
    }

    function getQuestionIndex() {
      let flag = false;
      let currentQuestionIndex = 0;
      while (!flag) {
        let question = Math.floor(Math.random() * questions.length);
        if (!extractedQuestions.includes(question)) {
          extractedQuestions.push(question);
          flag = true;
          currentQuestionIndex = question;
        }
      }
      return currentQuestionIndex;
    }

    loadNextQuestion();
  }
});
