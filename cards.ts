let cards = [
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

const cardObj: {[index: number]: string} = {}

for (let i = 0; i < cards.length; i++) {
    cardObj[i] = cards[i]
}

console.log(cardObj)
