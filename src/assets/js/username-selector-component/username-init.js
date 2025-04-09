import { changeUsername } from "./handler.js"

function init(){

    document.querySelector("#playername-changer").addEventListener("submit", changeUsername)

}

init()