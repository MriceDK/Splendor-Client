import { changeUsername } from "./handler.js"

function init(){

    document.querySelector("#username-changer").addEventListener("submit", changeUsername)

}

init()