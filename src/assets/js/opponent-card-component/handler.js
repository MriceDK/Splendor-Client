import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import { renderOpponentStats } from "./renderer.js"


function getOpponentInfos(gameId){
    
    APIAbstractor.fetchFromServer("/games/1","GET").then(response => loopThroughPlayers(response));
    
}

function loopThroughPlayers(gameInfo){
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

export { getOpponentInfos, getTotalReservedCards };