import * as storageAbstractor from "../../../data-connector/local-storage-abstractor.js";
import * as renderer from "./renderer.js";

import {getGameInfo, playerLeaveLobby, stopSpectating} from "../../../api/game-setup-api.js";

function leaveLobby() {
    const isSpectating = storageAbstractor.loadFromStorage("spectate");
    const playerName = storageAbstractor.loadFromStorage("playerName");
    const gameId = storageAbstractor.loadFromStorage("gameId");
    getGameInfo().then(() => {
        if (!isSpectating) {
            playerLeaveLobby(gameId, playerName).then(() => window.location.href = "./index.html");
        } else if (isSpectating) {
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