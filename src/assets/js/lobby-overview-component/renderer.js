
function renderGames(games) {
    console.log(games);
    const $template = document.querySelector("#join-lobby-template");
    const $results = document.querySelector(".lobby-overview-container");
    $results.innerHTML = $template.outerHTML;
    const $lobby = $template.content.firstElementChild.cloneNode(true);

    games.forEach((game) => {
        if (game.gameName !== null) {
            $lobby.querySelector(".lobbyname").innerText = game.gameName;
        } else {
            $lobby.querySelector(".lobbyname").innerText = game.players[0] + "'s Lobby";
        }
        $lobby.querySelector(".playercount").innerText = game.players.length + "/" + game.numberOfPlayers
        $results.insertAdjacentHTML("beforeend", $lobby.outerHTML)
    })
}


export { renderGames };