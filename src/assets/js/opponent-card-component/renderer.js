
import { getTotalReservedCards } from "./handler.js"
import { tokenInPurse } from "./handler.js";

function renderOpponentStats(opponent){
    const $template = document.querySelector("#opponent-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".username-flexcontainer");
    console.log(opponent);
    $template.querySelector(".player").innerText = opponent.name;
    $template.querySelector(".points").innerText = opponent.totalPrestigePoints;
    //$template.querySelector(".reserved-count").innerText = getTotalReservedCards(opponent);
    $template.querySelector(".red>.token-text").innerText = tokenInPurse(opponent, "Ruby");
    $template.querySelector(".green>.token-text").innerText = tokenInPurse(opponent, "Emerald");
    $template.querySelector(".black>.token-text").innerText = tokenInPurse(opponent, "Onyx");
    $template.querySelector(".blue>.token-text").innerText = tokenInPurse(opponent, "Sapphire");
    $template.querySelector(".white>.token-text").innerText = tokenInPurse(opponent, "Diamond");
    $template.querySelector(".yellow>.token-text").innerText = tokenInPurse(opponent, "Gold");

    //$template.querySelector("class:first-child").innerText = opponent.acquiredNobles[0].name;
    //$template.querySelector("class:nth-child(1)").innerText = opponent.acquiredNobles[1].name;
    //$template.querySelector("class:nth-child(2)").innerText = opponent.acquiredNobles[2].name;

    $target.insertAdjacentHTML("beforeend", $template.outerHTML)

    




}

export {renderOpponentStats};

