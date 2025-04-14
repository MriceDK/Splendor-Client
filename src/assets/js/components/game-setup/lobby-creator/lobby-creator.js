import * as LobbyCreatorHandler from "./handler.js";
import {changePlayerNameText} from "../username-selector/renderer.js";

function init() {
    changePlayerNameText();
    document.querySelector("#lobby-create-form").addEventListener("submit", LobbyCreatorHandler.createLobby);
}

init();