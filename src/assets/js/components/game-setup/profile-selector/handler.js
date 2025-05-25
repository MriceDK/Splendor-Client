import {changePlayerNameText, renderAvatar} from "./renderer.js";
import {makeNameValid, uppercaseFirstLetterOfWord} from "../../../helper/utils.js";
import * as LocalStorageAbstractor from "../../../data-connector/local-storage-abstractor.js";

function changePlayerName(e){
    e.preventDefault();
    const $usernameForm = document.querySelector("#playername-text").value.trim();
    if ($usernameForm === "") {
    document.querySelector(".error-profile-selector").innerHTML = "Please enter a username";
    }
    else{
        LocalStorageAbstractor.saveToStorage("playerName", uppercaseFirstLetterOfWord(makeNameValid($usernameForm)));
        changePlayerNameText();
    }
}

function changeAvatar(e, countryCode){
    e.preventDefault();
    LocalStorageAbstractor.saveToStorage("avatar", countryCode);
}

function handleClickOnFlag(e) {
    e.preventDefault();
    const img = e.target.closest("img");
    if (img) {
        const countryCode = img.title;
        changeAvatar(e, countryCode);
        window.location.href = "index.html";

    }
}

function hookUpEventListenerToImages(){
    const $container = document.querySelector("#avatar-selector-container");
    $container.addEventListener("click", handleClickOnFlag);
}

export { changePlayerName, hookUpEventListenerToImages };