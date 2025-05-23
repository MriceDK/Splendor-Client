import * as DevelopmentCardRenderer from "../development-card/renderer.js";
import { convertToKebabCase } from "../../../helper/utils.js";
import * as NobleRenderer from "../noble/renderer.js";
import {hookUpEventListenersOnPickableNoble}  from "./handler.js";
import {loadFromStorage} from "../../../data-connector/local-storage-abstractor.js";

function renderMarket(gameInfo) {
    const $target = document.querySelector(".market-grid-container");
    $target.innerHTML = document.querySelector("#market-templates").outerHTML;
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
    // TODO Wanneer we dit makkelijk kunnen testen, zou ik dit in het noble component steken en het onderstaande verbeteren
    const $allNobles = document.querySelectorAll(".market-grid-container .noble-article");
    nobles.forEach(noble => {
        console.log(noble);
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
    console.log("renderpickablenobleshelp");

    $nobleInDom.classList.add("pickable-noble");
    const forceNameFromServer = convertToKebabCase(noble.name);
    $nobleInDom.classList.add(`${forceNameFromServer}`);
    hookUpEventListenersOnPickableNoble(loadFromStorage(gameId), loadFromStorage(playerName), noble);

}

export { renderMarket, renderPickableNobles };
