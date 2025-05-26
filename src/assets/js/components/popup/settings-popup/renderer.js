
import {loadFromStorage} from "../../../data-connector/local-storage-abstractor.js";

function renderSettingsPopup(){
    const isSpectating = loadFromStorage("spectate");
    const $template = document.querySelector("#settings-popup-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".popup-container");
    if (isSpectating) {
        $template.querySelector(".forfeit").innerText = "Stop Spectating";
        $template.querySelector(".forfeit-popup p").innerText = "Do you want to stop spectating?";
    }

    document.querySelector(".popup-container").classList.remove("hidden");
    $target.insertAdjacentHTML("beforeend", $template.outerHTML);
}

function showForfeitOption() {
    document.querySelector(".forfeit-popup").classList.remove("hidden");
}

function hideForfeitCloseButtons() {
    document.querySelector(".forfeit").classList.add("hidden");
    document.querySelector(".close").classList.add("hidden");
    document.querySelector(".settings-title").classList.add("hidden")
}

export {renderSettingsPopup, hideForfeitCloseButtons, showForfeitOption};