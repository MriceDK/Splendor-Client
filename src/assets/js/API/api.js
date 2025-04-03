import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import * as localStorageAbstractor from "../data-connector/local-storage-abstractor.js";

function reserveCard(cardNameOrLevel, level = false) {
    const body = createReserveCardBody(cardNameOrLevel, level);
    const gameId = localStorageAbstractor.loadFromStorage("gameId");
    const playerName = localStorageAbstractor.loadFromStorage("myUsername");
    return APIAbstractor.fetchFromServer(`/games/${gameId}/players/${playerName}/reserve`, "POST", body)
}

function createReserveCardBody(cardNameOrLevel, level) {
    if (level) {
        return {
            "development": {
                "level": cardNameOrLevel
            }
        }
    } else {
        return {
            "development": {
                "name": cardNameOrLevel
            }
        }
    }
}


export { reserveCard };