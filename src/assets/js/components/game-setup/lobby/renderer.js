import * as storageAbstractor from "../../../data-connector/local-storage-abstractor.js";

function dataListFromApi(data) {

    lobbyName(data.gameName);
    started(data.started);
    renderPlayersLoop(data.players, data);
    renderOwnPlayerName();
}

function lobbyName(lobbyNameString) {
    const $titleElement = document.querySelector("#title");
    $titleElement.innerHTML = ``;

    if (lobbyNameString === null || lobbyNameString === "") {

        $titleElement.innerHTML = `${storageAbstractor.loadFromStorage("playerName").charAt(0).toUpperCase() + storageAbstractor.loadFromStorage("playerName").slice(1).toLowerCase()}'s lobby`;
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

        $copy.textContent = user.charAt(0).toUpperCase() + user.slice(1).toLowerCase();

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
    document.querySelector("#playerName").innerHTML = storageAbstractor.loadFromStorage("playerName").charAt(0).toUpperCase() + storageAbstractor.loadFromStorage("playerName").slice(1).toLowerCase();
}

export {lobbyName, renderLobbyAmount, renderOwnPlayerName, started, renderPlayersLoop, dataListFromApi};

