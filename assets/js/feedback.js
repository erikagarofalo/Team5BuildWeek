let length = document.getElementsByClassName("filter-stellina").length;
for (let i = 0; i < length; i++) {
  document.getElementsByClassName("filter-stellina")[i].addEventListener("click", function (event) {
    let id = event.target.id.replace("stellina", "");
    let value = parseInt(id);
    aggiornaStelline(value, "click");
  });
  document.getElementsByClassName("filter-stellina")[i].addEventListener("mouseover", function (event) {
    let id = event.target.id.replace("stellina", "");
    let value = parseInt(id);
    console.log(value);
    aggiornaStelline(value, "mouseover");
  });
}

function aggiornaStelline(value, type) {
  if (type === "click") {
    document.getElementsByClassName("filter-stellina")[value].classList.add("highlight");
  } else {
    let length = document.getElementsByClassName("filter-stellina").length;
    for (let i = 0; i < length; i++) {
      document.getElementsByClassName("filter-stellina")[i].classList.remove("highlight");
    }
    for (let i = 0; i <= value; i++) {
      document.getElementsByClassName("filter-stellina")[i].classList.add("highlight");
    }
  }
}
