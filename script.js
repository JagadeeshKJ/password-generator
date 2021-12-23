const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: generateLower,
    upper: generateUpper,
    number: generateNum,
    symbol: generateSymbol
};


generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText =  generatePassword(
        hasLower, 
        hasUpper, 
        hasNumber, 
        hasSymbol, 
        length
    );
});

// Clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("Saved to clipboard!")
});

// Generate Password
function generatePassword(lower, upper, number, symbol, length) {
    let pwd = '';
    const typesCount = lower + upper + number + symbol;

    // Filters the checked generator types
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter((item) => Object.values(item)[0]); 
    // console.log(typesArr)

    if(typesCount === 0){
        return '';
    }

    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            //console.log(funcName)
            pwd += randomFunc[funcName]();
        });
    }

    const finalPassword = pwd.slice(0, length);
    return finalPassword;
}

// Random generator functions
function generateLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function generateUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function generateNum() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function generateSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}
