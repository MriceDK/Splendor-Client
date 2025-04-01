import { handleDisabledPlayerFunctionalities } from "./handler.js";

function init(){
    const allPlayers = document.querySelectorAll(".player");
    const activePlayer = document.querySelector(".current-player")
    handleDisabledPlayerFunctionalities(activePlayer, allPlayers);

}

init();