import { saveToStorage } from "../data-connector/local-storage-abstractor.js";
import { changeUsernameText } from "./renderer.js";

function changeUsername(e){
    e.preventDefault();
    
    const $usernameForm = document.querySelector("#playername-text")
    saveToStorage("playerName", $usernameForm.value);
    changeUsernameText();

}

export { changeUsername }