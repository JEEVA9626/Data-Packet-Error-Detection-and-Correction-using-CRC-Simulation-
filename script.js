const dataInput = document.getElementById('data');
const divisorInput = document.getElementById('divisor');
const calculateBtn = document.getElementById('calculate-btn');
const simulateErrorBtn = document.getElementById('simulate-error-btn');
const checkErrorBtn = document.getElementById('check-error-btn');
const resultDiv = document.getElementById('result');

let data, divisor, crc;

calculateBtn.addEventListener('click', calculateCRC);
simulateErrorBtn.addEventListener('click', simulateError);
checkErrorBtn.addEventListener('click', checkError);

function calculateCRC() {
    data = dataInput.value;
    divisor = divisorInput.value;

    if (!data || !divisor) {
        resultDiv.innerText = 'Please enter both data and divisor.';
        return;
    }

    const dividend = data + '0'.repeat(divisor.length - 1);
    crc = performDivision(dividend, divisor);

    resultDiv.innerText = `CRC: ${crc}`;
}

function simulateError() {
    if (!data || !divisor) {
        resultDiv.innerText = 'Please calculate CRC first.';
        return;
    }

    const errorData = data.split('');
    const errorIndex = Math.floor(Math.random() * data.length);
    errorData[errorIndex] = errorData[errorIndex] === '0' ? '1' : '0';
    const errorDataStr = errorData.join('');

    const errorCRC = performDivision(errorDataStr + '0'.repeat(divisor.length - 1), divisor);

    resultDiv.innerText = `Simulated Error Data: ${errorDataStr}\nCRC: ${errorCRC}`;
}

function checkError() {
    if (!data || !divisor) {
        resultDiv.innerText = 'Please calculate CRC first.';
        return;
    }

    const receivedData = prompt('Enter received data:');
    const receivedCRC = receivedData.slice(-(divisor.length - 1));
    const remainder = performDivision(receivedData, divisor);

    if (remainder === '0'.repeat(divisor.length - 1)) {
        resultDiv.innerText = 'No error detected.';
    } else {
        resultDiv.innerText = 'Error detected.';
    }
}

function performDivision(dividend, divisor) {
    let remainder = dividend;

    while (remainder.length >= divisor.length) {
        const temp = remainder.slice(0, divisor.length);
        if (temp[0] === '1') {
            remainder = xor(temp, divisor) + remainder.slice(divisor.length);
        } else {
            remainder = remainder.slice(1);
        }
    }

    return remainder;
}

function xor(a, b) {
    let result = '';

    for (let i = 0; i < a.length; i++) {
        result += a[i] === b[i] ? '0' : '1';
    }

    return result;
}
