import {loadFromStorage} from "../../../data-connector/local-storage-abstractor.js";
import {hideUserNamePopup} from "../../popup/usernameselector-popup/renderer.js";

function changePlayerNameText() {

    const playerName = loadFromStorage("playerName");
    document.querySelector("#playername").innerText = playerName;
    closePlayerNamePopup()
}

function closePlayerNamePopup(){
    hideUserNamePopup();
}

export {changePlayerNameText};