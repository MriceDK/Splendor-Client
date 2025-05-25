import {loadFromStorage, saveToStorage} from "../../../data-connector/local-storage-abstractor.js";
import {createLobby as createLobby1} from "../../../api/game-setup-api.js";
import {makeNameValid} from "../../../helper/utils.js";

function createLobby(e) {
    e.preventDefault();

    const submitButton = document.querySelector(".submit");
    disableSubmitButton(submitButton);

    const lobbyName = document.querySelector("#lobby-name").value;
    const playerAmount = document.querySelector(".radio-option input:checked").value;
    const validatedName = makeNameValid(loadFromStorage("playerName"));
    saveToStorage("playerName", validatedName);

    const playerName = loadFromStorage("playerName");
    const isPrivate = document.querySelector("#private").checked;
    const password = isPrivate ? document.querySelector("#password").value : null;

    const body = createBody(lobbyName, playerAmount, playerName, password);

    createLobby1(body)
        .then(res => {
            saveToStorage("gameId", res.gameId);
            saveToStorage("playerToken", res.playerToken);

            window.location.href = "./lobby.html";
        });
}

function createBody(lobbyName, playerAmount, playerName, password) {
    const body = {
        "numberOfPlayers": parseInt(playerAmount),
        "playerName": playerName
    };

    if (!(lobbyName === "" || lobbyName == null)) {
        body.gameName = lobbyName;
    } else {
        body.gameName = playerName + "'s lobby";
    }

    return body;
}

function disableSubmitButton(target) {
    target.classList.add("disabled");
    target.setAttribute("disabled", "true");
}

function togglePasswordField(e) {
    const passwordField = document.querySelector(".password");
    const isPrivate = document.querySelector("#private").checked
    passwordField.hidden = !isPrivate;
}

export {createLobby, togglePasswordField};