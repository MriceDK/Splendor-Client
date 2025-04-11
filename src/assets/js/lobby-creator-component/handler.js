import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import {loadFromStorage} from "../data-connector/local-storage-abstractor.js";
import {saveToStorage} from "../data-connector/local-storage-abstractor.js";

function createLobby(e) {
    e.preventDefault();

    const submitButton = document.querySelector(".submit");
    disableSubmitButton(submitButton);

    const lobbyName = document.querySelector("#lobby-name").value;
    const playerAmount = document.querySelector(".radio-option input:checked").value;
    const username = loadFromStorage("playerName");

    const body = createBody(lobbyName, playerAmount, username);

    APIAbstractor.fetchFromServer("/games", "POST", body)
        .then(res => {
            saveToStorage("gameId", res.gameId);
            saveToStorage("playerToken", res.playerToken);

            window.location.href = "./lobby.html";
        });
}

function createBody(lobbyName, playerAmount, username) {

    const body = {
        "numberOfPlayers": parseInt(playerAmount),
        "playerName": username
    }

    if (!(lobbyName === "" || lobbyName == null)) {
        body.gameName = lobbyName;
    }

    return body;
}

function disableSubmitButton(target) {
    target.classList.add("disabled");
    target.setAttribute("disabled", "true");
}

export {createLobby};