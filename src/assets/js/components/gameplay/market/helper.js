function checkAvailableNobles(nobles, playerInfo) {
    const playerBonuses = playerInfo.bonuses;
    const qualifiedNobles = [];
    nobles.forEach(noble => {
        if (nobleQualification(noble.neededBonuses, playerBonuses)) {
            qualifiedNobles.push(noble);
        }


    });
    console.log("endOfCheckAvailableNobles");

    return qualifiedNobles;


}

function nobleQualification(nobleRequirements, playerBonuses) {
    console.log(playerBonuses);
    console.log(nobleRequirements);
    for (const bonus in nobleRequirements) {
        const bonusExistsInPlayer = bonus in playerBonuses;
        const bonusCheck = playerBonuses[bonus] >= nobleRequirements[bonus];

        if (!bonusExistsInPlayer || !bonusCheck) {
            return false;
        }
    }
    console.log("noblequalification");
    return true;

}

export {checkAvailableNobles};