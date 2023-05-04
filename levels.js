window.addEventListener('load', () => {
    window.application.renderScreen('menu-start')
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

function levelsEvent(param) {
    startButton.addEventListener('click', () => {
        window.application.renderScreen('game')
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

window.application.blocks['menu-title'] = renderMenuTitle
window.application.blocks['level-button'] = renderLevelsButton
window.application.blocks['start-button'] = renderStartButton

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

    window.application.renderBlock('menu-title', startMenuHeader)
    window.application.renderBlock('level-button', startMenuLevel)
    window.application.renderBlock('start-button', startMenuStart)
}

window.application.screens['menu-start'] = renderStartMenu
window.application.cards.push(cards)
