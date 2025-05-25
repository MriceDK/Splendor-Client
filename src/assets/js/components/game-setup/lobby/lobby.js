import {leaveLobby, loadJoinedGame} from "./handler.js";

function init() {
    document.querySelector(".leave-lobby").addEventListener("click", leaveLobby)
    loadJoinedGame();
}

init();