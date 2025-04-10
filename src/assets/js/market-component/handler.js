import renderPickableNobles from "./renderer.js";


function nobleCheck(nobleCheck, unclaimedNobles, currentPlayerInfo){
    if (nobleCheck){
        const pickableNobles = nobleVisualCheck(unclaimedNobles, currentPlayerInfo);
        renderPickableNobles(pickableNobles); 
    }
}


function nobleVisualCheck(nobles, playerInfo){
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
    $pickableNobles.forEach( pickableNoble => {
        pickableNoble.addEventListener("click", getNobleToInventory(gameId, playerName, noble));
    }); 

}

function getNobleToInventory(gameId, playerName, noble){

    const body = {
        "name": noble.name,
        "prestigePoints": noble.prestigePoints,
        "neededBonuses":noble.neededBonuses
    };
    APIAbstractor.fetchFromServer(`/games/${parseInt(gameId)}/players/${playerName}/nobles`, "POST", body)
    removePickableFromNobles();
}

function removePickableFromNobles(){
    const $pickableNobles = document.querySelectorAll(".pickable-noble");
    $pickableNobles.forEach(pickableNoble => {
        pickableNoble.classList.remove("pickable-noble")
    });
}
export {nobleCheck, hookUpEventListenersOnPickableNoble}