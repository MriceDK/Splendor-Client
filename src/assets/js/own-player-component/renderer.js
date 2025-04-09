import * as getOwnInfo from "./handler.js"

function ownPlayerCardRenderer(gameInfo){
    const ownPlayer = getOwnInfo.getOwnPlayerInfo(gameInfo);

    const $playerCard = document.querySelector("#own-player-card");
    $playerCard.querySelector("#own-username").textContent = ownPlayer.name;
    $playerCard.querySelector("#own-prestige-points").textContent = ownPlayer.totalPrestigePoints;
    //$playerCard.querySelector("#nobles").insertAdjacentHTML("beforeend", ownPlayer.acquiredNobles);
    Object.entries(ownPlayer.tokens).forEach(token => renderOwnTokenValue(token));
    Object.entries(ownPlayer.bonuses).forEach(bonus => renderOwnBonusValue(bonus));
    $playerCard.querySelector("#own-reserved-cards").insertAdjacentHTML("beforeend", ownPlayer.reserve);

}

function renderOwnTokenValue(token){
    document.querySelector(`.own-inventory .${token[0].toLowerCase()} .token-text`).innerText = token[1];
}

function renderOwnBonusValue(bonus){
    document.querySelector(`.own-inventory  .${bonus[0].toLowerCase()} .card-text`).innerText = bonus[1];
}

function renderTooManyGemsPopUp(playerTokens){
    const $tooMuchGemsTemplate = document.querySelector("#too-many-gems-pop-up-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector("#too-many-gems-pop-up-result");
    Object.entries(playerTokens).forEach(token => putInitalValue($tooMuchGemsTemplate, token));

    $target.insertAdjacentElement("beforeend", $tooMuchGemsTemplate.outerHTML);


}

function putInitalValue($tooMuchGemsTemplate, token){
    const selector = `#token-remover-${token[0].toLowerCase()}`;
    $tooMuchGemsTemplate.querySelector(selector).setAttribute("value", token[1]);
    
}

export { ownPlayerCardRenderer, renderTooManyGemsPopUp }