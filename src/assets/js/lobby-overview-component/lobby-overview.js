import * as handler from "./handler.js";


function init() {
    handler.getMatchingGames();
    document.querySelector(".lobby-overview-container").addEventListener("click", handler.handleLobbyJoinClick)
    handler.loadUserInformation();
}

init();