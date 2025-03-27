import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import { renderOpponentStats } from "./renderer.js"


function getOpponentInfos(gameId){
    
    APIAbstractor.fetchFromServer("/games/1","GET").then(response => loopThroughPlayers(response));
    
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

function tokenInPurse(player, token){
    if(player.tokens.token){
        return players.tokens.token;
    } else{
        return 0;
    }

}

export { getOpponentInfos, getTotalReservedCards, tokenInPurse };