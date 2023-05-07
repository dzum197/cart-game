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

window.addEventListener('load', () => {
    game.renderScreen('menu-start')
})

// выбор сложности
function renderLevelsButton(container) {
    for (let i = 1; i <= 3; i++) {
        const levelButton = document.createElement('input')
        levelButton.setAttribute('type', 'button')
        levelButton.setAttribute('value', i)
        levelButton.classList.add('level-main-button')
        container.appendChild(levelButton)

        levelButton.addEventListener('click', () => {
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

function levelsEvent(param) {
    startButton.addEventListener('click', () => {
        game.renderScreen('game')
        console.log(`Уровень сложности ${param}`)
    })
}

// Кнопка запуска

let startButton

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

game.blocks['menu-title'] = renderMenuTitle
game.blocks['level-button'] = renderLevelsButton
game.blocks['start-button'] = renderStartButton

const app = document.querySelector('.app')
const cards = document.querySelector('cards')

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

    game.renderBlock('menu-title', startMenuHeader)
    game.renderBlock('level-button', startMenuLevel)
    game.renderBlock('start-button', startMenuStart)
}

game.screens['menu-start'] = renderStartMenu
game.cards.push(cards)
