import './style.css'
import { handleCardClick } from './utils'
import { createCard } from './utils'
import { renderGameZone1 } from './utils'
import { renderGameZone2 } from './utils'
import { renderGameZone3 } from './utils'
import { levelDifficulty } from './utils'
import { renderAgainButton } from './utils'
import { renderTimer } from './utils'
import { startTimer } from './utils'
import { renderGameScreen } from './utils'
import { renderLevelsButton } from './utils'
import { levelsEvent } from './utils'
import { renderStartButton } from './utils'
import { renderMenuTitle } from './utils'
import { renderStartMenu } from './utils'

const app = document.querySelector('.app')

window.application = {
    blocks: {},
    screens: {},
    timers: [],
    level: [],
    cards: [],

    renderScreen: function (screenName) {
        window.application.timers.forEach((id) => {
            clearInterval(id)
        })

        if (window.application.screens[screenName]) {
            app.innerHTML = ''

            window.application.screens[screenName]()
        }
    },
    renderBlock: function (blockName, container) {
        if (window.application.blocks[blockName]) {
            window.application.blocks[blockName](container)
        } else {
            console.warn('Ошибка')
        }
    },
}

handleCardClick()
createCard()
renderGameZone1()
renderGameZone2()
renderGameZone3()
levelDifficulty()
renderAgainButton()
renderTimer()
startTimer()
renderGameScreen()
renderLevelsButton()
levelsEvent()
renderStartButton()
renderMenuTitle()
renderStartMenu()
