import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import {createReserveCardBody} from "./helper.js";
import * as LocalStorageAbstractor from "../data-connector/local-storage-abstractor.js";
import {removePickableFromNobles} from "../components/gameplay/market/handler.js";
import {displayGame} from "../game.js";


function reserveCard(cardNameOrLevel, level = false) {
    const body = createReserveCardBody(cardNameOrLevel, level);
    const gameId = LocalStorageAbstractor.loadFromStorage("gameId");
    const playerName = LocalStorageAbstractor.loadFromStorage("playerName");
    return APIAbstractor.fetchFromServer(`/games/${gameId}/players/${playerName}/reserve`, "POST", body);
}


function buyDevelopmentCardRequest(body) {
    const gameId = LocalStorageAbstractor.loadFromStorage("gameId");
    const playerName = LocalStorageAbstractor.loadFromStorage("playerName");

    return APIAbstractor.fetchFromServer(`/games/${gameId}/players/${playerName}/developments`, "POST", body);
}

function buyReservedCard(cardName, body) {
    const gameId = LocalStorageAbstractor.loadFromStorage("gameId");
    const playerName = LocalStorageAbstractor.loadFromStorage("playerName");
    return APIAbstractor.fetchFromServer(`/games/${gameId}/players/${playerName}/reserve/${cardName}`, "DELETE", body);
}

function getNobleToInventory(e, gameId, playerName, noble){
    e.preventDefault();

    const body = {
        "name": noble.name,
        "prestigePoints": noble.prestigePoints,
        "neededBonuses":noble.neededBonuses
    };
    APIAbstractor.fetchFromServer(`/games/${parseInt(gameId)}/players/${playerName}/nobles`, "POST", body).then(() => removePickableFromNobles());

}

function updateTokens(gameId, playerName, body) {
    return APIAbstractor.fetchFromServer(`/games/${gameId}/players/${playerName}/tokens`, "PATCH", body);
}


export {reserveCard, buyDevelopmentCardRequest, buyReservedCard, getNobleToInventory, updateTokens};