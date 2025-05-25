import {closePopUp} from "../confirmation-popup/renderer.js";
import {hideForfeitCloseButtons, showForfeitOption} from "./renderer.js";
import {leaveLobby} from "../../game-setup/lobby/handler.js";


function handleSettingsPopupClicks(e){
    if (e.target.closest(".forfeit")){
        showForfeitOption();
        hideForfeitCloseButtons();
    }
    if (e.target.closest(".forfeit-yes")){
        leaveLobby();
        window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0");
    }
    if (e.target.closest(".forfeit-no")){
        closePopUp();
    }
    if (e.target.closest(".close")){
        closePopUp();
    }
}

export {
    handleSettingsPopupClicks
};
