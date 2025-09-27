function clearDisplay() {
    document.getElementById("display").value = "";
}

function deleteChar() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function appendChar(char) {
    document.getElementById("display").value += char;
}

function calculate() {
    let display = document.getElementById("display");
    let expression = display.value;

    try {
        // Replace ÷ and × with JS operators
        expression = expression.replace(/÷/g, "/").replace(/×/g, "*");

        // Handle percentage like a real calculator
        expression = expression.replace(/(\d+(\.\d+)?)%/g, (match, num) => {
            return parseFloat(num) / 100;
        });

        // Extra logic for % based on previous value
        let tokens = expression.split(/([+\-*/])/);
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].includes("/") || tokens[i].includes("*") || tokens[i].includes("+") || tokens[i].includes("-")) continue;

            if (tokens[i].includes("%")) {
                let value = parseFloat(tokens[i]) / 100;
                if (i >= 2 && ["+", "-"].includes(tokens[i - 1])) {
                    // Percentage of the previous number
                    value = parseFloat(tokens[i - 2]) * (parseFloat(tokens[i]) / 100);
                    tokens[i] = value;
                } else {
                    tokens[i] = value;
                }
            }
        }

        let finalExpression = tokens.join("");
        display.value = eval(finalExpression);

    } catch {
        display.value = "Error";
    }
}
