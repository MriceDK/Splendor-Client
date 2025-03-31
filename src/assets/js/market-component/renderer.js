import * as DevelopmentCardRenderer from "../development-card-component/renderer.js";

function renderMarket(gameInfo) {
    const $target= document.querySelector(".market-grid-container");

    renderLevelRows(gameInfo.market, $target);
}

function renderLevelRows(market, $target) {

    market.forEach(cardRow => {

        console.log(cardRow)
        renderLevelCard(cardRow.level, cardRow.cardStackSize, $target);

        const developmentCards = cardRow.visibleCards;

        developmentCards.forEach(card => {

            DevelopmentCardRenderer.renderDevelopmentCard(card, $target);

        })

    })

}

function renderLevelCard(level, cardStackSize, $target) {
    const $levelCard = document.querySelector("#level-card").content.firstElementChild.cloneNode(true);

    $levelCard.classList.add(`level-${level}`);
    $levelCard.querySelector(".level-title").innerText = level;
    $levelCard.querySelector(".card-amount").innerText = cardStackSize;

    $target.insertAdjacentHTML("beforeend", $levelCard.outerHTML)
}

export { renderMarket };