import {
    handleSettingsPopupClicks
} from "./handler.js";
import {renderSettingsPopup} from "./renderer.js";

function setUpEventlisteners() {
    document.querySelector("#settings").addEventListener("click", renderSettingsPopup);
    document.querySelector(".popup-container").addEventListener("click", handleSettingsPopupClicks);
}

export {setUpEventlisteners};
