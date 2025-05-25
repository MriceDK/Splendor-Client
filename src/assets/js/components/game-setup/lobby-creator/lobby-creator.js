import * as LobbyCreatorHandler from "./handler.js";
import {changeProfileSection} from "../profile-selector/renderer.js";
import {checkUserName, eventListenerUsernameSelector} from "../../../index.js";

function init() {
    changeProfileSection();
    checkUserName();
    eventListenerUsernameSelector()
    document.querySelector("#lobby-create-form").addEventListener("submit", LobbyCreatorHandler.createLobby);
}

init();