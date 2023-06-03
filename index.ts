import './style.css'

// const app = document.querySelector('.app')

// window.application

interface IBlockFunction {
    (container: HTMLElement): void
}

interface IScreenFunction {
    (): void
}

interface IGame {
    blocks: Record<string, IBlockFunction>
    screens: Record<string, IScreenFunction>
    timers: number[]
    level: any //
    levelSelected: string
    successfulPairs: number
    cards: Array<string>
    renderScreen: (screenName: string) => void
    renderBlock: (blockName: string, container: HTMLElement) => void
}

let app = document.querySelector('.app') as HTMLElement

const game: IGame = {
    blocks: {},
    screens: {},
    timers: [],
    level: [],
    levelSelected: '',
    successfulPairs: 0,
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
function createCard(container: HTMLElement, cardIndex: number) {
    const card = document.createElement('div')
    card.classList.add('main-game-card')
    container.appendChild(card)

    const front = document.createElement('img')
    front.classList.add('front-card')
    front.setAttribute('src', `${game.cards[0][cardIndex]}`)
    card.appendChild(front)

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
// let firstCardImg: Element | null = null
// let secondCardImg: Element | null = null
let firstCardImg: HTMLImageElement, secondCardImg: HTMLImageElement

function getNumberOfPairs(level: string) {
    if (level === 'easy') {
        return 3
    } else if (level === 'medium') {
        return 6
    } else if (level === 'hard') {
        return 9
    }
}

let successfulPairs = 0 // количество успешных пар

const levelSelect = game.levelSelected
let selectedLevel = levelSelect.valueOf() // value or valueOf()

// levelSelect.addEventListener('change', (event) => {
//     selectedLevel = event.target.value
//     numberOfPairs = getNumberOfPairs(selectedLevel)
// })

let numberOfPairs = getNumberOfPairs(selectedLevel) // количество пар для выбранного уровня сложности

function handleCardClick(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement

    if (card.classList.contains('flipped')) {
        return
    }

    flipCard(card)
}

function flipCard(card: HTMLElement) {
    const cardImg = card.querySelector('.front-card') as HTMLImageElement

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

// проверка на совпадение карт
function checkForMatch() {
    if (firstCardImg.src === secondCardImg.src) {
        firstCardImg.parentElement!.classList.add('matched')
        secondCardImg.parentElement!.classList.add('matched')
        game.successfulPairs++
        if (game.successfulPairs === Number(game.level) * 3) {
            const min = Number(
                document.querySelector('.timer-sec')!.textContent
            )
            const sec = Number(
                document.querySelector('.timer-mil')!.textContent
            )
            console.log(sec, min)

            const timeString = min
                ? String(min) + ' min ' + String(sec) + ' sec '
                : String(sec) + ' sec '
            // alert(`Поздравляем, вы победили! Затраченное время ${timeString}`)
            clearInterval(interval)
            renderWinScreen()
            // renderResultScreen()
        }
    } else {
        firstCardImg.parentElement!.classList.remove('flipped')
        secondCardImg.parentElement!.classList.remove('flipped')
        clearInterval(interval)
        // alert('Вы проиграли!')
        sec = 0
        renderLoseScreen()
    }

    lockBoard = false
    hasFlippedCard = false
    firstCardImg = null
    secondCardImg = null
}

function levelDifficulty() {
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

function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

// генерация количества карточек в соответствии с уровнем сложности
function renderGameZone1(container: HTMLElement) {
    const cardsArr = shuffle(game.cards)
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

function renderGameZone2(container: HTMLElement) {
    const cardsArr = shuffle(game.cards)
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

function renderGameZone3(container: HTMLElement) {
    const cardsArr = shuffle(game.cards)
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

function renderAgainButton(container: HTMLElement) {
    const againButton = document.createElement('button')
    againButton.classList.add('level-footer-button')
    againButton.textContent = 'Начать заново'
    container.appendChild(againButton)
    againButton.addEventListener('click', () => {
        const gameCards = document.querySelectorAll('.main-game-card')
        gameCards.forEach((card) => card.classList.remove('flipped'))

        dot = 0
        sec = 0
        milS = 0
        second = 0
        mil = 0
        clearInterval(interval)
        renderGameScreen() // функция начала игры
    })
}

function renderTimer(container: HTMLElement) {
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
    interval: NodeJS.Timer

function startTimer() {
    let milElem = document.querySelector('.timer-mil')
    let secElem = document.querySelector('.timer-sec')

    mil++
    if (mil < 9) {
        milElem.textContent = '0' + mil
    }

    if (mil >= 10) {
        milElem.textContent = String(mil)
    }

    if (mil > 59) {
        second++
        secElem.textContent = '0' + second
        mil = 0
        milElem.textContent = '0' + mil

        clearInterval(interval)
        // alert('Вы проиграли!')
        sec = 0
        renderLoseScreen()
    }

    // секунды
    if (second < 9) {
        secElem.textContent = '0' + second
    }
    if (second > 9) {
        secElem.textContent = String(second)
    }
}

game.blocks['again-button'] = renderAgainButton
game.blocks['timer'] = renderTimer

function renderGameScreen() {
    levelDifficulty()

    document.querySelector('.app').innerHTML = ''

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

    game.renderBlock('timer', header)
    game.renderBlock('again-button', header)
    game.renderBlock('game-card', main)

    const gameBacks = document.querySelectorAll('.game-back')
    gameBacks.forEach((back) => back.classList.add('back'))
}

// Добавляем "game" в список завершённых экранов
game.screens['game'] = renderGameScreen

// уровни
function renderLevelsButton(container: HTMLElement) {
    for (let i = 1; i <= 3; i++) {
        const levelButton = document.createElement('input')
        levelButton.setAttribute('type', 'button')
        levelButton.setAttribute('value', String(i))
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

let startButton: HTMLElement

function levelsEvent(param: String) {
    startButton.addEventListener('click', () => {
        game.renderScreen('game')
        console.log(`Уровень сложности ${param}`)
    })
}

function renderStartButton(container: HTMLElement) {
    startButton = document.createElement('button')
    startButton.classList.add('start-button')
    startButton.textContent = 'Старт'
    container.appendChild(startButton)
}

function renderMenuTitle(container: HTMLElement) {
    const levelTitle = document.createElement('h1')
    levelTitle.classList.add('level-header-title')
    levelTitle.textContent = 'Выбери сложность'
    container.appendChild(levelTitle)
}

game.blocks['menu-title'] = renderMenuTitle
game.blocks['level-button'] = renderLevelsButton
game.blocks['start-button'] = renderStartButton

function renderStartMenu() {
    app.replaceChildren()
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

    game.renderBlock('menu-title', startMenuHeader)
    game.renderBlock('level-button', startMenuLevel)
    game.renderBlock('start-button', startMenuStart)
}
renderStartMenu()

// Инициализация изображений для карточек
game.cards = [
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
]
// Запуск начального экрана
game.renderScreen('start')

function renderWinScreen() {
    const winScreenContainer = document.createElement('div')
    winScreenContainer.classList.add('win-screen-container')

    const winScreen = document.createElement('div')
    winScreen.classList.add('win-screen')

    const winImgDiv = document.createElement('div')
    winImgDiv.classList.add('win-img-div')
    const winImg = document.createElement('img')
    winImg.setAttribute('src', './img/win.png')
    winImg.classList.add('win-img')

    const winScreenHeader = document.createElement('div')
    winScreenHeader.classList.add('win-header')
    winScreenHeader.textContent = 'Вы победили!'

    const min = Number(document.querySelector('.timer-sec')!.textContent)
    const sec = Number(document.querySelector('.timer-mil')!.textContent)
    console.log(sec, min)

    const timeString = min
        ? String(min) + ' min ' + String(sec) + ' sec '
        : String(sec) + ' sec '

    const winScreenTime = document.createElement('div')
    winScreenTime.classList.add('time-text')
    winScreenTime.textContent = 'Затраченное время: ' + `${timeString}`

    const winAgainButton = document.createElement('button')
    winAgainButton.classList.add('win-again-button')
    winAgainButton.textContent = 'Играть снова'

    winAgainButton.addEventListener('click', () => {
        renderStartMenu() // функция начала игры
    })

    winScreenContainer.appendChild(winScreen)
    winScreen.appendChild(winImgDiv)
    winImgDiv.appendChild(winImg)
    winScreen.appendChild(winScreenHeader)
    winScreen.appendChild(winScreenTime)
    winScreen.appendChild(winAgainButton)

    app.appendChild(winScreenContainer)

    game.renderBlock('win-screen', winScreen)
    game.renderBlock('win-img-div', winImgDiv)
    game.renderBlock('win-img', winImg)
    game.renderBlock('win-header', winScreenHeader)
    game.renderBlock('time-text', winScreenTime)
    game.renderBlock('win-again-button', winAgainButton)
}

function renderLoseScreen() {
    const loseScreenContainer = document.createElement('div')
    loseScreenContainer.classList.add('win-screen-container')

    const loseScreen = document.createElement('div')
    loseScreen.classList.add('win-screen')

    const loseImgDiv = document.createElement('div')
    loseImgDiv.classList.add('lose-img-div')
    const loseImg = document.createElement('img')
    loseImg.setAttribute('src', './img/lose.png')
    loseImg.classList.add('lose-img')

    const loseScreenHeader = document.createElement('div')
    loseScreenHeader.classList.add('lose-header')
    loseScreenHeader.textContent = 'Вы проиграли :('

    const min = Number(document.querySelector('.timer-sec')!.textContent)
    const sec = Number(document.querySelector('.timer-mil')!.textContent)
    console.log(sec, min)

    const timeString = min
        ? String(min) + ' min ' + String(sec) + ' sec '
        : String(sec) + ' sec '

    const loseScreenTime = document.createElement('div')
    loseScreenTime.classList.add('time-text')
    loseScreenTime.textContent = 'Затраченное время: ' + `${timeString}`

    const loseAgainButton = document.createElement('button')
    loseAgainButton.classList.add('lose-again-button')
    loseAgainButton.textContent = 'Играть снова'

    loseAgainButton.addEventListener('click', () => {
        renderStartMenu() // функция начала игры
    })

    loseScreenContainer.appendChild(loseScreen)
    loseScreen.appendChild(loseImgDiv)
    loseImgDiv.appendChild(loseImg)
    loseScreen.appendChild(loseScreenHeader)
    loseScreen.appendChild(loseScreenTime)
    loseScreen.appendChild(loseAgainButton)

    app.appendChild(loseScreenContainer)

    game.renderBlock('lose-screen', loseScreen)
    game.renderBlock('lose-img-div', loseImgDiv)
    game.renderBlock('lose-img', loseImg)
    game.renderBlock('lose-header', loseScreenHeader)
    game.renderBlock('time-text', loseScreenTime)
    game.renderBlock('lose-again-button', loseAgainButton)
}