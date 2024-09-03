const stars = document.querySelectorAll(".star");
// console.log(stars);
const sectionSelec = document.querySelector("section");
const feedbackBtn = document.querySelector("button");
const getMain = document.querySelector("main");

let selectedStar = false;

stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    // console.log(index);
    selectedStar = true;
    stars.forEach((star, index2) => {
      if (index >= index2) {
        star.classList.add("filled");
      } else {
        star.classList.remove("filled");
      }
    });
  });

  star.addEventListener("mouseover", () => {
    stars.forEach((star, index2) => {
      if (index >= index2) {
        star.classList.add("hovered");
      } else {
        star.classList.remove("hovered");
      }
    });
  });

  star.addEventListener("mouseout", () => {
    stars.forEach((star) => {
      star.classList.remove("hovered");
    });
  });
});

const feedbackTitle = document.createElement("h1");
const feedbackSubtitle = document.createElement("h3");

// console.log(feedback);
feedbackBtn.addEventListener("click", () => {
  if (selectedStar === true) {
    sectionSelec.style.display = "none";
    feedbackTitle.innerHTML = `Thanks for your feedback!<br><br>`;
    feedbackTitle.style.textAlign = "center";
    getMain.appendChild(feedbackTitle);
    const welcome = document.querySelector("#welcome");
  } else {
    sectionSelec.style.display = "none";
    feedbackTitle.innerHTML = `Where is your feedback?!<br><br>`;
    feedbackTitle.style.textAlign = "center";
    feedbackSubtitle.innerHTML = `<p>PLEASE LEAVE US A FEEDBACK</p><button onclick="window.location.reload(true);" style="width: 5rem"> <img src="./assets/img/arrow-back-outline.svg" style="width: 2rem"></button>`;
    getMain.appendChild(feedbackTitle);
    feedbackTitle.appendChild(feedbackSubtitle);
  }
});
