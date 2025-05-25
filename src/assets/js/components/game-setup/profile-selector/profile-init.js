import {changeProfile} from "./handler.js";
import {setupAvatarSlider} from "./renderer.js";

function profileInit() {
    setupAvatarSlider();
    document.querySelector(".popup #playername-changer").addEventListener("submit", changeProfile);
}

export { profileInit };