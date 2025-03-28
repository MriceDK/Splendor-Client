import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import { renderOpponentStats } from "./renderer.js"


function getOpponentInfos(gameId){
    
    APIAbstractor.fetchFromServer("/games/1","GET").then(response => loopThroughPlayers(response)).catch(error => console.log(error));
    
}

function loopThroughPlayers(gameInfo){
    console.log(gameInfo);
    gameInfo.players.forEach(opponent => renderOpponentStats(opponent));
}

function getTotalReservedCards(player){
    if (player.reserve){
        let counter = 0;
        player.reserve.forEach(() => counter++);
        return counter;

    } else {
        return 0;
    }

}

//work with object.entries to get the full object
function tokenInPurse(player, token){
    console.log(player.tokens[token]);
    if(player.tokens.purse !== undefined){
        return player.tokens[token];
    } else{
        return 0;
    }

}

function checkBonuses(player, bonus){
    console.log(player.bonuses.purse);
    if(player.bonuses.purse !== undefined){
        if (player.bonuses[bonus]){
            return player.bonuses[bonus];
        } else{
            return 0;
        }
        
    } else{
        return 0;
    }
}
export { getOpponentInfos, getTotalReservedCards, tokenInPurse, checkBonuses };