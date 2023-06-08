// import { jest } from 'jest'
// import expect from 'jest'
const { jest } = require('@jest/globals')
const { test } = require('@jest/globals')
const { expect } = require('@jest/globals')
const { winAgainButton } = require('./index.ts')
// const { expect } = require('jest')

test('win again button should emit the restart event', () => {
    const winAgainButton = document.getElementsByClassName('win-again-button')

    // имитация обработчика событий
    const mockedHandler = jest.fn()
    winAgainButton.addEventListener('click', mockedHandler)

    winAgainButton.click()

    // проверка вызова mockedHandler
    expect(mockedHandler).toHaveBeenCalled()
})

module.exports = { winAgainButton }
