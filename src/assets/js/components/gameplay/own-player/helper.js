import {loadFromStorage} from "../../../data-connector/local-storage-abstractor.js";

function getOwnPlayerName() {
    return loadFromStorage("playerName");
}

function getOwnPlayerInfo(gameInfo) {
    const players = gameInfo.players;

    for (const player of players) {
        if (player.name === getOwnPlayerName()) {
            return player;
        }
    }
    return null;
}

function getCurrentPlayerInfo(gameInfo) {
    for (const player of gameInfo.players) {
        if (player.name === gameInfo.currentPlayer) {
            return player;
        }
    }
    return null;
}

function putInitalValue($tooMuchGemsTemplate, token) {
    const selector = `#token-remover-${token[0].toLowerCase()}`;
    $tooMuchGemsTemplate.querySelector(selector).setAttribute("value", token[1]);

}

function getAllOwnPlayerTokens(ownPlayer) {
    // This function is only needed for the tokens because tokens can go down in value
    const allPlayerTokenNames = ["Emerald", "Ruby", "Sapphire", "Diamond", "Onyx", "Gold"];
    allPlayerTokenNames.forEach(token => {
        if (!ownPlayer.tokens[token]) {
            ownPlayer.tokens[token] = 0;
        }
    });
    return ownPlayer.tokens;
}

export {putInitalValue, getOwnPlayerInfo, getAllOwnPlayerTokens, getCurrentPlayerInfo};
