/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./style.css":
/*!*******************!*\
  !*** ./style.css ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./style.css");

// import { handleCardClick } from './utils'
// import { createCard } from './utils'
// import { renderGameZone1 } from './utils'
// import { renderGameZone2 } from './utils'
// import { renderGameZone3 } from './utils'
// import { levelDifficulty } from './utils'
// import { renderAgainButton } from './utils'
// import { renderTimer } from './utils'
// import { startTimer } from './utils'
// import { renderGameScreen } from './utils'
// import { renderLevelsButton } from './utils'
// import { levelsEvent } from './utils'
// import { renderStartButton } from './utils'
// import { renderMenuTitle } from './utils'
// import { renderStartMenu } from './utils'

const app = document.querySelector('.app')

// window.application

const game = {
    blocks: {},
    screens: {},
    timers: [],
    level: [],
    cards: [
        [
            './img/10бубны.png',
            './img/10крести.png',
            './img/10пики.png',
            './img/10черви.png',
            './img/6бубны.png',
            './img/6крести.png',
            './img/6пики.png',
            './img/6черви.png',
            './img/7бубны.png',
            './img/7крести.png',
            './img/7пики.png',
            './img/7черви.png',
            './img/8бубны.png',
            './img/8крести.png',
            './img/8пики.png',
            './img/8черви.png',
            './img/9бубны.png',
            './img/9крести.png',
            './img/9пики.png',
            './img/9черви.png',
            './img/валетБубны.png',
            './img/валетКрести.png',
            './img/валетПики.png',
            './img/валетЧерви.png',
            './img/дамаБубны.png',
            './img/дамаКрести.png',
            './img/дамаПики.png',
            './img/дамаЧерви.png',
            './img/корольБубны.png',
            './img/корольКрести.png',
            './img/корольПики.png',
            './img/корольЧерви.png',
            './img/тузБубны.png',
            './img/тузКрести.png',
            './img/тузПики.png',
            './img/тузЧерви.png',
        ],
    ],

    renderScreen: function (screenName) {
        game.timers.forEach((id) => {
            clearInterval(id)
        })

        if (game.screens[screenName]) {
            app.innerHTML = ''

            game.screens[screenName]()
        }
    },
    renderBlock: function (blockName, container) {
        if (game.blocks[blockName]) {
            game.blocks[blockName](container)
        } else {
            console.warn('Ошибка')
        }
    },
}

// handleCardClick()
// createCard()
// renderGameZone1()
// renderGameZone2()
// renderGameZone3()
// levelDifficulty()
// renderAgainButton()
// renderTimer()
// startTimer()
// renderGameScreen()
// renderLevelsButton()
// levelsEvent()
// renderStartButton()
// renderMenuTitle()
// renderStartMenu()

let intervalId
const gameDelay = 5000

function handleCardClick(event) {
    const card = event.currentTarget

    // Если карточка уже открыта, ничего не делаем
    if (card.classList.contains('flipped')) {
        return
    }

    // Открываем карточку
    card.classList.add('flipped')

    // Получаем открытые карточки
    const flippedCards = document.querySelectorAll('flipped')

    // Если открыто две карточки, сравниваем их
    if (flippedCards.length === 2) {
        const firstCardImg = flippedCards[0].querySelector('img')
        const secondCardImg = flippedCards[1].querySelector('img')

        // console.log('debug');
        // Если выбраны две одинаковые карты, то они остаются открытыми,
        // иначе закрываем обе карты
        if (firstCardImg.src === secondCardImg.src) {
            flippedCards.forEach((card) => card.classList.remove('flipped'))
        } else {
            setTimeout(() => {
                flippedCards.forEach((card) => card.classList.remove('flipped'))
            }, 1000)
        }
    }
}

function createCard(container, cardIndex) {
    const front = document.createElement('div')
    front.classList.add('game-front')
    container.appendChild(front)

    const card = document.createElement('div')
    card.classList.add('game-front-card')
    front.appendChild(card)

    const img = document.createElement('img')
    // img.src = `${window.application.cards[0][cardIndex]}`
    img.src = `${game.cards[0][cardIndex]}`
    card.appendChild(img)

    const back = document.createElement('div')
    back.classList.add('game-back')
    card.appendChild(back)

    // Назначение обработчика клика на карточке
    card.addEventListener('click', handleCardClick)

    return card
}

function renderGameZone1(container) {
    for (let i = 1; i <= 8; i++) {
        const cardIndex = Math.round(Math.random() * 8)
        const card = createCard(container, cardIndex)
        intervalId = setTimeout(() => {
            card.querySelector('img').src = 'img/рубашка.png'
            clearInterval(interval)
            interval = setInterval(startTimer, 10)
        }, gameDelay)
    }
}

function renderGameZone2(container) {
    for (let i = 1; i <= 12; i++) {
        const cardIndex = Math.round(Math.random() * 12)
        const card = createCard(container, cardIndex)
        intervalId = setTimeout(() => {
            card.querySelector('img').src = 'img/рубашка.png'
            clearInterval(interval)
            interval = setInterval(startTimer, 10)
        }, gameDelay)
    }
}

function renderGameZone3(container) {
    for (let i = 1; i <= 16; i++) {
        const cardIndex = Math.round(Math.random() * 16)
        const card = createCard(container, cardIndex)
        intervalId = setTimeout(() => {
            card.querySelector('img').src = 'img/рубашка.png'
            clearInterval(interval)
            interval = setInterval(startTimer, 10)
        }, gameDelay)
    }
}

function levelDifficulty() {
    // const level = window.application.level[window.application.level.length - 1]
    const level = game.level[game.level.length - 1]

    switch (level) {
        case '1':
            game.blocks['game-card'] = renderGameZone1
            break

        case '2':
            game.blocks['game-card'] = renderGameZone2
            break

        case '3':
            game.blocks['game-card'] = renderGameZone3
            break

        default:
            break
    }
}

function renderAgainButton(container) {
    const againButton = document.createElement('button')
    againButton.classList.add('level-footer-button')
    againButton.textContent = 'Начать заново'
    container.appendChild(againButton)
    againButton.addEventListener('click', () => {
        const gameCards = document.querySelectorAll('.game-front-card')
        gameCards.forEach((card) => card.classList.remove('flipped'))
    })
}

// // Добавляем обработчик для каждой карточки
// const gameCards = document.querySelectorAll('.game-front-card')
// gameCards.forEach((card) => card.addEventListener('click', handleCardClick))

// function renderAgainButton(container) {
//     const againButton = document.createElement('button')
//     againButton.classList.add('level-footer-button')
//     againButton.textContent = 'Начать заново'
//     container.appendChild(againButton)
//     // Добавляем обработчик клика на кнопку "Начать заново"
//     againButton.addEventListener('click', () => {
//         gameCards.forEach((card) => card.classList.remove('flipped'))
//     })
// }

function renderTimer(container) {
    const timer = document.createElement('div')
    timer.classList.add('timer')
    container.appendChild(timer)

    sec = document.createElement('h2')
    sec.classList.add('timer-sec')
    sec.textContent = '00'
    timer.appendChild(sec)

    dot = document.createElement('span')
    dot.classList.add('timer-dot')
    dot.textContent = '.'
    timer.appendChild(dot)

    milS = document.createElement('h2')
    milS.classList.add('timer-mil')
    milS.textContent = '00'
    timer.appendChild(milS)
}

let dot
let sec
let milS
let second = 0,
    mil = 0,
    interval

function startTimer() {
    let milElem = document.querySelector('.timer-mil')
    let secElem = document.querySelector('.timer-sec')

    mil++
    if (mil < 9) {
        milElem.textContent = '0' + mil
    }

    if (mil > 9) {
        milElem.textContent = mil
    }

    if (mil > 99) {
        second++
        secElem.textContent = '0' + second
        mil = 0
        milElem.textContent = '0' + mil
    }

    // секунды
    if (second < 9) {
        secElem.textContent = '0' + second
    }
    if (second > 9) {
        secElem.textContent = second
    }
    if (second > 59 || mil > 99) {
        clearInterval(interval)
        alert('Вы проиграли!')
        sec = 0
        mil = 0

        // Экран поражения
    }
}

game.blocks['again-button'] = renderAgainButton
game.blocks['timer'] = renderTimer

function renderGameScreen() {
    levelDifficulty()
    const gameZoneContainer = document.createElement('div')
    gameZoneContainer.classList.add('game')

    const header = document.createElement('header')
    header.classList.add('game-header')

    const main = document.createElement('main')
    main.classList.add('game-main')
    main.classList.add('center')

    gameZoneContainer.appendChild(header)
    gameZoneContainer.appendChild(main)
    app.appendChild(gameZoneContainer)

    // window.application.renderBlock('timer', header)
    // window.application.renderBlock('again-button', header)
    // window.application.renderBlock('game-card', main)
    game.renderBlock('timer', header)
    game.renderBlock('again-button', header)
    game.renderBlock('game-card', main)

    const gameBacks = document.querySelectorAll('.game-back')
    gameBacks.forEach((back) => back.classList.add('back'))
}

// Добавляем "game" в список завершённых экранов
// window.application.screens['game'] = renderGameScreen
game.screens['game'] = renderGameScreen

function renderLevelsButton(container) {
    for (let i = 1; i <= 3; i++) {
        const levelButton = document.createElement('input')
        levelButton.setAttribute('type', 'button')
        levelButton.setAttribute('value', i)
        levelButton.classList.add('level-main-button')
        container.appendChild(levelButton)

        levelButton.addEventListener('click', () => {
            // window.application.level.pop()
            // window.application.level.push(levelButton.value)
            game.level.pop()
            game.level.push(levelButton.value)

            switch (levelButton.value) {
                case '1':
                    levelsEvent('1')
                    break

                case '2':
                    levelsEvent('2')
                    break

                case '3':
                    levelsEvent('3')
                    break

                default:
                    break
            }
        })
    }
}

let startButton

function levelsEvent(param) {
    startButton.addEventListener('click', () => {
        game.renderScreen('game')
        console.log(`Уровень сложности ${param}`)
    })
}

function renderStartButton(container) {
    startButton = document.createElement('button')
    startButton.classList.add('start-button')
    startButton.textContent = 'Старт'
    container.appendChild(startButton)
}

function renderMenuTitle(container) {
    const levelTitle = document.createElement('h1')
    levelTitle.classList.add('level-header-title')
    levelTitle.textContent = 'Выбери сложность'
    container.appendChild(levelTitle)
}

// window.application.blocks['menu-title'] = renderMenuTitle
// window.application.blocks['level-button'] = renderLevelsButton
// window.application.blocks['start-button'] = renderStartButton
game.blocks['menu-title'] = renderMenuTitle
game.blocks['level-button'] = renderLevelsButton
game.blocks['start-button'] = renderStartButton

function renderStartMenu() {
    const startMenuContainer = document.createElement('div')
    startMenuContainer.classList.add('level')

    const startMenuHeader = document.createElement('div')
    startMenuHeader.classList.add('level-header')

    const startMenuLevel = document.createElement('div')
    startMenuLevel.classList.add('level-main')

    const startMenuStart = document.createElement('div')
    startMenuStart.classList.add('level-footer')

    startMenuContainer.appendChild(startMenuHeader)
    startMenuContainer.appendChild(startMenuLevel)
    startMenuContainer.appendChild(startMenuStart)

    app.appendChild(startMenuContainer)

    // window.application.renderBlock('menu-title', startMenuHeader)
    // window.application.renderBlock('level-button', startMenuLevel)
    // window.application.renderBlock('start-button', startMenuStart)
    game.renderBlock('menu-title', startMenuHeader)
    game.renderBlock('level-button', startMenuLevel)
    game.renderBlock('start-button', startMenuStart)
}
renderStartMenu()

// Инициализация изображений для карточек
game.cards = [
    [
        './img/10бубны.png',
        './img/10крести.png',
        './img/10пики.png',
        './img/10черви.png',
        './img/6бубны.png',
        './img/6крести.png',
        './img/6пики.png',
        './img/6черви.png',
        './img/7бубны.png',
        './img/7крести.png',
        './img/7пики.png',
        './img/7черви.png',
        './img/8бубны.png',
        './img/8крести.png',
        './img/8пики.png',
        './img/8черви.png',
        './img/9бубны.png',
        './img/9крести.png',
        './img/9пики.png',
        './img/9черви.png',
        './img/валетБубны.png',
        './img/валетКрести.png',
        './img/валетПики.png',
        './img/валетЧерви.png',
        './img/дамаБубны.png',
        './img/дамаКрести.png',
        './img/дамаПики.png',
        './img/дамаЧерви.png',
        './img/корольБубны.png',
        './img/корольКрести.png',
        './img/корольПики.png',
        './img/корольЧерви.png',
        './img/тузБубны.png',
        './img/тузКрести.png',
        './img/тузПики.png',
        './img/тузЧерви.png',
    ],
]
// Запуск начального экрана
game.renderScreen('start')

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map