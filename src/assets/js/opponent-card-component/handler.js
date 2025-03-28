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
    return player.reserve.length;
}

function tokenBonusInPurse(player, token, bonus = true){

    if (bonus){
        if(player.bonuses[token]){
            return player.tokens[token];
        } else {
            return 0
        }

    } else {

        if(player.tokens[token]){
            return player.tokens[token];
        } else {
            return 0;
        }



    }
    
}
export { getOpponentInfos, getTotalReservedCards, tokenBonusInPurse };