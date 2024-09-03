const gradientDiv = document.querySelector(".hero > div");
const h6 = document.querySelector(".ps-abdsolute > h6");
const p = document.querySelector(".ps-abdsolute > p");
const correctPerc = document.getElementById("correct-perc");
const correctRapp = document.getElementById("correct-rapp");
const wrongPerc = document.getElementById("wrong-perc");
const wrongRapp = document.getElementById("wrong-rapp");
let andreaCss = document.styleSheets[2];
console.log(andreaCss.cssRules.length);
for (let i = 0; i < andreaCss.cssRules.length; i++) {
  console.log(andreaCss.cssRules[i].cssText);
}

const correct = 80.5;

const wrong = 19.5;

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
      background-image: conic-gradient(#c2128d 0% ${correct}%, #00ffff 0% ${wrong}%);
      mask: radial-gradient(farthest-side, transparent 70%, black 71%);
      z-index: 1;
      } `,
      i
    );
    break;
  }
}
