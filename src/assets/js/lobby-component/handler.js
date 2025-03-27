import * as storageAbstractor from "../data-connector/local-storage-abstractor.js";
import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import * as renderer from "./renderer.js";

function loadJoinedGame(data){
    //test variables
    storageAbstractor.saveToStorage("gameId", 1)
    storageAbstractor.saveToStorage("myUsername", "Alice");


    const gameId = storageAbstractor.loadFromStorage("gameId")
    const username = storageAbstractor.loadFromStorage("myUsername")
    const playerToken = gameId + "_" + username
    storageAbstractor.saveToStorage("playerToken", playerToken);
    loadPageFromLocalStorage(username);

    if (gameId !== null){
        getGameDetailsForGameId(gameId, playerToken);
    }
}
function getGameDetailsForGameId(gameId, playerToken) {
    APIAbstractor.fetchFromServer(`/games/${gameId}`, "GET").then(data => sendToRenderer(data));
}

function loadPageFromLocalStorage(name){
    renderer.userName(name)
}


function sendToRenderer(data){

    console.log(data);
    renderer.lobbyName(data.gameName);
    renderer.maxUserCount(data.numberOfPlayers);
    const countPlayers = (data.players).length;
    renderer.userCount(countPlayers);
    renderer.started(data.started)


}



export { loadJoinedGame}