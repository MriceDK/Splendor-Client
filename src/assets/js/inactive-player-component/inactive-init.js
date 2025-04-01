import { handleDisabledPlayerFunctionalities } from "./handler.js";

function init(){
    document.querySelector("#inactive-player").addEventListener("load", handleDisabledPlayerFunctionalities)

}

init();