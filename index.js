const checkbox = document.getElementById("myCheckbox");
const button = document.getElementById("myButton");
const illuminated = document.querySelector(".illuminated");

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
    window.location.href = "https://www.esempio.com";
  } else {
    btn.classList.remove("illuminated");
  }
});

checkbox.addEventListener("change", updateButtonState);
