//1.1 create the class with a constructor
class Calculator {
  //this will pass the previous value and current value to be displayed
  constructor(previousOperation, currentOperation) {
    this.previousOperation = previousOperation;
    this.currentOperation = currentOperation; //1.9 add the clear function here as well this will clear everthing once we start the calculator
    this.clear();
  } //1.2 create the clear function for when we press the AC button
  clear() {
    //1.8 the first thing to do is to clear whatever is on the display so we can use the calculator
    this.currentNumber = '';
    this.previousNumber = '';
    this.operation = undefined;
  } //1.3 create the delete function to delete digits incase we made a mistake or delete the whole number
  delete() {
    //1.25 create  the delete function
    //what this is going to do is basically slice from the begining to the last digit and return the second to last and return it
    //here this.currentNumber
    this.currentNumber = this.currentNumber.toString().slice(0, -1);
  } //1.4 create the append number fuction to add another number to the calculator instead of over writting it //and it will pass the paramente number
  appendNumber(number) {
    //1.13 instead of appending we are going to assign the value
    // this.currentNumber = number;
    //1.14 correct the append function by assigning the currentNumber and converting it to string
    //the reason why i need to convert the numbers to string is because since i am using the sybol +
    //the conde will try to add them together instead ovsf appending them so 1+1 =2 but that is not what i am
    //looking for i am looking for the outcome to be 1+1 = 11
    //now there is one flaw on this line of code and is that the user can keep on adding the symbol "." many times
    //to fix that i will need to this add an if statement
    if (number === '.' && this.currentNumber.includes('.')) return;
    this.currentNumber = this.currentNumber.toString() + number.toString();
  } //1.5 create the function that will take care when the opeartor button is selected //the add or substract or divide button
  chooseOperation(operation) {
    //1.18 this will take care of running the operations inside the compute function
    //once we have a current number value and a previus number value
    //if we only have one value the one on top called previous Number then it won't allow the
    //code to run because we don't have two values
    if (this.currentNumber === '') return;
    if (this.previousNumber !== '') {
      this.compute();
    } // this.compute(); //1.16 this will display the numbers and once the operator button is clicked //the numbers will be cleared or disappeared and then the new numbers will be displayed
    this.operation = operation;
    this.previousNumber = this.currentNumber;
    this.currentNumber = '';
  } //1.6 create the compute functon where all of the opeartion will take place and return a single value
  compute() {
    //1.20 create the function for each operation
    //this will store the result of the computatoin
    let computation; //now i will convert the string values i got from the currentNumber and previousNumber to an actual number
    const prev = parseFloat(this.previousNumber);
    const current = parseFloat(this.currentNumber); /*switch (this.operation) {
	      case "+":
	        computation = prev + current;
	        break;
	      case "-":
	        computation = prev - current;
	        break;
	      case "*":
	        computation = prev * current;
	        break;
	      case "÷":
	        computation = prev / current;
	        break;
	      case "xⁿ":
	        computation = prev ** current;
	      case "√":
	        computation = Math.sqrt(this.prev);
	      default:
	        return;
	    }*/ //here if the user only enters one value and tries to perform an operation without submitting the second value //the function won't runt. //1.22 i had to get ride of this code in order for me to be able to apply apply the factorial and the square root as well // if (isNaN(prev) || isNaN(current)) return; //here is where i am going to perform every operation //so on the first one if the symbol clicked was + then just add the numbers //i could have just use reduce to apply everthing here. But i could also just make it simple like this //1.21 i had to get ride of the switch statment because i couldn't apply the factorial and square root and the power as well //1.23 this is how i was able to include the factorial , square root and exponential as well
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
    } //1.21.1 i had to get ride of this as well //the last statement the default is used when none of the statements above were used then just leave it alone //basically not making any operation at all //1.21.2 finish updating everything to display the correct results, i will be showing the result of the operation //on top, then the prevoius number value will be equals to an empty string
    this.currentNumber = computation;
    this.operation = undefined;
    this.previousNumber = '';
  } //1.7 craete the update function to update the display on the screen of the calculator
  udpateDisplay() {
    //1.12 updathe value
    this.currentOperation.innerText = this.currentNumber; //1.17 move the previous operator number to the top
    this.previousOperation.innerText = this.previousNumber;
  }
}
//1.0 all of this is to cache the DOM meaning I assigned to variables all of the things i need from the DOM
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperation = document.querySelector('[data-previous-operator]');
const currentOperation = document.querySelector('[data-current-operator]');
//1.10 create the new calculator like this, and passing in the values of the constructor so we can use them
const calculator = new Calculator(previousOperation, currentOperation);
//1.11 start adding the event listeners
//this will add an event listener to all of the number buttons so anytime they are clicked
//the event will listed and then the variable calculator will use the function appendNumber to add the button innerText
//and once that happends then use the function updatedisplay
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.udpateDisplay();
  });
});
//1.15 create the loop for the operation buttons
//here once the symbol is clicked then instead of using the appenNumber function we are just going to
//allow the code to choose the operator to perform the calculation so change this code
//calculator.appendNumber(button.innerText); for this calculator.chooseOperation(button.innerText);
//so what i am doing is passing the symbol that was selected and that will trigger the choosenOperation functions
//and finally update the display output as well this is very important
operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.udpateDisplay();
  });
});
//1.19 create the event listener for the equals button
equalsButton.addEventListener('click', (button) => {
  calculator.compute();
  calculator.udpateDisplay();
});
//1.24 create the all clear event listener
allClearButton.addEventListener('click', (button) => {
  calculator.clear();
  calculator.udpateDisplay();
});
//1.26
deleteButton.addEventListener('click', (button) => {
  calculator.delete();
  calculator.udpateDisplay();
});
