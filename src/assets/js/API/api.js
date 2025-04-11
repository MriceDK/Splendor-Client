import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import * as localStorageAbstractor from "../data-connector/local-storage-abstractor.js";
import {createReserveCardBody} from "./helper.js";
import * as LocalStorageAbstractor from "../data-connector/local-storage-abstractor.js";


function reserveCard(cardNameOrLevel, level = false) {
    const body = createReserveCardBody(cardNameOrLevel, level);
    const gameId = localStorageAbstractor.loadFromStorage("gameId");
    const playerName = localStorageAbstractor.loadFromStorage("playerName");
    return APIAbstractor.fetchFromServer(`/games/${gameId}/players/${playerName}/reserve`, "POST", body)
}


function buyDevelopmentCardRequest(body) {
    const gameId = LocalStorageAbstractor.loadFromStorage("gameId");
    const playerName = LocalStorageAbstractor.loadFromStorage("playerName");

    return APIAbstractor.fetchFromServer(`/games/${gameId}/players/${playerName}/developments`, "POST", body)
}

function buyReservedCard(cardName, body) {
    const gameId = LocalStorageAbstractor.loadFromStorage("gameId");
    const playerName = LocalStorageAbstractor.loadFromStorage("playerName");
    return APIAbstractor.fetchFromServer(`/games/${gameId}/players/${playerName}/reserve/${cardName}`, "DELETE", body)
}

function getGameInfo() {
    const gameId = LocalStorageAbstractor.loadFromStorage("gameId");
    return APIAbstractor.fetchFromServer(`/games/${parseInt(gameId)}`,"GET")
}


export { reserveCard, buyDevelopmentCardRequest, buyReservedCard, getGameInfo};