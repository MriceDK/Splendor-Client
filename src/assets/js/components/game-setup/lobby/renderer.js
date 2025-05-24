import * as storageAbstractor from "../../../data-connector/local-storage-abstractor.js";
import {uppercaseFirstLetterOfWord} from "../../../helper/utils.js";
import {renderSpectators} from "../../gameplay/info/spectators/renderer.js";

function dataListFromApi(data) {

    lobbyName(data.gameName);
    started(data.started);
    renderPlayersLoop(data.players, data);
    renderOwnPlayerName();
    renderSpectators(data.spectators);
}

function lobbyName(lobbyNameString) {
    const $titleElement = document.querySelector("#title");
    $titleElement.innerHTML = ``;

    if (lobbyNameString === null || lobbyNameString === "") {

        $titleElement.innerHTML = `${uppercaseFirstLetterOfWord(storageAbstractor.loadFromStorage("playerName"))}'s lobby`;
    } else {
        $titleElement.innerHTML = lobbyNameString.charAt(0).toUpperCase() + lobbyNameString.slice(1).toLowerCase();
    }
}

function renderLobbyAmount(currentUserCount, maxUserCount) {

    document.querySelector("#playerCount").innerHTML = `${currentUserCount}/${maxUserCount} Players`;
}

function renderPlayersLoop(playerArray, data) {

    const $template = document.querySelector("#player");
    const $target = document.querySelector(".users");
    $target.innerHTML = $template.outerHTML;

    playerArray.forEach(user => {
        
        const $copy = $template.content.firstElementChild.cloneNode(true);
        $copy.querySelector(".profile-picture").setAttribute("src", "images/user-logo.png");
        $copy.querySelector("p").innerText = uppercaseFirstLetterOfWord(user);
        $target.insertAdjacentHTML("beforeend", $copy.outerHTML);
    });
    renderLobbyAmount(playerArray.length, data.numberOfPlayers);
}

function started(isStarted) {

    if (isStarted === true) {
        window.location.assign("./game-board.html");
    }
}

function renderOwnPlayerName() {
    uppercaseFirstLetterOfWord(document.querySelector("#playername").innerHTML = storageAbstractor.loadFromStorage("playerName"))
}

export {lobbyName, renderLobbyAmount, renderOwnPlayerName, started, renderPlayersLoop, dataListFromApi};

