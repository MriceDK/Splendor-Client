import {loadFromStorage} from "../../../data-connector/local-storage-abstractor.js";

function getOpponents(players) {
    const ownName = loadFromStorage("playerName");
    return players.filter(player => {
        return player.name !== ownName;
    });
}

export {getOpponents};
