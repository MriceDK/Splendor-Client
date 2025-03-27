import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import {loadFromStorage} from "../data-connector/local-storage-abstractor.js";

function createLobby(e) {
    e.preventDefault();

    const lobbyName = document.querySelector("#lobby-name").value;
    const playerAmount = document.querySelector(".radio-option input:checked").value;
    const username = loadFromStorage("myUsername");

    const body = {
        "gameName": lobbyName,
        "numberOfPlayers": parseInt(playerAmount),
        "playerName": username
    }

    APIAbstractor.fetchFromServer("/games", "POST", body)
        .then(res => console.log(res));

}

export { createLobby };