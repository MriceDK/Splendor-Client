import * as DevelopmentCardRenderer from "../development-card-component/renderer.js";
import { convertToKebabCase } from "../helper/utils.js";
import {hookUpEventListenersOnPickableNoble}  from "./handler.js";

function renderMarket(gameInfo) {
    const $target = document.querySelector(".market-grid-container");

    renderLevelRows(gameInfo.market, $target);
}

function renderLevelRows(market, $target) {

    market.forEach(cardRow => {
        renderLevelCard(cardRow.level, cardRow.cardStackSize, $target);
        DevelopmentCardRenderer.renderDevelopmentCards(cardRow.visibleCards, $target);
    });

}

function renderLevelCard(level, cardStackSize, $target) {
    const $levelCard = document.querySelector("#level-card").content.firstElementChild.cloneNode(true);

    $levelCard.classList.add(`level-${level}`);
    $levelCard.setAttribute("data-level", level);
    $levelCard.querySelector(".level-title").innerText = level;
    $levelCard.querySelector(".card-amount").innerText = cardStackSize;

    $target.insertAdjacentHTML("beforeend", $levelCard.outerHTML);
}

function renderNobles(nobles){
    const $target = document.querySelector(".market-grid-container");

    nobles.forEach(noble => {
        const $template = document.querySelector("#noble").content.firstElementChild.cloneNode(true);

        $template.querySelector(".noble-name").innerHTML = noble.name;
        $template.querySelector(".prestige-point").innerHTML = noble.prestigePoints;
        renderBonusesInNobles(noble.neededBonuses, $template);

        $target.insertAdjacentHTML("afterbegin", $template.outerHTML);
        
    });
    

}

function renderBonusesInNobles(bonusesNeeded, $template){

    const $ul = $template.querySelector(".bonus-costs");
    Object.entries(bonusesNeeded).forEach(([bonusNeeded, bonusValue]) =>
        {
            $ul.insertAdjacentHTML("beforeend", `<li class= "${bonusNeeded.toLowerCase()}">${bonusValue}</li>`);

        });
}

function renderPickableNobles(nobles){
    const $allNobles = document.querySelectorAll(".noble-article .noble-name");
    nobles.forEach(noble => {
        nameChecker(noble, $allNobles)

    });

}

function nameChecker(noble, $allNobles){
    $allNobles.forEach(nobleInDom => {
        if (nobleInDom.innerHTML === noble.name){
            renderPickableNoblesHelp(nobleInDom);

        }
    });
    
}

function renderPickableNoblesHelp(nobleInDom){

    nobleInDom.classList.add("pickable-noble");
    const forceNameFromServer = convertToKebabCase(noble.name);
    nobleInDom.classList.add(`${forceNameFromServer}`);
    hookUpEventListenersOnPickableNoble(gameId, playerName, noble);

}





export { renderMarket, renderNobles, renderPickableNobles };
