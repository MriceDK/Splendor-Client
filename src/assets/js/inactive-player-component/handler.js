import { renderDisabledPlayerFunctionalities } from "./renderer.js";
import { renderRemoveDisabledClass } from "./renderer.js";

function handleDisabledPlayerFunctionalities(currentPlayer, allPlayers){

    allPlayers.forEach(player => {
        if (player.name !== currentPlayer){
            renderDisabledPlayerFunctionalities();


        } else {
            renderRemoveDisabledClass();
        }
        
    });


}

export { handleDisabledPlayerFunctionalities }