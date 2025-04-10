function nobleCheck(nobleCheck){
    if (nobleCheck){
        nobleVisualCheck
    }
}


function nobleVisualCheck(nobles, playerInfo){
    const playerBonuses = playerInfo.bonuses;
    const qualifiedNobles = [];
    nobles.forEach(noble => {
        const bonusNeeded = noble.neededBonuses;
        if (nobleQualification(noble.neededBonuses, playerBonuses)){
            qualifiedNobles.push(noble);
        }

        
    });
    

}

function nobleQualification(nobleRequirements, playerBonuses){
    for (const [bonus, requiredAmount] of Object.entries(nobleRequirements)){

        if (playerBonuses[bonus] < requiredAmount) {
            return false; 
        }
    }
    return true; 

}
