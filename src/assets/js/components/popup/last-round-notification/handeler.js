import {renderLastRoundNotification, closeLastRoundNotification} from "./renderer.js";


    let hasLastRoundBeenShownAlready = false
function lastRoundCheck(isLastRound){

    if(isLastRound && hasLastRoundBeenShownAlready === false){
        renderLastRoundNotification();
        setTimeout(closeLastRoundNotification, 3000);
        hasLastRoundBeenShownAlready = true
    }
}

export {lastRoundCheck}