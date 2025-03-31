function showSettingsScreen() {
    document.querySelector(".popup").classList.remove("hidden");
    document.querySelector(".popup-container").classList.remove("hidden");
}

function hideSettingsScreen() {
    document.querySelector(".popup").classList.add("hidden");
    document.querySelector(".forfeit-popup").classList.add("hidden")
    document.querySelector(".popup-container").classList.add("hidden");
}

function showForfeitOption(){
    document.querySelector(".forfeit-popup").classList.remove("hidden");
}

function hideSettingsMenu(){
    document.querySelector(".popup").classList.add("hidden");
    document.querySelector(".popup-container").classList.add("hidden");
}

function hideForfeitCloseButtons(){
    document.querySelector("#forfeit").classList.add("hidden");
    document.querySelector(".close").classList.add("hidden");
}

function mainMenuAfterForfeit(){
    window.location.href = "index.html"
}

export { showSettingsScreen, hideSettingsScreen, showForfeitOption, hideSettingsMenu, hideForfeitCloseButtons, mainMenuAfterForfeit };
