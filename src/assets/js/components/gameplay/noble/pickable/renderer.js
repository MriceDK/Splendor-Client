import {convertToKebabCase} from "../../../../helper/utils.js";
import {hookUpEventListenersOnPickableNoble} from "./handler.js";
import {loadFromStorage} from "../../../../data-connector/local-storage-abstractor.js";

function renderPickableNobles(nobles){
    const $allNobles = document.querySelectorAll(".market-grid-container .noble-article");
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
    hookUpEventListenersOnPickableNoble(loadFromStorage("gameId"), loadFromStorage("playerName"), noble);

}

export {renderPickableNobles}