import { getOpponentInfos } from "./handler.js";

function renderOpponentStats(opponent){
    const $template = document.querySelector("#opponent-template").content.firstElementChild.cloneNode(true);
    $template.querySelector(".player").innerText = opponent.name;
    $template.querySelector(".points").innerText = opponent.totalPrestigePoints;
    $template.querySelector(".reserved-count").innerText = getTotalReservedCards(opponent);
    $template.querySelector(".red>.token-text").innerText = opponent.tokens.Ruby;
    $template.querySelector(".green>.token-text").innerText = opponent.tokens.Emerald;
    $template.querySelector(".black>.token-text").innerText = opponent.tokens.Onyx;
    $template.querySelector(".blue>.token-text").innerText = opponent.tokens.Sapphire;
    $template.querySelector(".white>.token-text").innerText = opponent.tokens.Diamond;
    $template.querySelector(".yellow>.tokent-text").innerText = opponent.tokens.Gold;

    $template.querySelector("class:first-child").innerText = opponent.acquiredNobles[0].name;
    $template.querySelector("class:nth-child(1)").innerText = opponent.acquiredNobles[1].name;
    $template.querySelector("class:nth-child(2)").innerText = opponent.acquiredNobles[2].name;


    




}

