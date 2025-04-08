import { loadFromStorage } from "../data-connector/local-storage-abstractor.js";

function changeUsernameText(){

    const username = loadFromStorage("playerName"); 
    document.querySelector("#playername").innerText = username;



}

export { changeUsernameText }