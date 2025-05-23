import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import * as LocalStorageAbstractor from "../data-connector/local-storage-abstractor.js";

function getGameInfo() {
    const gameId = LocalStorageAbstractor.loadFromStorage("gameId");
    return APIAbstractor.fetchFromServer(`/games/${parseInt(gameId)}`, "GET");
}

function createLobby(body) {
    return APIAbstractor.fetchFromServer("/games", "POST", body);
}

function getAllLobbies() {
    return APIAbstractor.fetchFromServer("/games", "GET");
}

function joinLobby(joinGameId, playerName) {
    const body = {
        "wantsToLeave" : false,
        "isSpectator" : false
    }
    return APIAbstractor.fetchFromServer(`/games/${joinGameId}/players/${playerName}`, "POST", body);
}

function spectateLobby(joinGameId, playerName) {
    const body = {
        "wantsToLeave" : false,
        "isSpectator" : true
    }
    return APIAbstractor.fetchFromServer(`/games/${joinGameId}/players/${playerName}`, "POST", body);
}

export {
    joinLobby,
    spectateLobby,
    getAllLobbies,
    createLobby,
    getGameInfo
};