window.onload = function () {
  const gradientDiv = document.querySelector(".hero > div");
  const divGradientText = document.querySelector(".ps-abdsolute");
  const h6 = document.querySelector(".ps-abdsolute > h6");
  const p = document.querySelector(".ps-abdsolute > p");
  const correctPerc = document.getElementById("correct-perc");
  const correctRapp = document.getElementById("correct-rapp");
  const wrongPerc = document.getElementById("wrong-perc");
  const wrongRapp = document.getElementById("wrong-rapp");

  let andreaCss = document.styleSheets[2];

  const correctScore = localStorage.getItem("score") * 10;
  const totalQuestions = localStorage.getItem("totalQuestions") * 10;
  const wrongScore = totalQuestions - correctScore;
  const correctPerce = correctScore / totalQuestions;
  const wrongPerce = wrongScore / totalQuestions;

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
      background-image: conic-gradient(#c2128d 0% ${wrongPerce * 100}%, #00ffff 0% ${correctPerce * 100}%);
      mask: radial-gradient(farthest-side, transparent 70%, black 71%);
      z-index: 1;
      } `,
        i
      );
      break;
    }
  }
  gradientDiv.style.animation = "rotateGradient 1s linear 1";

  if (correctPerce * 10 < 60) {
    h6.innerHTML = `
    Keep Trying!
    <span>You didn't pass this time.</span>
    `;
    p.innerHTML = `We’re sorry, but we can’t send <br />
    you the certificate right now. <br />
    Please try again later and <br />
    check your details.`;

    divGradientText.style.left = "3.9rem";
    divGradientText.style.top = "5.5rem";
  }

  correctPerc.innerHTML = `${correctScore}%`;
  wrongPerc.innerHTML = `${wrongScore}%`;

  correctRapp.innerHTML = `${correctScore / 10}/${totalQuestions / 10} `;
  wrongRapp.innerHTML = `${wrongScore / 10}/${totalQuestions / 10}`;
};
