const app = document.querySelector(".app");

window.application = {
    blocks: {},
    screens: {},
    timers: [],
    level: [],
    cards: [],

    renderScreen: function (screenName) {
        window.application.timers.forEach((id) => {
            clearInterval(id);
        });

        if (window.application.screens[screenName]) {
            app.innerHTML = "";

            window.application.screens[screenName]();
        }
    },
    renderBlock: function (blockName, container) {
        if (window.application.blocks[blockName]) {
            window.application.blocks[blockName](container);
        } else {
            console.warn("Ошибка");
        }
    },
};
