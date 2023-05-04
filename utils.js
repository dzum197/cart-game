let intervalId
const gameDelay = 5000

export function handleCardClick(event) {
    const card = event.target

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

export function createCard(container, cardIndex) {
    const front = document.createElement('div')
    front.classList.add('game-front')
    container.appendChild(front)

    const card = document.createElement('div')
    card.classList.add('game-front-card')
    front.appendChild(card)

    const img = document.createElement('img')
    img.src = `${window.application.cards[0][cardIndex]}`
    card.appendChild(img)

    const back = document.createElement('div')
    back.classList.add('game-back')
    card.appendChild(back)

    // Назначение обработчика клика на карточке
    card.addEventListener('click', handleCardClick)

    return card
}

export function renderGameZone1(container) {
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

export function renderGameZone2(container) {
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

export function renderGameZone3(container) {
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

export function levelDifficulty() {
    const level = window.application.level[window.application.level.length - 1]

    switch (level) {
        case '1':
            window.application.blocks['game-card'] = renderGameZone1
            break

        case '2':
            window.application.blocks['game-card'] = renderGameZone2
            break

        case '3':
            window.application.blocks['game-card'] = renderGameZone3
            break

        default:
            break
    }
}

// Добавляем обработчик для каждой карточки
const gameCards = document.querySelectorAll('.game-front-card')
gameCards.forEach((card) => card.addEventListener('click', handleCardClick))

export function renderAgainButton(container) {
    const againButton = document.createElement('button')
    againButton.classList.add('level-footer-button')
    againButton.textContent = 'Начать заново'
    container.appendChild(againButton)
    // Добавляем обработчик клика на кнопку "Начать заново"
    againButton.addEventListener('click', () => {
        gameCards.forEach((card) => card.classList.remove('flipped'))
    })
}

export function renderTimer(container) {
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

export function startTimer() {
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

window.application.blocks['again-button'] = renderAgainButton
window.application.blocks['timer'] = renderTimer

const app = document.querySelector('.app')

export function renderGameScreen() {
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

    window.application.renderBlock('timer', header)
    window.application.renderBlock('again-button', header)
    window.application.renderBlock('game-card', main)

    const gameBacks = document.querySelectorAll('.game-back')
    gameBacks.forEach((back) => back.classList.add('back'))
}

// Добавляем "game" в список завершённых экранов
window.application.screens['game'] = renderGameScreen

export function renderLevelsButton(container) {
    for (let i = 1; i <= 3; i++) {
        const levelButton = document.createElement('input')
        levelButton.setAttribute('type', 'button')
        levelButton.setAttribute('value', i)
        levelButton.classList.add('level-main-button')
        container.appendChild(levelButton)

        levelButton.addEventListener('click', () => {
            window.application.level.pop()
            window.application.level.push(levelButton.value)

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

export function levelsEvent(param) {
    startButton.addEventListener('click', () => {
        window.application.renderScreen('game')
        console.log(`Уровень сложности ${param}`)
    })
}

export function renderStartButton(container) {
    startButton = document.createElement('button')
    startButton.classList.add('start-button')
    startButton.textContent = 'Старт'
    container.appendChild(startButton)
}

export function renderMenuTitle(container) {
    const levelTitle = document.createElement('h1')
    levelTitle.classList.add('level-header-title')
    levelTitle.textContent = 'Выбери сложность'
    container.appendChild(levelTitle)
}

export function renderStartMenu() {
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

    window.application.renderBlock('menu-title', startMenuHeader)
    window.application.renderBlock('level-button', startMenuLevel)
    window.application.renderBlock('start-button', startMenuStart)
}
