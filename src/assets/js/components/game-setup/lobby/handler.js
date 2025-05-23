import * as storageAbstractor from "../../../data-connector/local-storage-abstractor.js";
import * as renderer from "./renderer.js";

import {getGameInfo, playerLeaveLobby, stopSpectating} from "../../../api/game-setup-api.js";

function leaveLobby() {
    const gameId = storageAbstractor.loadFromStorage("gameId");
    const playerName = storageAbstractor.loadFromStorage("playerName");
    getGameInfo().then(data => {
        if (data.players.includes(playerName)) {
            playerLeaveLobby(gameId, playerName).then(() => window.location.href = "./index.html");
        } else if (data.spectators.includes(playerName)) {
            stopSpectating(gameId, playerName).then(() => window.location.href = "./index.html");
        }
    });
}

function loadJoinedGame() {
    const gameId = storageAbstractor.loadFromStorage("gameId");

    if (gameId !== null) {
        getGameDetailsForGameId();
    }
}

function getGameDetailsForGameId() {
    getGameInfo()
        .then(data => {
            renderer.dataListFromApi(data);
            setTimeout(loadJoinedGame, 2000);
        });
}
function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export {loadJoinedGame, upperCaseFirstLetter, leaveLobby};