const stars = document.querySelectorAll(".star");
const sectionSelec = document.querySelector("section");
const feedbackBtn = document.querySelector("button");
const getMain = document.querySelector("main");

let selectedStar = false;

stars.forEach((star, index) => {
  star.addEventListener("click", () => {
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

feedbackBtn.addEventListener("click", () => {
  if (selectedStar === true) {
    const stars = document.querySelectorAll(".star.filled").length;
    sectionSelec.style.display = "none";
    feedbackTitle.innerHTML = `Thanks for your feedback!<br><br>`;
    feedbackTitle.style.textAlign = "center";
    const iframe = document.createElement("iframe");
    if (stars <= 6) {
      iframe.src = "./assets/gif/sad.webp";
      iframe.width = "250";
      iframe.height = "300";
    } else if (stars <= 8) {
      iframe.src = "./assets/gif/meh.webp";
      iframe.width = "500";
      iframe.height = "500";
    } else {
      iframe.src = "./assets/gif/happy.webp";
      iframe.width = "500";
      iframe.height = "300";
    }
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
    iframe.height = "179";
    iframe.style.border = "0";
    iframe.allowFullscreen = true;
    feedbackTitle.appendChild(iframe);
    const button = document.createElement("button");
    button.style.width = "5rem";
    button.innerHTML = `<span id="span-feedback">&#8676;</span>`;
    button.onclick = () => window.location.reload(true);
    feedbackSubtitle.appendChild(button);
    feedbackTitle.appendChild(feedbackSubtitle);
    getMain.appendChild(feedbackTitle);
  }
});
