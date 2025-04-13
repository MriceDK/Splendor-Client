import * as APIAbstractor from "../data-connector/api-communication-abstractor";
import * as LocalStorageAbstractor from "../data-connector/local-storage-abstractor";

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
    return APIAbstractor.fetchFromServer(`/games/${joinGameId}/players/${playerName}`, "POST");
}

export {
    joinLobby,
    getAllLobbies,
    createLobby,
    getGameInfo
};