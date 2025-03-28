import * as LobbyCreatorHandler from "./handler.js";
import { changeUsernameText } from "../username-selector-component/renderer.js";

function init() {
    changeUsernameText();
    document.querySelector("#lobby-create-form").addEventListener("submit", LobbyCreatorHandler.createLobby);
}

init();