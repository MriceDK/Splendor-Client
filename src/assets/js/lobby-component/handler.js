import * as storageAbstractor from "../data-connector/local-storage-abstractor.js";
import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import * as renderer from "./renderer.js";

function loadJoinedGame(){
    //test variables
    storageAbstractor.saveToStorage("gameId", 24)
    storageAbstractor.saveToStorage("myUsername", "Bob");


    const gameId = storageAbstractor.loadFromStorage("gameId")
    const username = storageAbstractor.loadFromStorage("myUsername")
    const playerToken = gameId + "_" + username
    storageAbstractor.saveToStorage("playerToken", playerToken);

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
    const countPlayers = (data.players).length;
    renderer.renderUsers(data.players);
    renderer.started(data.started)
    renderer.renderOwnUserName()


}



export { loadJoinedGame}