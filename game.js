let intervalId;
const gameDelay = 5000;

function renderGameZone1(container) {
    for (let i = 1; i <= 8; i++) {
        const front = document.createElement("div");
        front.classList.add("game_front");
        container.appendChild(front);

        const card = document.createElement("div");
        card.classList.add("game_front_card");
        front.appendChild(card);

        const img = document.createElement("img");
        img.src = `${
            window.application.cards[0][Math.round(Math.random() * 8)]
        }`;
        card.appendChild(img);

        intervalId = setTimeout(() => {
            img.src = "img/рубашка.png";
            clearInterval(interval);
            interval = setInterval(startTimer, 10);
        }, gameDelay);
    }
}
window.application.timers.push(intervalId);

function renderGameZone2(container) {
    for (let i = 1; i <= 12; i++) {
        const front = document.createElement("div");
        front.classList.add("game_front");
        container.appendChild(front);

        const card = document.createElement("div");
        card.classList.add("game_front_card");
        front.appendChild(card);

        const img = document.createElement("img");
        img.src = `${
            window.application.cards[0][Math.round(Math.random() * 12)]
        }`;
        card.appendChild(img);

        intervalId = setTimeout(() => {
            img.src = "img/рубашка.png";
            clearInterval(interval);
            interval = setInterval(startTimer, 10);
        }, gameDelay);
    }
}
window.application.timers.push(intervalId);

function renderGameZone3(container) {
    for (let i = 1; i <= 16; i++) {
        const front = document.createElement("div");
        front.classList.add("game_front");
        container.appendChild(front);

        const card = document.createElement("div");
        card.classList.add("game_front_card");
        front.appendChild(card);

        const img = document.createElement("img");
        img.src = `${
            window.application.cards[0][Math.round(Math.random() * 16)]
        }`;
        card.appendChild(img);

        intervalId = setTimeout(() => {
            img.src = "img/рубашка.png";
            clearInterval(interval);
            interval = setInterval(startTimer, 10);
        }, gameDelay);
    }
}
window.application.timers.push(intervalId);

// кол-во карт исходя из уровня сложности
function levelDifficulty() {
    switch (window.application.level.pop()) {
        case "1":
            window.application.blocks["game-card"] = renderGameZone1;
            break;

        case "2":
            window.application.blocks["game-card"] = renderGameZone2;
            break;

        case "3":
            window.application.blocks["game-card"] = renderGameZone3;
            break;

        default:
            break;
    }
}


function renderAgainButton(container) {
    const againButton = document.createElement("button");
    againButton.classList.add("level_footer_button");
    againButton.textContent = "Начать заново!";
    container.appendChild(againButton);
}


function renderTimer(container) {
    const timer = document.createElement("div");
    timer.classList.add("timer");
    container.appendChild(timer);

    sec = document.createElement("h2");
    sec.classList.add("timer_sec");
    sec.textContent = "00";
    timer.appendChild(sec);

    dot = document.createElement("span");
    dot.classList.add("timer_dot");
    dot.textContent = ".";
    timer.appendChild(dot);

    milS = document.createElement("h2");
    milS.classList.add("timer_mil");
    milS.textContent = "00";
    timer.appendChild(milS);
}

let dot;
let sec;
let milS;
let second = 0,
    mil = 0,
    interval;


function startTimer() {
    let milElem = document.querySelector(".timer_mil");
    let secElem = document.querySelector(".timer_sec");

    mil++;
    if (mil < 9) {
        milElem.textContent = "0" + mil;
    }

    if (mil > 9) {
        milElem.textContent = mil;
    }

    if (mil > 99) {
        second++;
        secElem.textContent = "0" + second;
        mil = 0;
        milElem.textContent = "0" + mil;
    }

    // секунды
    if (second < 9) {
        secElem.textContent = "0" + second;
    }
    if (second > 9) {
        secElem.textContent = second;
    }
    if (second > 59 || mil > 99) {
        clearInterval(interval);
        alert("Вы проиграли!");
        sec = 0;
        mil = 0;

        // Экран поражения
    }
}

window.application.blocks["again-button"] = renderAgainButton;
window.application.blocks["timer"] = renderTimer;

// экран игры
function renderGameScreen() {
    levelDifficulty();

    const gameZoneContainer = document.createElement("div");
    gameZoneContainer.classList.add("game");

    const header = document.createElement("header");
    header.classList.add("game_header");
    // header.classList.add('center')

    const main = document.createElement("main");
    main.classList.add("game_main");
    main.classList.add("center");

    gameZoneContainer.appendChild(header);
    gameZoneContainer.appendChild(main);

    app.appendChild(gameZoneContainer);

    window.application.renderBlock("timer", header);
    window.application.renderBlock("again-button", header);
    window.application.renderBlock("game-card", main);
}

window.application.screens["game"] = renderGameScreen;
