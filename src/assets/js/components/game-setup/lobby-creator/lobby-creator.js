import * as LobbyCreatorHandler from "./handler.js";
import {changeProfileSection, renderAvatar} from "../profile-selector/renderer.js";
import {checkUserName, eventListenerUsernameSelector} from "../../../index.js";

function init() {
    changeProfileSection();
    checkUserName();
    eventListenerUsernameSelector();
    renderAvatar();
    document.querySelector("#lobby-create-form").addEventListener("submit", LobbyCreatorHandler.createLobby);
    document.querySelector("#private").addEventListener("change", LobbyCreatorHandler.togglePasswordField);
    document.querySelector("#public").addEventListener("change", LobbyCreatorHandler.togglePasswordField);


}

init();