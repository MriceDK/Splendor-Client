import * as storageAbstractor from "../data-connector/local-storage-abstractor.js";

function dataListFromApi(data){

    lobbyName(data.gameName);
    started(data.started);
    renderUsersLoop(data.players, data);
    renderOwnUserName();
}

function lobbyName(lobbyName) {
    let titleElement = document.querySelector("#title");
    titleElement.innerHTML = ``;

    if (lobbyName === null || lobbyName === ""){

        titleElement.innerHTML = `${storageAbstractor.loadFromStorage("playerName")}'s lobby`;
    }
    else{
        titleElement.innerHTML = lobbyName;
    }
}

function renderLobbyAmount(currentUserCount,maxUserCount){

       document.querySelector("#playerCount").innerHTML = `${currentUserCount}/${maxUserCount} Players`;
}

function renderUsersLoop(userArray, data){

    const $template = document.querySelector("#player");
    const $target = document.querySelector(".users");
    $target.innerHTML = $template.outerHTML;

    userArray.forEach(user => {
        const $copy = $template.content.firstElementChild.cloneNode(true);

        $copy.textContent = user;

        $target.insertAdjacentHTML("beforeend", $copy.outerHTML);
    })
    renderLobbyAmount(userArray.length, data.numberOfPlayers);
}

function started(isStarted){

    if(isStarted === true){
        window.location.assign("./game-board.html");
    }
}

function renderOwnUserName(){
    document.querySelector("#username").innerHTML = storageAbstractor.loadFromStorage("playerName");
}

export { lobbyName, renderLobbyAmount, renderOwnUserName, started, renderUsersLoop, dataListFromApi };

