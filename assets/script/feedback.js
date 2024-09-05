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
      console.log(index, index2);
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

feedbackBtn.addEventListener("click", () => {
  if (selectedStar === true) {
    sectionSelec.style.display = "none";
    feedbackTitle.innerHTML = `Thanks for your feedback!<br><br>`;
    feedbackTitle.style.textAlign = "center";
    const iframe = document.createElement("iframe");
    iframe.src = "https://giphy.com/embed/t3sZxY5zS5B0z5zMIz";
    iframe.width = "480";
    iframe.height = "269";
    iframe.style.border = "0";
    iframe.allowFullscreen = true;
    feedbackTitle.appendChild(iframe);
    getMain.appendChild(feedbackTitle);
  } else {
    sectionSelec.style.display = "none";
    feedbackTitle.innerHTML = `Where is your feedback?!<br><br>`;
    feedbackTitle.style.textAlign = "center";
    feedbackSubtitle.innerHTML = `<p>PLEASE LEAVE US A FEEDBACK</p>`;
    const iframe = document.createElement("iframe");
    iframe.src = "https://giphy.com/embed/pFZTlrO0MV6LoWSDXd";
    iframe.width = "480";
    iframe.height = "180";
    iframe.style.border = "0";
    iframe.allowFullscreen = true;
    feedbackTitle.appendChild(iframe);
    const button = document.createElement("button");
    button.style.width = "5rem";
    button.innerHTML = `<span>&#8676;</span>`;
    button.onclick = () => window.location.reload(true);
    feedbackSubtitle.appendChild(button);
    feedbackTitle.appendChild(feedbackSubtitle);
    getMain.appendChild(feedbackTitle);
  }
});
