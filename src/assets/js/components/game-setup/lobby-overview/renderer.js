import {
    joinDisableCheck
} from "./handler.js";

function renderGames(games) {
    const $template = document.querySelector("#join-lobby-template");
    const $results = document.querySelector(".lobby-overview-container");
    $results.innerHTML = $template.outerHTML;

    games.forEach((game) => {
        const $lobby = $template.content.firstElementChild.cloneNode(true);
        joinDisableCheck($lobby.querySelector(".join-button"), game.started);
        if (game.private) {
            $lobby.querySelector(".lobbyname").classList.add("private");
        }
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

function renderLobbyFullPopup(gameName, playerName){

    const $popup = document.querySelector(".popup-container:first-of-type");
    const $template = document.querySelector("#lobby-full-popup-template").content.firstElementChild.cloneNode(true);
    $popup.innerHTML = document.querySelector(".setup-popup-templates").outerHTML;
    $template.querySelector("h2").innerText = `We're sorry ${playerName}, but the game with the name ${gameName} is full.`;
    $popup.classList.remove("hidden");

    $popup.insertAdjacentHTML("beforeend", $template.outerHTML);


}



function renderPasswordPopup(gameId, isSpectator= false) {
    const $target = document.querySelector(".popup-container:first-of-type");
    const $template = document.querySelector("#private-lobby-password-popup-template").content.firstElementChild.cloneNode(true);

    $target.innerHTML = document.querySelector(".setup-popup-templates").outerHTML;
    $template.querySelector("#private-lobby-password-form").setAttribute("data-gameId", gameId);
    $template.querySelector("#private-lobby-password-form").setAttribute("data-isSpectator", isSpectator);
    $template.querySelector("#private-lobby-password-form label").innerText = `Please enter the password for the private lobby:`;
    $target.classList.remove("hidden");

    $target.insertAdjacentHTML("beforeend", $template.outerHTML);
}


export { renderGames, renderOwnPlayerName, renderLobbyFullPopup, renderPasswordPopup};