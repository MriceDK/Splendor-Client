import {loadFromStorage} from "../../../data-connector/local-storage-abstractor";

function getTokenInPurse(player, token, bonus = true) {

    if (bonus) {
        if (player.bonuses[token]) {
            return player.bonuses[token];
        } else {
            return 0;
        }

    } else if (player.tokens[token]) {
        return player.tokens[token];
    } else {
        return 0;
        }

}

function getOpponents(players) {
    const ownName = loadFromStorage("playerName");
    return players.filter(player => {
        return player.name !== ownName;
    });
}

export {getTokenInPurse, getOpponents};
