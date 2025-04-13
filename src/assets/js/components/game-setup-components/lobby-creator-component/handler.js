import * as APIAbstractor from "../../../data-connector/api-communication-abstractor.js";
import {loadFromStorage, saveToStorage} from "../../../data-connector/local-storage-abstractor.js";

function createLobby(e) {
    e.preventDefault();

    const submitButton = document.querySelector(".submit");
    disableSubmitButton(submitButton);

    const lobbyName = document.querySelector("#lobby-name").value;
    const playerAmount = document.querySelector(".radio-option input:checked").value;
    const playername = loadFromStorage("playerName");

    const body = createBody(lobbyName, playerAmount, playername);

    APIAbstractor.fetchFromServer("/games", "POST", body)
        .then(res => {
            saveToStorage("gameId", res.gameId);
            saveToStorage("playerToken", res.playerToken);

            window.location.href = "./lobby.html";
        });
}

function createBody(lobbyName, playerAmount, playername) {

    const body = {
        "numberOfPlayers": parseInt(playerAmount),
        "playerName": playername
    };

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