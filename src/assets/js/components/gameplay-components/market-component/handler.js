import { renderPickableNobles } from "./renderer.js";
import { getNobleToInventory } from "../../../API/api.js";


function nobleCheck(nobleCheck, unclaimedNobles, currentPlayerInfo){
    if (nobleCheck){
        const pickableNobles = checkAvailableNobles(unclaimedNobles, currentPlayerInfo);
        renderPickableNobles(pickableNobles); 
    }
}


function checkAvailableNobles(nobles, playerInfo){
    const playerBonuses = playerInfo.bonuses;
    const qualifiedNobles = [];
    nobles.forEach(noble => {
        if (nobleQualification(noble.neededBonuses, playerBonuses)){
            qualifiedNobles.push(noble);
        }

        
    });

    return qualifiedNobles;
    

}

function nobleQualification(nobleRequirements, playerBonuses){
    for (const [bonus, requiredAmount] of Object.entries(nobleRequirements)){

        if (playerBonuses[bonus] < requiredAmount) {
            return false; 
        }
    }
    return true; 

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
export {nobleCheck, hookUpEventListenersOnPickableNoble, removePickableFromNobles};