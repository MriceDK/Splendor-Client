import { loadFromStorage } from "../data-connector/local-storage-abstractor.js";

function changeUsernameText(){

    const username = loadFromStorage("myUsername"); 
    document.querySelector("#username").innerText = username;



}

export { changeUsernameText }