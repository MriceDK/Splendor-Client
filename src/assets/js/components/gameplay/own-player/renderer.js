import * as getOwnInfo from "./helper.js";
import * as NobleRenderer from "../noble-component/renderer.js";
import * as DevelopmentCardRenderer from "../development-card/renderer.js";

function ownPlayerCardRenderer(gameInfo) {
    const ownPlayer = getOwnInfo.getOwnPlayerInfo(gameInfo);

    const $playerCard = document.querySelector("#own-player-card");
    $playerCard.querySelector("#own-username").textContent = ownPlayer.name;
    $playerCard.querySelector("#own-prestige-points").textContent = ownPlayer.totalPrestigePoints;

    const $ownNobles = $playerCard.querySelector(".nobles-container");
    NobleRenderer.renderNobles(ownPlayer.nobles, $ownNobles);
    NobleRenderer.renderEmptyNobleSpots($ownNobles);

    Object.entries(ownPlayer.tokens).forEach(token => renderOwnTokenValue(token));
    Object.entries(ownPlayer.bonuses).forEach(bonus => renderOwnBonusValue(bonus));

    const $reservedCards = $playerCard.querySelector(".own-reserved-cards");
    DevelopmentCardRenderer.renderDevelopmentCards(ownPlayer.reserve, $reservedCards);

}

function renderOwnTokenValue(token) {
    document.querySelector(`.own-inventory .${token[0].toLowerCase()} .token-text`).innerText = token[1];
}

function renderOwnBonusValue(bonus) {
    document.querySelector(`.own-inventory  .${bonus[0].toLowerCase()} .card-text`).innerText = bonus[1];
}

export {ownPlayerCardRenderer, renderOwnTokenValue};