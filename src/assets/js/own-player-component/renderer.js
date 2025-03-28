import * as getOwnInfo from "./handler.js"

function ownPlayerCardRenderer(gameInfo){
    const ownPlayer = getOwnInfo.getOwnPlayerInfo(gameInfo);

    const $playerCard = document.querySelector("#own-player-card");
    $playerCard.querySelector("#own-username").textContent = ownPlayer.name;
    $playerCard.querySelector("#own-prestige-points").textContent = ownPlayer.totalPrestigePoints;
    $playerCard.querySelector("#nobles").insertAdjacentHTML("beforeend", ownPlayer.acquiredNobles);
    $playerCard.querySelector("#own-gems").insertAdjacentHTML("afterbegin", ownPlayer.tokens);
    $playerCard.querySelector("#own-bonuses").insertAdjacentHTML("beforeend", ownPlayer.bonuses);
    $playerCard.querySelector("#own-reservated-cards").insertAdjacentHTML("beforeend", ownPlayer.reserve);

}

export { ownPlayerCardRenderer }