import {closePopUp} from "../confirmation-popup/renderer.js";
import {hideForfeitCloseButtons, showForfeitOption} from "./renderer.js";

function redirectToStartScreen() {
    window.location.href = "index.html";
}

function handleSettingsPopupClicks(e){
    if (e.target.closest(".forfeit")){
        showForfeitOption();
        hideForfeitCloseButtons();
    }
    if (e.target.closest(".forfeit-yes")){
        redirectToStartScreen();
    }
    if (e.target.closest(".forfeit-no")){
        closePopUp();
    }
    if (e.target.closest(".close")){
        closePopUp();
    }
}

export {
    redirectToStartScreen,
    handleSettingsPopupClicks
};
