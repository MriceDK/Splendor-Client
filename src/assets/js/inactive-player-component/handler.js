

function handleDisabledPlayerFunctionalities(currentPlayer, allPlayers){

    allPlayers.forEach(player => {
        if (player.name !== currentPlayer){
            renderDisabledPlayerFunctionalities();

        } else {
            renderRemoveDisabledClass();
        }
        
    });


}