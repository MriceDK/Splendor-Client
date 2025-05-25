import {loadFromStorage} from "../../../data-connector/local-storage-abstractor.js";
import {hideUserNamePopup} from "../../popup/usernameselector-popup/renderer.js";

function changePlayerNameText() {

    document.querySelector("#playername").innerText = loadFromStorage("playerName");
    closePlayerNamePopup()
}

function closePlayerNamePopup(){
    hideUserNamePopup();
}

export {changePlayerNameText};