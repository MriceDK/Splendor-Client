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
    for (const bonus in nobleRequirements) {
        console.log(nobleRequirements, playerBonuses);

        if (playerBonuses[bonus] < nobleRequirements[bonus]) {
            return false;
        }
    }
    console.log("noblequalification");
    return true;

}

export {checkAvailableNobles};