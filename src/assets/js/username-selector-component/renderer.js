import {loadFromStorage} from "../data-connector/local-storage-abstractor.js";

function changePlayerNameText() {

    const playerName = loadFromStorage("playerName");
    document.querySelector("#playername").innerText = playerName;


}

export {changePlayerNameText};