import {renderPickableNobles} from "./renderer.js";
import {getNobleToInventory} from "../../../api/gameplay-api.js";
import {checkAvailableNobles} from "./helper.js";
import {renderDisableCard, renderEnabledCard} from "../development-card/renderer.js";
import {displayGame} from "../../../game.js";


function nobleCheck(gameState, unclaimedNobles, currentPlayer, ownPlayer){
    if (gameState === "CHOOSE_NOBLE" && currentPlayer === ownPlayer.name){
        const pickableNobles = checkAvailableNobles(unclaimedNobles, ownPlayer);
        renderPickableNobles(pickableNobles); 
    }
}


function hookUpEventListenersOnPickableNoble(gameId, playerName, noble){
    const $pickableNobles = document.querySelectorAll(".pickable-noble");
    $pickableNobles.forEach( (pickableNoble) => {
        pickableNoble.addEventListener("click", e => {getNobleToInventory(e, gameId, playerName, noble)})
    }); 

}

function removePickableFromNobles(){
    const $pickableNobles = document.querySelectorAll(".pickable-noble");
    $pickableNobles.forEach(pickableNoble => {
        pickableNoble.removeEventListener("click", getNobleToInventory);
        pickableNoble.classList.remove("pickable-noble");
        
    });
    displayGame();
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