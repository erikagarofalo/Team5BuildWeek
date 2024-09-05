const checkbox = document.getElementById("myCheckbox");
const button = document.getElementById("myButton");
const divHome = document.querySelector(".box");

if (checkbox && button && divHome) {
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      button.classList.add("illuminated");
      button.style.cursor = "pointer";
      button.disabled = false;
    } else {
      button.classList.remove("illuminated");
      button.style.cursor = "not-allowed";
      button.disabled = true;
    }
  });

  button.addEventListener("click", function () {
    if (!button.disabled) {
      button.style.backgroundColor = "rgb(0, 255, 255)";
    }
  });
}
