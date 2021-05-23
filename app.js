class Calculator {
  constructor(previousOperation, currentOperation) {
    this.previousOperation = previousOperation;
    this.currentOperation = currentOperation;
    this.clear();
  }
  clear() {
    this.currentNumber = '';
    this.previousNumber = '';
    this.operation = undefined;
  }
  delete() {
    this.currentNumber = this.currentNumber.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === '.' && this.currentNumber.includes('.')) return;
    this.currentNumber = this.currentNumber.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentNumber === '') return;
    if (this.previousNumber !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousNumber = this.currentNumber;
    this.currentNumber = '';
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousNumber);
    const current = parseFloat(this.currentNumber);

    if (this.operation === '+') {
      computation = prev + current;
    } else if (this.operation === 'xⁿ') {
      computation = prev ** current;
    } else if (this.operation === '√') {
      computation = Math.sqrt(prev);
    } else if (this.operation === 'n!') {
      let result = [prev];
      for (let i = 1; i < prev; i++) {
        result.push(i);
      }
      computation = result.reduce((accumulator, currentvalue) => accumulator * currentvalue);
    } else if (this.operation === '-') {
      computation = prev - current;
    } else if (this.operation === '*') {
      computation = prev * current;
    } else if (this.operation === '÷') {
      computation = prev / current;
    } else {
      computation = 3.141592653589793238;
    }
    this.currentNumber = computation;
    this.operation = undefined;
    this.previousNumber = '';
  }
  udpateDisplay() {
    this.currentOperation.innerText = this.currentNumber;
    this.previousOperation.innerText = this.previousNumber;
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperation = document.querySelector('[data-previous-operator]');
const currentOperation = document.querySelector('[data-current-operator]');

const calculator = new Calculator(previousOperation, currentOperation);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.udpateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.udpateDisplay();
  });
});

equalsButton.addEventListener('click', (button) => {
  calculator.compute();
  calculator.udpateDisplay();
});

allClearButton.addEventListener('click', (button) => {
  calculator.clear();
  calculator.udpateDisplay();
});

deleteButton.addEventListener('click', (button) => {
  calculator.delete();
  calculator.udpateDisplay();
});
