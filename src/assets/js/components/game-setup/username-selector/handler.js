import { saveToStorage } from "../../../data-connector/local-storage-abstractor.js";
import { changePlayerNameText } from "./renderer.js";

function changePlayerName(e){
    e.preventDefault();

    const $usernameForm = document.querySelector("#playername-text");
    if ($usernameForm === null || $usernameForm === undefined || $usernameForm.value === "") {
    document.querySelector(".errorUsernameSelector").innerHTML = "Please enter a username";
    }
    else if(/\s/.test($usernameForm.value)){
        document.querySelector(".errorUsernameSelector").innerHTML = "Username cannot contain spaces";
    }
    else{
        saveToStorage("playerName", $usernameForm.value);
        changePlayerNameText();
    }
}

export { changePlayerName };