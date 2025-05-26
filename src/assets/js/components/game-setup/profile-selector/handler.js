import {changeProfileSection} from "./renderer.js";
import {hasValidCharacters, makeNameValid, uppercaseFirstLetterOfWord} from "../../../helper/utils.js";
import * as LocalStorageAbstractor from "../../../data-connector/local-storage-abstractor.js";

function changeProfile(e) {
    e.preventDefault();
    const countryCode = document.querySelector("#avatar-display").title;
    changeAvatar(countryCode);
    const username = document.querySelector("#playername-text").value.trim();
    if (username === "") {
        document.querySelector(".error-profile-selector").innerText = "Please enter a username";
    } else if (!hasValidCharacters(username)) {
        document.querySelector(".error-profile-selector").innerText = "You can only use the following characters: (a-z, A-Z, 0-9)";
    }
    else{
        LocalStorageAbstractor.saveToStorage("playerName", uppercaseFirstLetterOfWord(makeNameValid(username)));
        changeProfileSection(countryCode);
    }
}

function changeAvatar( countryCode){
    LocalStorageAbstractor.saveToStorage("avatar", countryCode);
}

export { changeProfile};