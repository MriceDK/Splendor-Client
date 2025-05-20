import { saveToStorage } from "../../../data-connector/local-storage-abstractor.js";
import { changePlayerNameText } from "./renderer.js";

function changePlayerName(e){
    e.preventDefault();

    const $usernameForm = document.querySelector("#playername-text");
    if ($usernameForm === null || $usernameForm === undefined || $usernameForm.value === "") {
    document.querySelector(".errorUsernameSelector").classList.remove("hidden");
    }
    else{
        saveToStorage("playerName", $usernameForm.value);
        changePlayerNameText();
    }
}

export { changePlayerName };