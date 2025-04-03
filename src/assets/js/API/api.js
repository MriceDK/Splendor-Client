import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import * as localStorageAbstractor from "../data-connector/local-storage-abstractor.js";
import {createReserveCardBody} from "./helper.js";

function reserveCard(cardNameOrLevel, level = false) {
    const body = createReserveCardBody(cardNameOrLevel, level);
    const gameId = localStorageAbstractor.loadFromStorage("gameId");
    const playerName = localStorageAbstractor.loadFromStorage("myUsername");
    return APIAbstractor.fetchFromServer(`/games/${gameId}/players/${playerName}/reserve`, "POST", body)
}


function buyCard(cardName) {
    const body = {
        "development": {
            "name": cardName
        },
        "payment": {
            //TODO: add way for player to select tokens to pay with
            "Emerald": 2,
            "Diamond": 1,
            "Gold": 1
        }
    }
    const gameId = localStorageAbstractor.loadFromStorage("gameId");
    const playerName = localStorageAbstractor.loadFromStorage("myUsername");
    return APIAbstractor.fetchFromServer(`/games/${gameId}/players/${playerName}/developments`, "POST", body)
}


export { reserveCard, buyCard };