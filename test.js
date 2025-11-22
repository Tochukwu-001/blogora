const box = document.getElementById("box");
const buttons = document.querySelectorAll("buttons");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (value == "ce") {
      box.value = "";
    } else if (value == "=") {
      try {
        // here
        box.value = eval(box.value);
      } catch {
        display.value = "error";
      }
    } else {
      box.value += "value";
    }
  });
});

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (value === "ce") {
      box.value = ""; 
    } else if (value === "=") {
      try {
        box.value = eval(box.value);
      } catch {
        box.value = "Error";
      }
    } else {
      box.value += value;
    }
  });
});
