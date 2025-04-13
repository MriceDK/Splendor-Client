import * as DevelopmentCardRenderer from "../development-card-component/renderer.js";
import * as NobleRenderer from "../noble-component/renderer.js";
import { convertToKebabCase } from "../helper/utils.js";
import {hookUpEventListenersOnPickableNoble}  from "./handler.js";

function renderMarket(gameInfo) {
    const $target = document.querySelector(".market-grid-container");

    NobleRenderer.renderNobles(gameInfo.unclaimedNobles, $target);
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


function renderPickableNobles(nobles){
    const $allNobles = document.querySelectorAll(".noble-article");
    nobles.forEach(noble => {
        nameChecker(noble, $allNobles);

    });

}

function nameChecker(noble, $allNobles){
    
    $allNobles.forEach($nobleInDom => {
        if ($nobleInDom.querySelector(".noble-name").innerHTML === noble.name){
            renderPickableNoblesHelp($nobleInDom, noble);

        }
    });
    
}

function renderPickableNoblesHelp($nobleInDom, noble){

    $nobleInDom.classList.add("pickable-noble");
    const forceNameFromServer = convertToKebabCase(noble.name);
    $nobleInDom.classList.add(`${forceNameFromServer}`);
    hookUpEventListenersOnPickableNoble(gameId, playerName, noble);

}





export { renderMarket, renderPickableNobles };
