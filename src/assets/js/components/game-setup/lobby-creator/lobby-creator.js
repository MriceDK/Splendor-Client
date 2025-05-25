import * as LobbyCreatorHandler from "./handler.js";
import {changePlayerNameText} from "../username-selector/renderer.js";
import {checkUserName, eventListenerUsernameSelector} from "../../../index.js";

function init() {
    changePlayerNameText();
    checkUserName();
    eventListenerUsernameSelector()
    document.querySelector("#lobby-create-form").addEventListener("submit", LobbyCreatorHandler.createLobby);
    document.querySelector("#private").addEventListener("change", LobbyCreatorHandler.togglePasswordField);
    document.querySelector("#public").addEventListener("change", LobbyCreatorHandler.togglePasswordField);


}

init();