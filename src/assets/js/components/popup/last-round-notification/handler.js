import {renderLastRoundNotification, closeLastRoundNotification} from "./renderer.js";
let hasLastRoundBeenShownAlready = false
function lastRoundCheck(isLastRound, res){

    if(isLastRound && hasLastRoundBeenShownAlready === false && res.gameState !== "WinnerFound"){
        renderLastRoundNotification(res);
        setTimeout(closeLastRoundNotification, 3000);
        hasLastRoundBeenShownAlready = true
    }
}

export {lastRoundCheck}