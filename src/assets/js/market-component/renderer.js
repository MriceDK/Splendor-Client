
function renderMarket(gameInfo) {
    const $target= document.querySelector(".market-grid-container");

    renderLevelRows(gameInfo.market, $target);
}

function renderLevelRows(market, $target) {
    const $devCard = document.querySelector("#development-card");
    const $levelCard = document.querySelector("#level-card");

    market.forEach(cardRow => {

        renderLevelCard();

        const developmentCards = cardRow.visibleCards;

        developmentCards.forEach(developmentCard => {

            renderDevelopmentCard();

        })

    })

}

export { renderMarket };