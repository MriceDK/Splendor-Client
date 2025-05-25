import {changeProfileSection} from "./renderer.js";
import {makeNameValid, uppercaseFirstLetterOfWord} from "../../../helper/utils.js";
import * as LocalStorageAbstractor from "../../../data-connector/local-storage-abstractor.js";

function changePlayerName(e) {
    e.preventDefault();
    const countryCode = document.querySelector("#avatar-display").title
    changeAvatar(countryCode);
    const $usernameForm = document.querySelector("#playername-text").value.trim();
    if ($usernameForm === "") {
    document.querySelector(".error-profile-selector").innerHTML = "Please enter a username";
    }
    else{
        LocalStorageAbstractor.saveToStorage("playerName", uppercaseFirstLetterOfWord(makeNameValid($usernameForm)));
        changeProfileSection(countryCode);
    }
}

function changeAvatar( countryCode){
    LocalStorageAbstractor.saveToStorage("avatar", countryCode);
}

export { changePlayerName};