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
    for (const [bonus, requiredAmount] of Object.entries(nobleRequirements)) {

        if (playerBonuses[bonus] < requiredAmount) {
            return false;
        }
    }
    console.log("noblequalification");
    return true;

}

export {checkAvailableNobles};