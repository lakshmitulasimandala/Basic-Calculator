const inputbox = document.getElementById("values");
let currentExpression = ""; // Stores the current input

// Function to handle button clicks
function appendValue(value) {
    if (value === "=") {
        calculateResult(); // Calculate result if "=" is pressed
    } else if (value === "AC") {
        clearInput(); // Clear input if "AC" is pressed
    } else if (value === "x²") {
        calculateSquare(); // Call square calculation function
    } else if (value === "√") {
        calculateSquareRoot(); // Calculate square root if "√" is pressed
    } else {
        currentExpression += value; // Add the button value to the current expression
        inputbox.value = currentExpression; // Display the updated expression
    }
}

// Function to calculate square (x²)
function calculateSquare() {
    try {
        const number = parseFloat(currentExpression); // Convert input to a number
        if (isNaN(number)) throw new Error("Invalid input for square");
        const square = number ** 2; // Calculate square
        inputbox.value = `${number}² = ${square}`; // Display the square
        currentExpression = ""; // Reset the expression for further calculations
    } catch (error) {
        inputbox.value = "Error"; // Handle invalid input
    }
}

// Function to calculate square root (√)
function calculateSquareRoot() {
    try {
        const number = parseFloat(currentExpression); // Convert input to a number
        if (isNaN(number)) throw new Error("Invalid input for square root");
        if (number < 0) throw new Error("Square root of negative number not allowed"); // Handle negative numbers
        const squareRoot = Math.sqrt(number); // Use Math.sqrt to calculate square root
        inputbox.value = `√${number} = ${squareRoot}`; // Display result as "√x = result"
        currentExpression = ""; // Reset the expression
    } catch (error) {
        inputbox.value = "Error"; // Handle invalid input
    }
}

// Function to calculate result manually (for operators like +, -, x, ÷)
function calculateResult() {
    try {
        let result = 0;
        let number = "";
        let operator = "+"; // addition by default

        for (let i = 0; i < currentExpression.length; i++) {
            const char = currentExpression[i];

            if (!isNaN(char)) {
                number += char; // Build the number (handle digits like 23, 45)
            } else {
                // Perform the operation when an operator is encountered
                result = performOperation(result, parseInt(number), operator);
                number = ""; // Reset number for the next value
                operator = char; // Update operator
            }
        }

        // Perform the last operation
        result = performOperation(result, parseInt(number), operator);

        inputbox.value = `${currentExpression} = ${result}`; // Show result
        currentExpression = ""; // Clear for the next calculation
    } catch (error) {
        inputbox.value = "Error"; // Show error if calculation fails
    }
}

// Function to perform basic operations (addition, subtraction, multiplication, division, and square root)
function performOperation(result, number, operator) {
    switch (operator) {
        case "+":
            return result + number;
        case "-":
            return result - number;
        case "x":
            return result * number;
        case "÷":
            if (number === 0) throw new Error("Division by zero");
            return result / number;
        case "%":
            return (result * number) / 100; // Percentage
        default:
            return result; // Default return if no operator
    }
}

// Function to clear the input box
function clearInput() {
    currentExpression = "";
    inputbox.value = "";
}

// Add event listeners to all buttons
const buttons = document.querySelectorAll(".buttons");
buttons.forEach(button => {
    button.addEventListener("click", () => appendValue(button.textContent.trim()));
});
