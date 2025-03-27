import * as storageAbstractor from "../data-connector/local-storage-abstractor.js";
import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import * as renderer from "./renderer";



function setJSon(object) {

    console.log(object)
    const gameName = object.gameName;
    const usersInLobby = object.players;
    const amountOfPlayers = object.numberOfPlayers;
    const startedCheck  = object.started;
}

function getGameDetailsForGameId(gameId, playerToken) {
    APIAbstractor.fetchFromServer(`/games/${gameId}`, "GET").then(data => setJSon(data));
}

function loadJoinedGame(){
    //test variables
    storageAbstractor.saveToStorage("gameId", 6)
    storageAbstractor.saveToStorage("myUsername", "sam");


    const gameId = storageAbstractor.loadFromStorage("gameId")
    const username = storageAbstractor.loadFromStorage("myUsername")
    const playerToken = gameId + "_" + username
        storageAbstractor.saveToStorage("playerToken", playerToken);
    if (gameId !== null){
        getGameDetailsForGameId(gameId, playerToken);
        renderer.lobbyName();
    }

}

export { loadJoinedGame}