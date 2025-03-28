import * as storageAbstractor from "../data-connector/local-storage-abstractor.js";
import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import * as renderer from "./renderer.js";

function loadJoinedGame(){
    //test variables
    storageAbstractor.saveToStorage("gameId", 24)
    storageAbstractor.saveToStorage("myUsername", "Bob");
    storageAbstractor.saveToStorage("playerToken", "24_Bob");

    const gameId = storageAbstractor.loadFromStorage("gameId")
    const playerToken = storageAbstractor.loadFromStorage("playerToken")

    if (gameId !== null){
        getGameDetailsForGameId(gameId, playerToken);
    }
}
function getGameDetailsForGameId(gameId) {
    APIAbstractor.fetchFromServer(`/games/${gameId}`, "GET").then(data => sendToRenderer(data));
}
function sendToRenderer(data){

    console.log(data);
    renderer.lobbyName(data.gameName);
    renderer.maxUserCount(data.numberOfPlayers);
    renderer.renderUsers(data.players);
    renderer.started(data.started)
    renderer.renderOwnUserName()


}



export { loadJoinedGame}