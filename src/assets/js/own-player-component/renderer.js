import * as getOwnInfo from "./handler.js"

function ownPlayerCardRenderer(){
    const $playerCard = document.querySelector("#own-player-card");
    $playerCard.querySelector("#own-username").insertAdjacentElement("beforeend", getOwnInfo.getOwnUsername());
    $playerCard.querySelector("#own-prestige-points").insertAdjacentElement("beforeend", getOwnInfo.getOwnPrestigePoints());
    $playerCard.querySelector("#nobles").insertAdjacentElement("beforeend", getOwnInfo.getOwnNobles());
    $playerCard.querySelector("#own-gems").insertAdjacentElement("afterbegin", getOwnInfo.getOwnGems());
    $playerCard.querySelector("#own-bonuses").insertAdjacentElement("beforeend", getOwnInfo.getOwnBonuses());
    $playerCard.querySelector("#own-reservated-cards").insertAdjacentElement("beforeend", getOwnInfo.getOwnReservatedCards());

}