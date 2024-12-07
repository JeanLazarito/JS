let resDisplayed = false;

function operator(char) {
    return ['+', '-', '*', '/', '×', '÷'].includes(char);
}

function display(val) {
    const result = document.getElementById("result");

    if (resDisplayed && !operator(val)) {
        result.value = "";
        resDisplayed = false;
    } if (operator(val) && operator(result.value.slice(-1))) {
        return;
    } if (val === "-" && (result.value === "" || operator(result.value.slice(-1)))) {
        result.value += val;
        return;
    } if (result.value === "" && operator(val)) {
        return;
    }
    result.value += val;
}

function c() {
    document.getElementById("result").value = "";
}

function solve() {
    let inp = document.getElementById("result").value;
    inp = inp.replace(/x/g, "*").replace(/÷/g, "/");
    try {
        let res = math.evaluate(inp);
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
    const validKeys = "0123456789+-/*x.";
    const result = document.getElementById("result");
    const lastChar = result.value.slice(-1);

    if (resDisplayed) {
        if (validKeys.includes(event.key) && !operator(event.key)) {
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
        case '*':
            if (!operator(lastChar)) {
                result.value += "×";
            }
            break;
        case '/':
            if (!operator(lastChar)) {
                result.value += "÷";
            }
            break;
        default:
            if (validKeys.includes(event.key)) {
                display(event.key);
            }
            break;
    }
}
document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
        display(button.innerText);
    });
});

document.getElementById("solve").addEventListener("click", solve);
document.getElementById("clear").addEventListener("click", c);
document.addEventListener("keydown", keydown);
