import {loadFromStorage} from "../../../data-connector/local-storage-abstractor.js";

function getOwnPlayerName() {
    return loadFromStorage("playerName");
}

function getOwnPlayerInfo(gameinfo) {
    const players = gameinfo.players;

    for (const player of players) {
        if (player.name === getOwnPlayerName()) {
            return player;
        }
    }

    return null;
}

export {getOwnPlayerInfo};