let resDisplayed = false;

function operator(char) {
    return ['+', '-', '*', '/', '×', '÷'].includes(char);
}

function display(val) {
    const result = document.getElementById("result");

    if (result.value === "Error") {
        result.value = "";
    }
    if (resDisplayed) {
        if (!operator(val)) {
            result.value = "";
        }
        resDisplayed = false;
    }
    if (operator(val) && operator(result.value.slice(-1))) {
        return;
    }
    if (val === "-" && (result.value === "" || operator(result.value.slice(-1)))) {
        result.value += val;
        return;
    }
    if (result.value === "" && operator(val)) {
        return;
    }
    const lastSegment = result.value.split(/[-+×÷*/]/).pop();
    if (val === "." && lastSegment.includes(".")) {
        return;
    }

    result.value += val;
}

function c() {
    document.getElementById("result").value = "";
    resDisplayed = false;
}

function solve() {
    let inp = document.getElementById("result").value;
    inp = inp.replace(/÷/g, "/").replace(/x/g, "*").replace(/×/g, "*");

    try {
        const res = math.evaluate(inp);

        if (isNaN(res) || !isFinite(res)) {
            throw new Error("Error");
        }
        document.getElementById("result").value = res;
        resDisplayed = true;
    } catch (e) {
        document.getElementById("result").value = "Error";
        resDisplayed = true;
    }
}

function keydown(event) {
    const valid = "0123456789+-/*x.";
    const result = document.getElementById("result");
    const lastChar = result.value.slice(-1);

    if (result.value === "Error") {
        result.value = "";
    }
    if (resDisplayed) {
        if (valid.includes(event.key)) {
            result.value = "";
        }
        resDisplayed = false;
    }

    switch (event.key) {
        case 'Enter':
        case '=':
            solve();
            break;
        case 'Backspace':
            result.value = result.value.slice(0, -1);
            break;
        case 'Delete':
            c();
            break;
        case 'x':
            if (!operator(lastChar)) {
                display('×');
            }
            break;
        case '*':
            if (!operator(lastChar)) {
                display('×');
            }
            break;
        case '/':
            if (!operator(lastChar)) {
                display('÷');
            }
            break;
        case '+':
        case '-':
        case '.':
            display(event.key);
            break;
        default:
            if (valid.includes(event.key)) {
                display(event.key);
            }
            break;
    }
}

document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
        const disp = button.innerText.trim();
        console.log("Button clicked:", disp);
        const result = document.getElementById("result");

        if (result.value === "Error") {
            result.value = "";
        }
        if (resDisplayed && !operator(disp)) {
            result.value = "";
            resDisplayed = false;
        }
        if (disp === "×" || disp === "x") {
            display("×");
        } else if (disp === "÷") {
            display("÷");
        } else {
            display(disp);
        }
    });
});
document.addEventListener("keydown", keydown);
document.getElementById("solve").addEventListener("click", solve);
document.getElementById("clear").addEventListener("click", c);
