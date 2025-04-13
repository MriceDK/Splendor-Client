import * as storageAbstractor from "../../../data-connector/local-storage-abstractor.js";
import * as renderer from "./renderer.js";
import {getGameInfo} from "../../../api/api.js";

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

export {loadJoinedGame};