
let currentInput = "0";
let previousInput = "";
let operator = null;
let resetScreen = false;

const display = document.getElementById("display");

function updateDisplay() {
    display.value = currentInput;
}

function appendNumber(number) {

    if (currentInput === "Error") {
        currentInput = "0";
    }

    if (currentInput === "0" || resetScreen) {
        currentInput = number;
        resetScreen = false;
    } 
    else {
        currentInput += number;
    }

    updateDisplay();
}

function appendDecimal() {

    if (resetScreen) {
        currentInput = "0";
        resetScreen = false;
    }

    if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

function appendOperator(op) {

    if (currentInput === "Error") {
        return;
    }

    if (operator !== null && !resetScreen) {
        calculate();
    }

    previousInput = currentInput;
    operator = op;
    resetScreen = true;
}

function calculate() {

    if (operator === null || resetScreen) {
        return;
    }

    let num1 = parseFloat(previousInput);
    let num2 = parseFloat(currentInput);
    let result;

    switch (operator) {

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "*":
            result = num1 * num2;
            break;

        case "/":
            if (num2 === 0) {
                currentInput = "Error";
                previousInput = "";
                operator = null;
                resetScreen = true;
                updateDisplay();
                return;
            }
            result = num1 / num2;
            break;
    }

    currentInput = String(
        parseFloat(result.toPrecision(12))
    );

    previousInput = "";
    operator = null;
    resetScreen = true;

    updateDisplay();
}

function clearDisplay() {

    currentInput = "0";
    previousInput = "";
    operator = null;
    resetScreen = false;

    updateDisplay();
}

function deleteLast() {

    if (resetScreen || currentInput === "Error") {
        currentInput = "0";
        resetScreen = false;
    }
    else {
        currentInput = currentInput.slice(0, -1);

        if (currentInput === "" || currentInput === "-") {
            currentInput = "0";
        }
    }

    updateDisplay();
}
