import {leaveLobby, loadJoinedGame} from "./handler.js";
import * as handler from "./handler.js";
import {renderAvatar} from "../profile-selector/renderer.js";

function init() {
    document.querySelector(".leave-lobby").addEventListener("click", leaveLobby)
    loadJoinedGame();

    handler.loadJoinedGame();
    renderAvatar();
}

init();