import * as handler from "./handler.js";
import {eventListenerUsernameSelector, checkUserName} from "../../../index.js";
import {renderAvatar} from "../profile-selector/renderer.js";



function init() {
    handler.getMatchingGames();
    document.querySelector(".lobby-overview-container").addEventListener("click", handler.handleLobbyJoinClick);
    handler.loadUserInformation();
    checkUserName();
    eventListenerUsernameSelector();
    renderAvatar();
}

init();