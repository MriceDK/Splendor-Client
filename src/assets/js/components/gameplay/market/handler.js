import {renderPickableNobles} from "./renderer.js";
import {getNobleToInventory} from "../../../api/gameplay-api.js";
import {checkAvailableNobles} from "./helper.js";
import {renderDisableCard, renderEnabledCard} from "../development-card/renderer.js";


function nobleCheck(gameState, unclaimedNobles, currentPlayer, ownPlayer){
    console.log(gameState);
    console.log(unclaimedNobles);
    console.log(currentPlayer);
    console.log(ownPlayer);
    if (gameState === "CHOOSE_NOBLE" && currentPlayer === ownPlayer.name){
        console.log("nobleCHeck");
        const pickableNobles = checkAvailableNobles(unclaimedNobles, ownPlayer);
        renderPickableNobles(pickableNobles); 
    }
}


function hookUpEventListenersOnPickableNoble(gameId, playerName, noble){
    const $pickableNobles = document.querySelectorAll(".pickable-nobles");
    $pickableNobles.forEach( (pickableNoble) => {
        console.log("hooking up event listener on pickablenoble");
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