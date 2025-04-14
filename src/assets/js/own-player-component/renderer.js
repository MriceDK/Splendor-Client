import * as getOwnInfo from "./handler.js";
import * as NobleRenderer from "../noble-component/renderer.js";
import {renderDevelopmentCards} from "../development-card-component/renderer.js";

function ownPlayerCardRenderer(gameInfo) {
    const ownPlayer = getOwnInfo.getOwnPlayerInfo(gameInfo);

    const $playerCard = document.querySelector("#own-player-card");
    $playerCard.querySelector("#own-username").textContent = ownPlayer.name;
    $playerCard.querySelector("#own-prestige-points").textContent = ownPlayer.totalPrestigePoints;

    const $ownNobles = $playerCard.querySelector("#nobles");
    NobleRenderer.renderNobles(ownPlayer.nobles, $ownNobles);
    NobleRenderer.renderEmptyNobleSpots($ownNobles);

    Object.entries(ownPlayer.tokens).forEach(token => renderOwnTokenValue(token));
    Object.entries(ownPlayer.bonuses).forEach(bonus => renderOwnBonusValue(bonus));

    const $reservedCards = $playerCard.querySelector(".own-reserved-cards");
    renderDevelopmentCards(ownPlayer.reserve, $reservedCards);

}

function renderOwnTokenValue(token) {
    document.querySelector(`.own-inventory .${token[0].toLowerCase()} .token-text`).innerText = token[1];
}

function renderOwnBonusValue(bonus) {
    document.querySelector(`.own-inventory  .${bonus[0].toLowerCase()} .card-text`).innerText = bonus[1];
}

function renderTooManyGemsPopUp(playerTokens) {
    const $tooMuchGemsTemplate = document.querySelector("#too-many-gems-pop-up-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".popup-container");
    $target.innerHTML = "";
    $target.classList.remove("hidden");
    Object.entries(playerTokens).forEach(token => putInitalValue($tooMuchGemsTemplate, token));

    $target.insertAdjacentHTML("beforeend", $tooMuchGemsTemplate.outerHTML);


}

function putInitalValue($tooMuchGemsTemplate, token) {
    const selector = `#token-remover-${token[0].toLowerCase()}`;
    $tooMuchGemsTemplate.querySelector(selector).setAttribute("value", token[1]);

}

export {ownPlayerCardRenderer, renderTooManyGemsPopUp, renderOwnTokenValue};