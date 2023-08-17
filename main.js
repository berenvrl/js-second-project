//Selecting display area
const display = document.querySelector(".displayArea");
//Selecting buttons
const buttons = document.querySelectorAll(".btn-dark");
const plusButton = document.querySelector(".plusBtn");
const minusButton = document.querySelector(".minusBtn");
const equalsButton = document.querySelector(".equalsBtn");
const multiplyButton = document.querySelector(".multiplyBtn");
const dividerButton = document.querySelector(".dividerBtn");
const clearButton = document.querySelector(".clearBtn");
const undoButton = document.querySelector(".minusPlusBtn");
const remainderButton = document.querySelector(".remainderBtn");

//Initial values
let currentCalculation = "";
let currentResult = 0;
let sign = "";
let newOperation = true;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.innerHTML;

    if (newOperation) {
      currentCalculation = buttonValue;
      newOperation = false;
    } else {
      currentCalculation += buttonValue;
    }
    display.value = currentCalculation;
  });
});

//addition
plusButton.addEventListener("click", () => {
  operate();
  sign = "+";
  newOperation = true;
});

//Substraction
minusButton.addEventListener("click", () => {
  operate();
  sign = "-";
  newOperation = true;
});

//Multiplication
multiplyButton.addEventListener("click", () => {
  operate();
  sign = "*";
  newOperation = true;
});

//Division
dividerButton.addEventListener("click", () => {
  operate();
  sign = "/";
  newOperation = true;
});

remainderButton.addEventListener("click", () => {
  operate();
  sign = "%";
  newOperation = true;
});

equalsButton.addEventListener("click", () => {
  operate();
  sign = "";
  newOperation = true;
});

clearButton.addEventListener("click", () => {
  currentCalculation = "";
  currentResult = 0;
  sign = "";
  newOperation = true;
  display.value = "0";
});

undoButton.addEventListener("click", () => {
  if (currentCalculation.length > 0) {
    currentCalculation = currentCalculation.slice(0, -1);
    display.value = currentCalculation;
  }
});

//This function must take num1,num2 and operation!!!!!
function operate() {
  if (currentCalculation !== "") {
    const currentValue = parseFloat(currentCalculation);
    if (sign === "+") {
      currentResult += currentValue;
    } else if (sign === "-") {
      currentResult -= currentValue;
    } else if (sign === "*") {
      currentResult *= currentValue;
    } else if (sign === "%") {
      currentResult = (currentValue / 100) * currentResult;
      currentResult = parseFloat(currentResult.toFixed(2));
    } else if (sign === "/") {
      if (currentValue === 0) {
        display.value = "error";
        return;
      }
      currentResult /= currentValue;
      currentResult = currentResult.toFixed(2);
    } else {
      currentResult = currentValue;
    }
    display.value = currentResult;
    currentCalculation = "";
  }
}
