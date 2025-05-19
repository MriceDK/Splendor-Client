import * as LobbyCreatorHandler from "./handler.js";
import {changePlayerNameText} from "../username-selector/renderer.js";
import {eventListenerUsernameSelector} from "../../../index.js";

function init() {
    changePlayerNameText();
    eventListenerUsernameSelector()
    document.querySelector("#lobby-create-form").addEventListener("submit", LobbyCreatorHandler.createLobby);
}

init();