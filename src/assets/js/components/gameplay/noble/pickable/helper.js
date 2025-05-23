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
    for (const bonus in nobleRequirements) {
        const bonusExistsInPlayer = bonus in playerBonuses;
        const bonusCheck = playerBonuses[bonus] >= nobleRequirements[bonus];

        if (!bonusExistsInPlayer || !bonusCheck) {
            return false;
        }
    }

    return true;

}

export {checkAvailableNobles};