import * as getOwnInfo from "./handler.js"

function ownPlayerCardRenderer(gameInfo){
    const ownPlayer = getOwnInfo.getOwnPlayerInfo(gameInfo);

    const $playerCard = document.querySelector("#own-player-card");
    $playerCard.querySelector("#own-username").textContent = ownPlayer.name;
    $playerCard.querySelector("#own-prestige-points").textContent = ownPlayer.totalPrestigePoints;
    //$playerCard.querySelector("#nobles").insertAdjacentHTML("beforeend", ownPlayer.acquiredNobles);
    Object.entries(ownPlayer.tokens).forEach(token => renderOwnTokenValue(token));
    Object.entries(ownPlayer.bonuses).forEach(bonus => renderOwnBonusValue(bonus));
    $playerCard.querySelector("#own-reservated-cards").insertAdjacentHTML("beforeend", ownPlayer.reserve);

}

function renderOwnTokenValue(token){
    document.querySelector(`.own-inventory .${token[0].toLowerCase()} .token-text`).innerText = token[1];
}

function renderOwnBonusValue(bonus){
    document.querySelector(`.own-inventory  .${bonus[0].toLowerCase()} .card-text`).innerText = bonus[1];
}

function renderTooManyGemsPopUp(){
    const $tooMuchGems = document.querySelector("#too-many-gems-pop-up-template");

}

export { ownPlayerCardRenderer, renderTooManyGemsPopUp }