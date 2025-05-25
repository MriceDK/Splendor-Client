import * as handler from "./handler.js";
import {eventListenerUsernameSelector, checkUserName} from "../../../index.js";



function init() {
    handler.getMatchingGames();
    document.querySelector(".lobby-overview-container").addEventListener("click", handler.handleLobbyJoinClick);
    document.querySelector("#filter").addEventListener("submit", e =>
    {
        e.preventDefault();
        handler.getMatchingGames();
    });
    document.querySelector(".popup-container").addEventListener("click", handler.handlePopupClick);
    handler.loadUserInformation();
    checkUserName();
    eventListenerUsernameSelector()
}

init();