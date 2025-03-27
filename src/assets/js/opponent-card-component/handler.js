import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import { renderOpponentStats } from "./renderer.js"


function getOpponentInfos(gameId){
    
    const opponents = APIAbstractor.fetchFromServer("/games/1","GET").then(response => response.players);

    opponents.forEach(opponent => renderOpponentStats(opponent));
}

export { getOpponentInfos };