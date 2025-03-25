import { changeUsername } from "./renderer.js"

function init(){

    document.querySelector("#username-changer").addEventListener("submit", changeUsername)

}

init()