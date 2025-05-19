import {renderPopup} from "./handeler.js";

function renderUsernamePopup(){
    const $template = document.querySelector("#username-popup-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".popup-container");
    $target.classList.remove("hidden");
    $target.innerHTML = document.querySelector("#username-popup-template").outerHTML
    $target.insertAdjacentHTML("beforeend", $template.outerHTML);
}
export {renderUsernamePopup}