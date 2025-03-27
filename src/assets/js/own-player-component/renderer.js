import * as getOwnInfo from "./handler.js"

function ownPlayerCardRenderer(){
    const $playerCard = document.querySelector("#own-player-card");
    $playerCard.querySelector("#own-username").insertAdjacentHTML("beforeend", getOwnInfo.getOwnUsername());
    $playerCard.querySelector("#own-prestige-points").insertAdjacentHTML("beforeend", getOwnInfo.getOwnPrestigePoints());
    $playerCard.querySelector("#nobles").insertAdjacentHTML("beforeend", getOwnInfo.getOwnNobles());
    $playerCard.querySelector("#own-gems").insertAdjacentHTML("afterbegin", getOwnInfo.getOwnGems());
    $playerCard.querySelector("#own-bonuses").insertAdjacentHTML("beforeend", getOwnInfo.getOwnBonuses());
    $playerCard.querySelector("#own-reservated-cards").insertAdjacentHTML("beforeend", getOwnInfo.getOwnReservatedCards());

}

export { ownPlayerCardRenderer }