import {loadFromStorage} from "../../../data-connector/local-storage-abstractor.js";

function renderUsernamePopup(){
    const $template = document.querySelector("#username-popup-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".popup-container");
    $target.classList.remove("hidden");
    $target.innerHTML = document.querySelector("#username-popup-template").outerHTML
    $target.insertAdjacentHTML("beforeend", $template.outerHTML);
    if (loadFromStorage("playerName") === null || loadFromStorage("playerName") === undefined || loadFromStorage("playerName") === ""){
        document.querySelector("#close-popup").classList.add("hidden");
    }
    else{
        document.querySelector("#playername-text").value = loadFromStorage("playerName");
    }
}

function hideUserNamePopup() {
        const $target = document.querySelector(".popup-container");
        $target.classList.add("hidden");
}

export {renderUsernamePopup, hideUserNamePopup}