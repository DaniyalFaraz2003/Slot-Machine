const slot1 = document.querySelector('#slot-1 p');
const slot2 = document.querySelector('#slot-2 p');
const slot3 = document.querySelector('#slot-3 p');
const chars = {
    A: 3,
    B: 6,
    C: 4,
    D: 7
};
const charsList = [];
for (const key in chars) {
    for (let i = 0; i < chars[key]; i++) {
        charsList.push(key.toString());
    }
}

const randomizeText = () => {
    slot1.textContent = charsList[Math.floor(Math.random() * charsList.length)];
    slot2.textContent = charsList[Math.floor(Math.random() * charsList.length)];
    slot3.textContent = charsList[Math.floor(Math.random() * charsList.length)];
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkWin() {
    const winText = document.querySelector('.operations-container > #win-state');
    if (slot1.textContent === slot2.textContent && slot1.textContent === slot3.textContent && slot2.textContent === slot3.textContent) {
        winText.textContent = "WIN";
        return true;
    }
    else {
        winText.textContent = "LOSE";
        return false;
    }
}

function getWinnings() {
    const balance = document.querySelector('.operations-container > #balance');
    let numbalance = Number(balance.textContent.substring(1));
    if (checkWin()) {
        numbalance += 100;
    }
    else {
        if (numbalance >= 100) numbalance -= 100;
    }
    balance.textContent = "$" + numbalance.toString();
}

async function spin() {
    let totalSpinTime = Math.floor(Math.random() * 4 + 2);
    let numSeconds = 0;
    while (numSeconds < totalSpinTime * 1000) {
        randomizeText();
        numSeconds += 100;
        await wait(100);
    }
    
    getWinnings();
}
