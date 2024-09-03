const checkbox = document.getElementById("myCheckbox");
const button = document.getElementById("myButton");
const divHome = document.querySelector(".box");

checkbox.addEventListener("change", function () {
  button.disabled = !this.checked;
  if (this.checked) {
    button.classList.add("illuminated");
    button.style.cursor = "pointer";
  } else {
    button.classList.remove("illuminated");
    button.style.cursor = "not-allowed";
  }
});

button.addEventListener("click", function () {
  if (checkbox.checked) {
    divHome.classList.add("hidden");
  } else {
    btn.classList.remove("illuminated");
  }
});
