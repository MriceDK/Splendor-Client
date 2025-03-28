import * as handler from "./handler.js";



function init() {
    handler.getMatchingGames();
    document.querySelector("#filter").addEventListener("submit", handler.formSubmitPreventHandler);
    document.querySelector(".lobby-overview-container").addEventListener("click", handler.handleLobbyJoinClick)
}

init();