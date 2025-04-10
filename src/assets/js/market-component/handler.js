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

function hookUpEventListenersOnPickableNobles(){

}
export {nobleCheck, hookUpEventListenersOnPickableNobles}