import {closePopUp} from "../confirmation-popup/renderer.js";

function renderNotAuthorizedPopup(message) {
    const $target = document.querySelector(".popup-container");
    $target.classList.remove("hidden");
    const $template = document.querySelector("#not-authorized-popup").content.firstElementChild.cloneNode(true);

    $template.querySelector("h3").innerText = message;

    $target.insertAdjacentHTML("beforeend", $template.outerHTML);
}

export {renderNotAuthorizedPopup};