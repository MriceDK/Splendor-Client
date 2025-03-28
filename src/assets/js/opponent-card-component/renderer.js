
import { getTotalReservedCards } from "./handler.js"
import { tokenInPurse } from "./handler.js";

function renderOpponentStats(opponent){
    const $template = document.querySelector("#opponent-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".username-flexcontainer");
    $template.querySelector(".player").innerText = opponent.name;
    $template.querySelector(".points").innerText = opponent.totalPrestigePoints;
    $template.querySelector("#reserved-count").innerText = getTotalReservedCards(opponent);
    $template.querySelector(".gems.red>.token-text").innerText = tokenInPurse(opponent, "Ruby", false);;
    $template.querySelector(".gems.green>.token-text").innerText = tokenInPurse(opponent, "Emerald", false);
    $template.querySelector(".gems.black>.token-text").innerText = tokenInPurse(opponent, "Onyx", false);
    $template.querySelector(".gems.blue>.token-text").innerText = tokenInPurse(opponent, "Sapphire", false);
    $template.querySelector(".gems.white>.token-text").innerText = tokenInPurse(opponent, "Diamond", false);
    $template.querySelector(".gems.yellow>.token-text").innerText = tokenInPurse(opponent, "Gold", false);

    $template.querySelector(".card.red>.token-text").innerText = tokenInPurse(opponent, "Ruby", true);
    $template.querySelector(".card.green>.token-text").innerText = tokenInPurse(opponent, "Emerald", true);
    $template.querySelector(".card.black>.token-text").innerText = tokenInPurse(opponent, "Onyx", true);
    $template.querySelector(".card.blue>.token-text").innerText = tokenInPurse(opponent, "Sapphire", true);
    $template.querySelector(".card.white>.token-text").innerText = tokenInPurse(opponent, "Diamond", true);

    $target.insertAdjacentHTML("beforeend", $template.outerHTML)

    




}

export {renderOpponentStats};

