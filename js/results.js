window.onload = function () {
  const gradientDiv = document.querySelector(".hero > div");
  const divGradientText = document.querySelector(".ps-abdsolute");
  const h6 = document.querySelector(".ps-abdsolute > h6");
  const p = document.querySelector(".ps-abdsolute > p");
  const correctPerc = document.getElementById("correct-perc");
  const correctRapp = document.getElementById("correct-rapp");
  const wrongPerc = document.getElementById("wrong-perc");
  const wrongRapp = document.getElementById("wrong-rapp");
  const footer = document.querySelector("footer");

  let andreaCss = document.styleSheets[2];

  const correctScore = localStorage.getItem("score") * 10;
  const totalQuestions = localStorage.getItem("totalQuestions") * 10;
  const userAnswers = JSON.parse(localStorage.getItem("userAnswers"));
  console.log(userAnswers);

  const wrongScore = totalQuestions - correctScore;
  const correctPerce = correctScore / totalQuestions;
  const wrongPerce = wrongScore / totalQuestions;

  let currentProgress = 0;

  const updateGradient = () => {
    if (currentProgress <= 1) {
      let correctEnd, wrongEnd;

      if (wrongPerce === 0) {
        correctEnd = 100;
        wrongEnd = 0;
      } else {
        correctEnd = Math.round(correctPerce * currentProgress * 100);
        wrongEnd = Math.round(wrongPerce * currentProgress * 100);
      }

      for (let i = 0; i < andreaCss.cssRules.length; i++) {
        if (andreaCss.cssRules[i].selectorText === ".hero > div::before") {
          andreaCss.deleteRule(i);

          andreaCss.insertRule(
            `
            .hero > div::before{
              content: "";
              display: block;
              width: 300px;
              height: 300px;
              border-radius: 50%;
              background-image: conic-gradient(from 180deg, #00ffff 0% ${correctEnd}%, #c2128d 0% ${wrongEnd}%);
              mask: radial-gradient(farthest-side, transparent 70%, black 71%);
              z-index: 1;
              transform: rotate(180deg); /* Ruota di 180 gradi per ottenere il movimento antiorario */
            } `,
            i
          );
          break;
        }
      }

      currentProgress += 0.02;
    } else {
      clearInterval(gradientInterval);
    }
  };

  const gradientInterval = setInterval(updateGradient, 15);

  gradientDiv.style.animation = "rotateGradient 1s linear 1";

  correctPerc.innerHTML = `${Math.ceil((correctScore / totalQuestions) * 100)}%`;
  wrongPerc.innerHTML = `${Math.floor((wrongScore / totalQuestions) * 100)}%`;

  correctRapp.innerHTML = `${correctScore / 10}/${totalQuestions / 10} `;
  wrongRapp.innerHTML = `${wrongScore / 10}/${totalQuestions / 10}`;

  if (correctPerce * 100 < 60) {
    h6.innerHTML = `
    Keep Trying!
    <p class="color">You didn't pass this time.</p>
    `;
    p.innerHTML = `We’re sorry, but we can’t send <br />
    you the certificate right now. <br />
    Please try again later and <br />
    check your details.`;

    divGradientText.style.left = "3.9rem";
    divGradientText.style.top = "5.5rem";
  } else {
    console.log("Launching confetti!");
    const duration = 2 * 300;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 70,
        spread: 60,
        startVelocity: 90,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 7,
        angle: 110,
        spread: 60,
        startVelocity: 90,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
  let correctAnswer;
  let selectedAnswer;
  let question;
  let tBody = document.querySelector("tbody");

  for (let i = 0; i < userAnswers.length; i++) {
    console.log(userAnswers[i]);
    correctAnswer = userAnswers[i].correctAnswer;
    selectedAnswer = userAnswers[i].selectedAnswer;
    question = userAnswers[i].question;
    let tr = document.createElement("tr");
    let tdQ = document.createElement("td");
    let tdSa = document.createElement("td");
    let tdCa = document.createElement("td");

    if (userAnswers[i].isCorrect === true) {
      tdQ.innerHTML = `<span class="is-correct-true">&#10003;</span> <p class="display-inline">${question}</p>`;
    } else {
      tdQ.innerHTML = `<span class="is-correct-false">X</span> <p class="display-inline" >${question}</p>`;
    }
    tdQ.style.textAlign = "left";
    tdSa.innerHTML = `${selectedAnswer}`;
    tdCa.innerHTML = `${correctAnswer}`;
    tBody.appendChild(tr);
    tr.appendChild(tdQ);
    tr.appendChild(tdSa);
    tr.appendChild(tdCa);
  }
};
