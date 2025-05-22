import {loadFromStorage, saveToStorage} from "../../../data-connector/local-storage-abstractor.js";
import {createLobby as createLobby1} from "../../../api/game-setup-api.js";
import {validNameForcer} from "../lobby-overview/handler.js";

function createLobby(e) {
    e.preventDefault();

    const submitButton = document.querySelector(".submit");
    disableSubmitButton(submitButton);

    const lobbyName = document.querySelector("#lobby-name").value;
    const playerAmount = document.querySelector(".radio-option input:checked").value;
    const playername = validNameForcer(loadFromStorage("playerName"));

    const body = createBody(lobbyName, playerAmount, playername);

    createLobby1(body)
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
    } else {
        body.gameName = playername + "'s lobby";
    }

    return body;
}

function disableSubmitButton(target) {
    target.classList.add("disabled");
    target.setAttribute("disabled", "true");
}

export {createLobby};