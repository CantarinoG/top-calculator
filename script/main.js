const upperDisplay = document.querySelector('.upper');
const lowerDisplay = document.querySelector('.lower');

const btnC = document.querySelector('#c');
const btnDel = document.querySelector('#delete');
const btn7 = document.querySelector('#seven');
const btn8 = document.querySelector('#eight');
const btn9 = document.querySelector('#nine');
const btnDiv = document.querySelector('#div');
const btn4 = document.querySelector('#four');
const btn5 = document.querySelector('#five');
const btn6 = document.querySelector('#six');
const btnX = document.querySelector('#x');
const btn1 = document.querySelector('#one');
const btn2 = document.querySelector('#two');
const btn3 = document.querySelector('#three');
const btnMinus = document.querySelector('#minus');
const btnDec = document.querySelector('#dec');
const btn0 = document.querySelector('#zero');
const btnEqual = document.querySelector('#equal');
const btnSum = document.querySelector('#sum');

let anteriorNum = 0;
let currentNum = [0];
let currentOperator = '';

const numKeys = [btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9];

numKeys.forEach(key => {
    key.addEventListener('click', () => {
        currentNum.push(key.textContent);
        lowerDisplay.textContent = parseFloat(currentNum.join(""));
    })
});



btnDec.addEventListener('click', () => {
    if (currentNum.includes('.')) {
        return;
    } else {
        currentNum.push('.');
    }
});

const operatorKeys = [btnDiv, btnX, btnMinus, btnSum];

operatorKeys.forEach(key => {
    key.addEventListener('click', () => {

        if (anteriorNum == 0) {
            anteriorNum = parseFloat(currentNum.join(""));
            upperDisplay.textContent = anteriorNum + " " + key.textContent;
        } else if (anteriorNum != 0 && parseFloat(currentNum.join("")) == 0) {
            upperDisplay.textContent = anteriorNum + " " + key.textContent;
        } else {
            anteriorNum = operate(anteriorNum, parseFloat(currentNum.join("")), currentOperator);
            upperDisplay.textContent = anteriorNum + " " + key.textContent;
            lowerDisplay.textContent = anteriorNum;

        }
        currentNum = [0];
        currentOperator = key.textContent;

    })
});

btnEqual.addEventListener('click', () => {
    if (parseFloat(currentNum.join("")) != 0) {
        anteriorNum = operate(anteriorNum, parseFloat(currentNum.join("")), currentOperator);
        lowerDisplay.textContent = anteriorNum;
        upperDisplay.textContent = anteriorNum;
        currentNum = [0];
    }
});

btnC.addEventListener('click', () => {
    anteriorNum = 0;
    currentNum = [0];
    currentOperator = '';
    lowerDisplay.textContent = 0;
    upperDisplay.textContent = '';
});

btnDel.addEventListener('click', () => {
    if (parseFloat(currentNum.join("")) != 0) {
        currentNum.pop();
        lowerDisplay.textContent = parseFloat(currentNum.join(""));
    } else {
        anteriorNum = 0;
        currentNum = [0];
        currentOperator = '';
        lowerDisplay.textContent = 0;
        upperDisplay.textContent = '';
    }
});

function operate(num1, num2, operator) {
    if (operator == "+") {
        return num1 + num2;
    } else if (operator == "-") {
        return num1 - num2;
    } else if (operator == "x" || operator == '*') {
        return num1 * num2;
    } else {
        return num1 / num2;
    }
}

//Keyboard support

let kp = ''; //keyPressed

document.addEventListener('keydown', (event) => {
    kp = event.key;

    if (/^\d+$/.test(kp)) { //if kp contains a number
        currentNum.push(kp);
        lowerDisplay.textContent = parseFloat(currentNum.join(""));
    } else if (kp == '+' || kp == '-' || kp == '/' || kp == '*') {
        if (anteriorNum == 0) {
            anteriorNum = parseFloat(currentNum.join(""));
            upperDisplay.textContent = anteriorNum + " " + kp;
        } else if (anteriorNum != 0 && parseFloat(currentNum.join("")) == 0) {
            upperDisplay.textContent = anteriorNum + " " + kp;
        } else {
            anteriorNum = operate(anteriorNum, parseFloat(currentNum.join("")), currentOperator);
            upperDisplay.textContent = anteriorNum + " " + kp;
            lowerDisplay.textContent = anteriorNum;
        }
        currentNum = [0];
        currentOperator = kp;
    } else if (kp == '.') {
        if (currentNum.includes('.')) {
            return;
        } else {
            currentNum.push('.');
        }
    } else if (kp == 'Enter' || kp == '=') {
        if (parseFloat(currentNum.join("")) != 0) {
            anteriorNum = operate(anteriorNum, parseFloat(currentNum.join("")), currentOperator);
            lowerDisplay.textContent = anteriorNum;
            upperDisplay.textContent = anteriorNum;
            currentNum = [0];
        }
    } else if (kp == 'c' || kp == 'C') {
        anteriorNum = 0;
        currentNum = [0];
        currentOperator = '';
        lowerDisplay.textContent = 0;
        upperDisplay.textContent = '';
    } else if (kp == 'Backspace') {
        if (parseFloat(currentNum.join("")) != 0) {
            currentNum.pop();
            lowerDisplay.textContent = parseFloat(currentNum.join(""));
        } else {
            anteriorNum = 0;
            currentNum = [0];
            currentOperator = '';
            lowerDisplay.textContent = 0;
            upperDisplay.textContent = '';
        }
    }
});