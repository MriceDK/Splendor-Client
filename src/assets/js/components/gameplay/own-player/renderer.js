import * as getOwnInfo from "./helper.js";
import {getAllOwnPlayerTokens} from "./helper.js";
import * as NobleRenderer from "../noble/renderer.js";
import * as DevelopmentCardRenderer from "../development-card/renderer.js";
import {getPrestigePointsPercentage} from "../opponent-card/helper.js";

function ownPlayerCardRenderer(gameInfo) {
    const ownPlayer = getOwnInfo.getOwnPlayerInfo(gameInfo);

    const $playerCard = document.querySelector("#own-player-card");

    document.querySelector("#own-username").textContent = ownPlayer.name;
    document.querySelector("#own-prestige-points p").textContent = ownPlayer.totalPrestigePoints;
    document.querySelector("#own-player-card .points-bar").style.width = `${getPrestigePointsPercentage(ownPlayer.totalPrestigePoints)}%`;

    const $ownNobles = $playerCard.querySelector(".nobles-container");
    $ownNobles.innerHTML = "";
    NobleRenderer.renderNobles(ownPlayer.nobles, $ownNobles);
    NobleRenderer.renderEmptyNobleSpots($ownNobles);

    Object.entries(getAllOwnPlayerTokens(ownPlayer)).forEach(token => renderOwnTokenValue(token));
    Object.entries(ownPlayer.bonuses).forEach(bonus => renderOwnBonusValue(bonus));

    const $reservedCards = $playerCard.querySelector(".own-reserved-cards");
    $reservedCards.innerHTML = "";
    DevelopmentCardRenderer.renderDevelopmentCards(ownPlayer.reserve, $reservedCards, true);
    DevelopmentCardRenderer.renderEmptyDevelopmentCardSpots($reservedCards);

}

function renderOwnTokenValue(token) {
    document.querySelector(`.own-inventory .${token[0].toLowerCase()} .gem-value`).innerText = token[1];
}

function renderOwnBonusValue(bonus) {
    document.querySelector(`.own-inventory  .${bonus[0].toLowerCase()} .card-text`).innerText = bonus[1];
}

export {ownPlayerCardRenderer, renderOwnTokenValue};