
import { getTotalReservedCards } from "./handler.js"
import { tokenBonusInPurse } from "./handler.js";

function renderOpponentStats(opponent){
    const $template = document.querySelector("#opponent-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".username-flexcontainer");
    console.log(opponent);
    $template.querySelector(".player").innerText = opponent.name;
    $template.querySelector(".points").innerText = opponent.totalPrestigePoints;
    //$template.querySelector(".reserved-count").innerText = getTotalReservedCards(opponent);
    $template.querySelector(".gems.red>.token-text").innerText = tokenBonusInPurse(opponent, "Ruby", false);;
    $template.querySelector(".gems.green>.token-text").innerText = tokenBonusInPurse(opponent, "Emerald", false);
    $template.querySelector(".gems.black>.token-text").innerText = tokenBonusInPurse(opponent, "Onyx", false);
    $template.querySelector(".gems.blue>.token-text").innerText = tokenBonusInPurse(opponent, "Sapphire", false);
    $template.querySelector(".gems.white>.token-text").innerText = tokenBonusInPurse(opponent, "Diamond", false);
    $template.querySelector(".gems.yellow>.token-text").innerText = tokenBonusInPurse(opponent, "Gold", false);

    $template.querySelector(".card.red>.token-text").innerText = tokenBonusInPurse(opponent, "Ruby", true);
    $template.querySelector(".card.green>.token-text").innerText = tokenBonusInPurse(opponent, "Emerald", true);
    $template.querySelector(".card.black>.token-text").innerText = tokenBonusInPurse(opponent, "Onyx", true);
    $template.querySelector(".card.blue>.token-text").innerText = tokenBonusInPurse(opponent, "Sapphire", true);
    $template.querySelector(".card.white>.token-text").innerText = tokenBonusInPurse(opponent, "Diamond", true);

    //$template.querySelector("class:first-child").innerText = opponent.acquiredNobles[0].tokenInPurse(opponent, "Ruby");name;
    //$template.querySelector("class:nth-child(1)").innerText = opponent.acquiredNobles[1].name;
    //$template.querySelector("class:nth-child(2)").innerText = opponent.acquiredNobles[2].name;

    $target.insertAdjacentHTML("beforeend", $template.outerHTML)

    




}

export {renderOpponentStats};

