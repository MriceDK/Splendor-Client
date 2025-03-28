
import { getTotalReservedCards } from "./handler.js"
import { tokenInPurse } from "./handler.js";
import { checkBonuses } from "./handler.js";

function renderOpponentStats(opponent){
    const $template = document.querySelector("#opponent-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".username-flexcontainer");
    console.log(opponent);
    $template.querySelector(".player").innerText = opponent.name;
    $template.querySelector(".points").innerText = opponent.totalPrestigePoints;
    //$template.querySelector(".reserved-count").innerText = getTotalReservedCards(opponent);
    $template.querySelector(".gems.red>.token-text").innerText = tokenInPurse(opponent, "Ruby");;
    $template.querySelector(".gems.green>.token-text").innerText = tokenInPurse(opponent, "Emerald");
    $template.querySelector(".gems.black>.token-text").innerText = tokenInPurse(opponent, "Onyx");
    $template.querySelector(".gems.blue>.token-text").innerText = tokenInPurse(opponent, "Sapphire");
    $template.querySelector(".gems.white>.token-text").innerText = tokenInPurse(opponent, "Diamond");
    $template.querySelector(".gems.yellow>.token-text").innerText = tokenInPurse(opponent, "Gold");

    //$template.querySelector(".card.red>.token-text").innerText = checkBonuses(opponent, "Ruby");
    //$template.querySelector(".card.green>.token-text").innerText = checkBonuses(opponent, "Emerald");
    //$template.querySelector(".card.black>.token-text").innerText = checkBonuses(opponent, "Onyx");
    //$template.querySelector(".card.blue>.token-text").innerText = checkBonuses(opponent, "Sapphire");
    //$template.querySelector(".card.white>.token-text").innerText = checkBonuses(opponent, "Diamond");
    //$template.querySelector(".card.yellow>.token-text").innerText = checkBonuses(opponent, "Gold");

    //$template.querySelector("class:first-child").innerText = opponent.acquiredNobles[0].tokenInPurse(opponent, "Ruby");name;
    //$template.querySelector("class:nth-child(1)").innerText = opponent.acquiredNobles[1].name;
    //$template.querySelector("class:nth-child(2)").innerText = opponent.acquiredNobles[2].name;

    $target.insertAdjacentHTML("beforeend", $template.outerHTML)

    




}

export {renderOpponentStats};

