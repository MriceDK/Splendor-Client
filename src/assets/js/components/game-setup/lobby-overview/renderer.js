function renderGames(games) {
    const $template = document.querySelector("#join-lobby-template");
    const $results = document.querySelector(".lobby-overview-container");
    $results.innerHTML = $template.outerHTML;
    const $lobby = $template.content.firstElementChild.cloneNode(true);

    games.forEach((game) => {
        $lobby.setAttribute("data-gameId", game.gameId);
        $lobby.querySelector(".lobbyname").innerText = game.gameName;
        $lobby.querySelector(".playercount").innerText = `${game.players.length} / ${game.numberOfPlayers}`;
        $results.insertAdjacentHTML("beforeend", $lobby.outerHTML);
    });
}

function renderOwnPlayerName(name){
    document.querySelector("#playername").innerHTML = name;
}

function renderLobbyFullPopup(gameId){

}


export { renderGames, renderOwnPlayerName, renderLobbyFullPopup };