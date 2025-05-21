import { saveToStorage } from "../../../data-connector/local-storage-abstractor.js";
import { changePlayerNameText } from "./renderer.js";

function changePlayerName(e){
    e.preventDefault();

    const $usernameForm = document.querySelector("#playername-text").value.trim();
    if ($usernameForm === "") {
    document.querySelector(".error-username-selector").innerHTML = "Please enter a username";
    }
    else{
        saveToStorage("playerName", $usernameForm);
        changePlayerNameText();
    }
}

export { changePlayerName };