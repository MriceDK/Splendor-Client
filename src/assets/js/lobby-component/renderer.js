import * as storageAbstractor from "../data-connector/local-storage-abstractor.js";

function dataListFromApi(data) {

    lobbyName(data.gameName);
    started(data.started);
    renderPlayersLoop(data.players, data);
    renderOwnPlayerName();
}

function lobbyName(lobbyName) {
    const $titleElement = document.querySelector("#title");
    $titleElement.innerHTML = ``;

    if (lobbyName === null || lobbyName === "") {

        $titleElement.innerHTML = `${storageAbstractor.loadFromStorage("playerName")}'s lobby`;
    } else {
        $titleElement.innerHTML = lobbyName;
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

        $copy.textContent = user;

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
    document.querySelector("#playername").textContent = storageAbstractor.loadFromStorage("playerName");
}

export {lobbyName, renderLobbyAmount, renderOwnPlayerName, started, renderPlayersLoop, dataListFromApi};

