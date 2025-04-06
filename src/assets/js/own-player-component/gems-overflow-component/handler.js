import { renderTooManyGemsPopUp } from "../renderer.js";

function checkTooMuchGems(playersInfos, currentPlayer){
    playersInfos.forEach(player => {
        if (player.name === currentPlayer){
            checkTooMuchGemsHelp(player);

        }
        
    });
    
}

function checkTooMuchGemsHelp(player){
    let tokensOfPlayer = 0;
    players.tokens.forEach(token => {
        tokensOfPlayer += player.tokens[token];

    });
    if (tokensOfPlayer > 10){
        renderTooManyGemsPopUp();
    }
}

export { checkTooMuchGems }