import {renderPickableNobles} from "./renderer.js";
import {getNobleToInventory} from "../../../api/gameplay-api.js";
import {checkAvailableNobles} from "./helper.js";
import {renderDisableCard, renderEnabledCard} from "../development-card/renderer.js";


function nobleCheck(nobleCheck, unclaimedNobles, currentPlayerInfo){
    if (nobleCheck){
        const pickableNobles = checkAvailableNobles(unclaimedNobles, currentPlayerInfo);
        renderPickableNobles(pickableNobles); 
    }
}


function hookUpEventListenersOnPickableNoble(gameId, playerName, noble){
    const $pickableNobles = document.querySelectorAll(".pickable-nobles");
    $pickableNobles.forEach( (pickableNoble) => {
        pickableNoble.addEventListener("click", () => {getNobleToInventory(gameId, playerName, noble)})
    }); 

}

function removePickableFromNobles(){
    const $pickableNobles = document.querySelectorAll(".pickable-noble");
    $pickableNobles.forEach(pickableNoble => {
        pickableNoble.removeEventListener("click", getNobleToInventory);
        pickableNoble.classList.remove("pickable-noble");
        
    });
}

function handleClickability(clickable, targetContainerClass) {
    const cards = document.querySelectorAll(`.${targetContainerClass} article`);
    cards.forEach(card => {
        if (clickable) {
            renderEnabledCard(card);
        } else {
            renderDisableCard(card);
        }
    });
}

export {nobleCheck, hookUpEventListenersOnPickableNoble, removePickableFromNobles, handleClickability};