import {changePlayerName} from "./handler.js";

function usernameInit() {
    document.querySelector(".popup #playername-changer").addEventListener("submit", changePlayerName);
}

export { usernameInit };