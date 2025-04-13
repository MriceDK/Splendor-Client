import * as storageAbstractor from "../../../data-connector/local-storage-abstractor.js";
import * as APIAbstractor from "../../../data-connector/api-communication-abstractor.js";
import * as renderer from "./renderer.js";

function loadJoinedGame() {

    const gameId = storageAbstractor.loadFromStorage("gameId");
    const playerToken = storageAbstractor.loadFromStorage("playerToken");

    if (gameId !== null) {
        getGameDetailsForGameId(gameId, playerToken);
    }
}

function getGameDetailsForGameId(gameId) {
    APIAbstractor.fetchFromServer(`/games/${gameId}`, "GET")
        .then(data => {
            renderer.dataListFromApi(data);
            setTimeout(loadJoinedGame, 2000);
        });
}

export {loadJoinedGame};