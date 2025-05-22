import * as storageAbstractor from "../../../data-connector/local-storage-abstractor.js";
import * as renderer from "./renderer.js";

import {getGameInfo} from "../../../api/game-setup-api.js";

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


export {loadJoinedGame, upperCaseFirstLetter};