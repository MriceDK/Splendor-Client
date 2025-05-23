import * as DevelopmentCardRenderer from "../development-card/renderer.js";
import { convertToKebabCase } from "../../../helper/utils.js";
import * as NobleRenderer from "../noble/renderer.js";

function renderMarket(gameInfo) {
    const $target = document.querySelector(".market-grid-container");
    $target.innerHTML = document.querySelector("#market-templates").outerHTML;
    NobleRenderer.renderNobles(gameInfo.unclaimedNobles, $target);
    renderLevelRows(gameInfo.market, $target);
}

function renderLevelRows(market, $target) {

    market.forEach(cardRow => {
        renderLevelCard(cardRow.level, cardRow.cardStackSize, $target);
        DevelopmentCardRenderer.renderDevelopmentCards(cardRow.visibleCards, $target);
    });

}

function renderLevelCard(level, cardStackSize, $target) {
    const $levelCard = document.querySelector("#level-card").content.firstElementChild.cloneNode(true);

    $levelCard.classList.add(`level-${level}`);
    $levelCard.setAttribute("data-level", level);
    $levelCard.querySelector(".level-title").innerText = level;
    $levelCard.querySelector(".card-amount").innerText = cardStackSize;

    $target.insertAdjacentHTML("beforeend", $levelCard.outerHTML);
}


export { renderMarket};
