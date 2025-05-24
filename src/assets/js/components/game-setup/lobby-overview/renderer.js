import {handleLobbyFullPopupClick, joinDisableCheck} from "./handler.js";

function renderGames(games) {
    const $template = document.querySelector("#join-lobby-template");
    const $results = document.querySelector(".lobby-overview-container");
    $results.innerHTML = $template.outerHTML;
    const $lobby = $template.content.firstElementChild.cloneNode(true);

    games.forEach((game) => {
        joinDisableCheck($lobby.querySelector(".join-button"), game.started);
        $lobby.setAttribute("data-gameId", game.gameId);
        $lobby.setAttribute("data-gameName", game.gameName);
        $lobby.querySelector(".lobbyname").innerText = game.gameName;
        $lobby.querySelector(".playercount").innerText = `${game.players.length} / ${game.numberOfPlayers}`;
        $results.insertAdjacentHTML("beforeend", $lobby.outerHTML);
    });
}

function renderOwnPlayerName(name){
    document.querySelector("#playername").innerHTML = name;
}

function renderLobbyFullPopup(playerName){

    const gameName = document.querySelector(`[data-gameId = "${joinGameId}"]`).getAttribute("data-gameName");

    const $popup = document.querySelector(".popup-container:first-of-type");
    const $template = document.querySelector("#lobby-full-popup-template").content.firstElementChild.cloneNode(true);
    $template.querySelector("h2").innerText = `We're sorry ${playerName}, but the game with the name ${gameName} is full.`;
    const $target = document.querySelector(".popup-container:first-of-type");
    $popup.classList.remove("hidden");
    $template.addEventListener("submit", e => handleLobbyFullPopupClick(e, $popup));


    $target.insertAdjacentHTML("beforeend", $template.outerHTML);


}


export { renderGames, renderOwnPlayerName, renderLobbyFullPopup };