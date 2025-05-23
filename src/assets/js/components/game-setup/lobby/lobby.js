import * as handler from "./handler.js";

function init() {
    document.querySelector(".leave-lobby").addEventListener("click", handler.leaveLobby)
    handler.loadJoinedGame();
}

init();