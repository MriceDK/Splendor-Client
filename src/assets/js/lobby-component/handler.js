import * as storageAbstractor from "../data-connector/local-storage-abstractor.js";
import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";




function getGameDetailsForGameId(gameId) {
    APIAbstractor.fetchFromServer(`/games/${gameId}`)
        .then(data => setJSon(data));

}

function loadJoinedGame(){
    const gameId = storageAbstractor.loadFromStorage("gameId", gameId)

    getGameDetailsForGameId(gameId)
}

export { loadJoinedGame }