const display = document.querySelector('.displayArea');
const buttons = document.querySelectorAll('.btn-dark');
const plusButton = document.querySelector('.plusBtn');
const minusButton = document.querySelector('.minusBtn');
const equalsButton = document.querySelector('.equalsBtn');
const multiplyButton = document.querySelector('.multiplyBtn');
const dividerButton = document.querySelector('.dividerBtn');
const clearButton = document.querySelector('.clearBtn');
const undoButton = document.querySelector('.minusPlusBtn');
const remainderButton = document.querySelector('.remainderBtn');

let currentCalculation = '';
let currentResult = 0;
let sign = '';
let newOperation = true;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonValue = button.innerHTML;

    if (newOperation) {
      currentCalculation = buttonValue;
      newOperation = false;
    } else {
      currentCalculation += buttonValue;
    }
    display.innerHTML = currentCalculation;
  });
});

plusButton.addEventListener('click', () => {
  operate();
  sign = '+';
  newOperation = true;
});

minusButton.addEventListener('click', () => {
  operate();
  sign = '-';
  newOperation = true;
});

multiplyButton.addEventListener('click', () => {
  operate();
  sign = '*';
  newOperation = true;
});

dividerButton.addEventListener('click', () => {
  operate();
  sign = '/';
  newOperation = true;
});

remainderButton.addEventListener('click', () => {
  operate();
  sign = '%';
  newOperation = true;
});

equalsButton.addEventListener('click', () => {
  operate();
  sign = '';
  newOperation = true;
});

clearButton.addEventListener('click', () => {
  currentCalculation = '';
  currentResult = 0;
  sign = '';
  newOperation = true;
  display.innerHTML = '0';
});

undoButton.addEventListener('click', () => {
  if (currentCalculation.length > 0) {
    currentCalculation = currentCalculation.slice(0, -1);
    display.innerHTML = currentCalculation;
  }
});

function operate() {
  if (currentCalculation !== '') {
    const currentValue = parseFloat(currentCalculation);
    if (sign === '+') {
      currentResult += currentValue;
    } else if (sign === '-') {
      currentResult -= currentValue;
    } else if (sign === '*') {
      currentResult *= currentValue;
    } else if (sign === '%') {
      currentResult = (currentValue / 100) * currentResult;
      currentResult = parseFloat(currentResult.toFixed(2));
    } else if (sign === '/') {
      if (currentValue === 0) {
        display.innerHTML = 'error';
        return;
      }
      currentResult /= currentValue;
      currentResult = currentResult.toFixed(2);
    } else {
      currentResult = currentValue;
    }
    display.innerHTML = currentResult;
    currentCalculation = '';
  }
}
// Add keyboard link to the calculator
document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Check if the pressed key is a number or operator key
  if (
    !isNaN(key) ||
    key === '+' ||
    key === '-' ||
    key === '*' ||
    key === '/' ||
    key === '%' ||
    key === '=' ||
    key === 'Enter'
  ) {
    // Simulate a click on the corresponding button
    const button = document.querySelector(`.keyboard[data-key="${key}"]`);
    if (button) {
      button.click();
    }
  } else if (key === 'Backspace') {
    // Simulate a click on the undo button
    undoButton.click();
  } else if (key === 'Escape') {
    // Simulate a click on the clear button
    clearButton.click();
  }
});
