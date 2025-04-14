import { saveToStorage } from "../../../data-connector/local-storage-abstractor.js";
import { changePlayerNameText } from "./renderer.js";

function changePlayerName(e){
    e.preventDefault();
    
    const $usernameForm = document.querySelector("#playername-text");
    saveToStorage("playerName", $usernameForm.value);
    changePlayerNameText();

}

export { changePlayerName };