import * as getOwnInfo from "./helper.js";
import {renderDevelopmentCards} from "../development-card/renderer.js";

function ownPlayerCardRenderer(gameInfo) {
    const ownPlayer = getOwnInfo.getOwnPlayerInfo(gameInfo);

    const $playerCard = document.querySelector("#own-player-card");
    $playerCard.querySelector("#own-username").textContent = ownPlayer.name;
    $playerCard.querySelector("#own-prestige-points").textContent = ownPlayer.totalPrestigePoints;
    ownPlayer.nobles.forEach(noble => renderAcquiredNoble(noble));
    Object.entries(ownPlayer.tokens).forEach(token => renderOwnTokenValue(token));
    Object.entries(ownPlayer.bonuses).forEach(bonus => renderOwnBonusValue(bonus));

    const $reservedCards = $playerCard.querySelector(".own-reserved-cards");
    renderDevelopmentCards(ownPlayer.reserve, $reservedCards);

}

function renderAcquiredNoble(noble){
    const $noblesDiv = document.querySelector("#noble");
    const $noblesTemplate = document.querySelector(".noble-template").content.firstElementChild.cloneNode(true);
    $noblesTemplate.querySelector(".noble-name").innerHTML = noble.name;
    $noblesTemplate.querySelector(".noble-prestige-points-given").innerHTML = noble.prestigePoints;

    $noblesDiv.insertAdjacentHTML("beforeend", $noblesTemplate.outerHTML);

}

function renderOwnTokenValue(token) {
    document.querySelector(`.own-inventory .${token[0].toLowerCase()} .token-text`).innerText = token[1];
}

function renderOwnBonusValue(bonus) {
    document.querySelector(`.own-inventory  .${bonus[0].toLowerCase()} .card-text`).innerText = bonus[1];
}

export {ownPlayerCardRenderer, renderOwnTokenValue};