
function addGameNames(games) {
    const gamesWithNames = games
    gamesWithNames.forEach(game => {
        if (game.gameName === null) {
            game.gameName = game.players[0] + "'s lobby";
        }
    })
    return gamesWithNames;
}

export { addGameNames ,}