import {
    handleSettingsPopupClicks
} from "./handler.js";
import {renderSettingsPopup} from "./renderer.js";
import {handleClickOnPopup} from "../end-game-popup/handler.js";

function setUpEventlisteners() {
    document.querySelector("#settings").addEventListener("click", renderSettingsPopup);
    document.querySelector(".popup-container").addEventListener("click", handleSettingsPopupClicks);
    document.querySelector(".popup-container").addEventListener("click", handleClickOnPopup);

}

export {setUpEventlisteners};
