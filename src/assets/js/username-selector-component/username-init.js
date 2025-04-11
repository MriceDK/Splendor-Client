import {changePlayerName} from "./handler.js"

function init() {

    document.querySelector("#playername-changer").addEventListener("submit", changePlayerName);

}

init()