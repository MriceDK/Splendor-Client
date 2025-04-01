import { showSettingsScreen, hideSettingsScreen, showForfeitOption, hideSettingsMenu, hideForfeitCloseButtons, redirectToStartScreen } from "./handler.js";

function setUpEventlisteners() {
    document.querySelector("#settings").addEventListener("click", showSettingsScreen);
    document.querySelector(".close").addEventListener("click", hideSettingsScreen);
    document.querySelector("#forfeit").addEventListener("click", showForfeitOption);
    document.querySelector("#forfeit-no").addEventListener("click", hideSettingsMenu);
    document.querySelector("#forfeit").addEventListener("click", hideForfeitCloseButtons);
    document.querySelector("#forfeit-yes").addEventListener("click", redirectToStartScreen);
}

export { setUpEventlisteners };
