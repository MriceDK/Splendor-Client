import {checkAvailableNobles} from "./helper.js";
import {renderPickableNobles} from "./renderer.js";
import {getNobleToInventory} from "../../../../api/gameplay-api.js";
import {displayGame} from "../../../../game.js";


function chooseNobleCheck(gameState, unclaimedNobles, currentPlayer, ownPlayer){
    if (gameState === "ChooseNoble" && currentPlayer === ownPlayer.name){
        const pickableNobles = checkAvailableNobles(unclaimedNobles, ownPlayer);
        console.log(pickableNobles);
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

export {chooseNobleCheck, hookUpEventListenersOnPickableNoble, removePickableFromNobles}
