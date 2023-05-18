import { replace } from 'lodash'
import './style.css'

const app = document.querySelector('.app')

// window.application

const game = {
    blocks: {},
    screens: {},
    timers: [],
    level: [],
    cards: [
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

let intervalId
const gameDelay = 5000

// функция создания карточки
function createCard(container, cardIndex) {
    const card = document.createElement('div')
    card.classList.add('main-game-card')
    container.appendChild(card)

    const front = document.createElement('img')
    front.classList.add('front-card')
    // front.src = `${game.cards[0][cardIndex]}`
    front.setAttribute('src', `${game.cards[0][cardIndex]}`)
    // back.setAttribute('src', 'img/рубашка.png')
    card.appendChild(front)

    // img.src = `${window.application.cards[0][cardIndex]}`
    // img.src = `${game.cards[0][cardIndex]}`

    const back = document.createElement('img')
    back.classList.add('back-card')
    back.setAttribute('src', 'img/рубашка.png')
    card.appendChild(back)

    // Открываем карточку
    card.classList.add('flipped')

    // Назначение обработчика клика на карточке
    card.addEventListener('click', handleCardClick)

    return card
}

let hasFlippedCard = false
let lockBoard = false
let firstCardImg = null
let secondCardImg = null

let successfulPairs = 0 // количество успешных пар

const levelSelect = document.querySelector('#level-select')
let selectedLevel = levelSelect.value

levelSelect.addEventListener('change', (event) => {
    selectedLevel = event.target.value
    numberOfPairs = getNumberOfPairs(selectedLevel)
})

let numberOfPairs = getNumberOfPairs(selectedLevel) // количество пар для выбранного уровня сложности

function getNumberOfPairs(level) {
    if (level === 'easy') {
        return 3
    } else if (level === 'medium') {
        return 6
    } else if (level === 'hard') {
        return 9
    }
}

function handleCardClick(event) {
    const card = event.currentTarget

    if (card.classList.contains('flipped')) {
        return
    }

    flipCard(card)

    function flipCard(card) {
        const cardImg = card.querySelector('.front-card')

        if (lockBoard) return
        if (card.classList.contains('matched')) return
        if (cardImg === firstCardImg) return

        card.classList.add('flipped')

        if (!hasFlippedCard) {
            hasFlippedCard = true
            firstCardImg = cardImg
            return
        }

        secondCardImg = cardImg
        lockBoard = true

        setTimeout(() => {
            checkForMatch()
        }, 800)
    }

    function checkForMatch() {
        if (firstCardImg.src === secondCardImg.src) {
            firstCardImg.parentElement.classList.add('matched')
            secondCardImg.parentElement.classList.add('matched')
            successfulPairs += 1
            if (successfulPairs === numberOfPairs) {
                alert('Поздравляем, вы победили!')
            }
        } else {
            firstCardImg.parentElement.classList.remove('flipped')
            secondCardImg.parentElement.classList.remove('flipped')
            clearInterval(interval)
            alert('Вы проиграли!')
            sec = 0
        }

        lockBoard = false
        hasFlippedCard = false
        firstCardImg = null
        secondCardImg = null
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

// shuffle(array: string[])

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

// генерация количества карточек в соответствии с уровнем сложности
function renderGameZone1(container) {
    const cardsArr = shuffle(game.cards[0])
    const cardField = []

    for (let i = 0; i < 3; i++) {
        cardField.push(cardsArr[i])
    }

    cardField.forEach((el) => {
        cardField.push(el)
    })

    shuffle(cardField)
    cardField.forEach((el) => {
        const card = document.createElement('div')
        card.classList.add('main-game-card')
        container.appendChild(card)

        const front = document.createElement('img')
        front.classList.add('front-card')
        front.setAttribute('src', el)
        card.appendChild(front)

        const back = document.createElement('img')
        back.classList.add('back-card')
        back.setAttribute('src', 'img/рубашка.png')
        card.appendChild(back)

        card.classList.add('flipped')

        card.addEventListener('click', handleCardClick)
    })
    setTimeout(() => {
        const cards = document.querySelectorAll('.flipped')
        cards.forEach((el) => {
            el.classList.remove('flipped')
        })
        interval = setInterval(startTimer, 1000)
    }, 5000)
}

function renderGameZone2(container) {
    const cardsArr = shuffle(game.cards[0])
    const cardField = []

    for (let i = 0; i < 6; i++) {
        cardField.push(cardsArr[i])
    }

    cardField.forEach((el) => {
        cardField.push(el)
    })

    shuffle(cardField)
    cardField.forEach((el) => {
        const card = document.createElement('div')
        card.classList.add('main-game-card')
        container.appendChild(card)

        const front = document.createElement('img')
        front.classList.add('front-card')
        front.setAttribute('src', el)
        card.appendChild(front)

        const back = document.createElement('img')
        back.classList.add('back-card')
        back.setAttribute('src', 'img/рубашка.png')
        card.appendChild(back)

        card.classList.add('flipped')

        card.addEventListener('click', handleCardClick)
    })
    setTimeout(() => {
        const cards = document.querySelectorAll('.flipped')
        cards.forEach((el) => {
            el.classList.remove('flipped')
        })
        interval = setInterval(startTimer, 1000)
    }, 5000)
}

function renderGameZone3(container) {
    const cardsArr = shuffle(game.cards[0])
    const cardField = []

    for (let i = 0; i < 9; i++) {
        cardField.push(cardsArr[i])
    }

    cardField.forEach((el) => {
        cardField.push(el)
    })

    shuffle(cardField)
    cardField.forEach((el) => {
        const card = document.createElement('div')
        card.classList.add('main-game-card')
        container.appendChild(card)

        const front = document.createElement('img')
        front.classList.add('front-card')
        front.setAttribute('src', el)
        card.appendChild(front)

        const back = document.createElement('img')
        back.classList.add('back-card')
        back.setAttribute('src', 'img/рубашка.png')
        card.appendChild(back)

        card.classList.add('flipped')

        card.addEventListener('click', handleCardClick)
    })
    setTimeout(() => {
        const cards = document.querySelectorAll('.flipped')
        cards.forEach((el) => {
            el.classList.remove('flipped')
        })
        interval = setInterval(startTimer, 1000)
    }, 5000)
}

function renderAgainButton(container) {
    const againButton = document.createElement('button')
    againButton.classList.add('level-footer-button')
    againButton.textContent = 'Начать заново'
    container.appendChild(againButton)
    againButton.addEventListener('click', () => {
        const gameCards = document.querySelectorAll('.main-game-card')
        gameCards.forEach((card) => card.classList.remove('flipped'))
    })
}

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
    // console.log(mil)

    mil++
    if (mil < 9) {
        milElem.textContent = '0' + mil
    }

    if (mil >= 10) {
        milElem.textContent = mil
    }

    if (mil > 59) {
        second++
        secElem.textContent = '0' + second
        mil = 0
        milElem.textContent = '0' + mil

        clearInterval(interval)
        alert('Вы проиграли!')
        sec = 0
    }

    // секунды
    if (second < 9) {
        secElem.textContent = '0' + second
    }
    if (second > 9) {
        secElem.textContent = second
    }
    // if (second > 59) {
    //     clearInterval(interval)
    //     alert('Вы проиграли!')
    //     sec = 0

    //     // Экран поражения
    // }
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

// уровни
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
