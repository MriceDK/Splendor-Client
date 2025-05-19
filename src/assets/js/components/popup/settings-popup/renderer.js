function renderSettingsPopup(){
    const $template = document.querySelector("#settings-popup-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".popup-container");

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