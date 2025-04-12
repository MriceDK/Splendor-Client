import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import {createReserveCardBody} from "./helper.js";
import * as LocalStorageAbstractor from "../data-connector/local-storage-abstractor.js";
import { getCurrentPlayer } from "../helper/utils.js";
import { removePickableFromNobles } from "../market-component/handler.js";


function reserveCard(cardNameOrLevel, level = false) {
    const body = createReserveCardBody(cardNameOrLevel, level);
    const gameId = localStorageAbstractor.loadFromStorage("gameId");
    const playerName = localStorageAbstractor.loadFromStorage("playerName");
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

function getGameInfo() {
    const gameId = LocalStorageAbstractor.loadFromStorage("gameId");
    return APIAbstractor.fetchFromServer(`/games/${parseInt(gameId)}`, "GET");
}

function getNobleToInventory(gameId, playerName, noble){

    if (playerName === getCurrentPlayer(playerName)){

        const body = {
            "name": noble.name,
            "prestigePoints": noble.prestigePoints,
            "neededBonuses":noble.neededBonuses
        };
        APIAbstractor.fetchFromServer(`/games/${parseInt(gameId)}/players/${playerName}/nobles`, "POST", body).then(removePickableFromNobles());

    } else {
        throw "TurnError";
    }


}


export {reserveCard, buyDevelopmentCardRequest, buyReservedCard, getGameInfo, getNobleToInventory};