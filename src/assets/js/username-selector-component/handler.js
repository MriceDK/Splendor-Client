import { changeUsernameText } from "./renderer.js";

function changeUsername(e){
    e.preventDefault();
    
    const $usernameForm = document.querySelector("#username-text")
    localStorage.setItem("myUsername", JSON.stringify($usernameForm.value));
    changeUsernameText();

}

export { changeUsername }