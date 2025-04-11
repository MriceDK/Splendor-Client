import {loadFromStorage} from "../data-connector/local-storage-abstractor.js";

function changeUsernameText() {

    const playerName = loadFromStorage("playerName");
    document.querySelector("#playername").innerText = playerName;


}

export {changeUsernameText}