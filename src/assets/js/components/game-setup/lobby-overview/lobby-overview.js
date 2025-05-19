import * as handler from "./handler.js";

import {eventListenerUsernameSelector} from "../../../index.js";


function init() {
    handler.getMatchingGames();
    document.querySelector(".lobby-overview-container").addEventListener("click", handler.handleLobbyJoinClick);
    handler.loadUserInformation();
    eventListenerUsernameSelector()
}

init();