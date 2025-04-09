function getAmountOfNobles(gameInfo){
    const playerAmount = gameInfo.players.length();
    let noblesAmount = null;
    switch (playerAmount){
        case playerAmount === 2:
            noblesAmount = 3;
            break;
        case playerAmount === 3:
            noblesAmount = 4;
            break;
        default:
            noblesAmount = 5
            break;
    }

    return noblesAmount;
}