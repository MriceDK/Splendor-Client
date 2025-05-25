import {changePlayerName} from "./handler.js";
import {setupAvatarSlider} from "./renderer.js";

function usernameInit() {
    setupAvatarSlider();
    document.querySelector(".popup #playername-changer").addEventListener("submit", changePlayerName);
}

export { usernameInit };