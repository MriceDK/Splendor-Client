function checkAvailableNobles(nobles, playerInfo) {
    const playerBonuses = playerInfo.bonuses;
    const qualifiedNobles = [];
    nobles.forEach(noble => {
        if (nobleQualification(noble.neededBonuses, playerBonuses)) {
            qualifiedNobles.push(noble);
        }


    });

    return qualifiedNobles;


}

function nobleQualification(nobleRequirements, playerBonuses) {
    for (const [bonus, requiredAmount] of Object.entries(nobleRequirements)) {

        if (playerBonuses[bonus] < requiredAmount) {
            return false;
        }
    }
    return true;

}

export {checkAvailableNobles};