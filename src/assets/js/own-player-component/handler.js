import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import { loadFromStorage } from "../data-connector/local-storage-abstractor.js";

function getOwnUsername(){
    return loadFromStorage("myUsername")
}

function fetchOwnPlayerInfo(){

    const fetched = JSON.parse(APIAbstractor.fetchFromServer(`/games/${gameId}`,"GET"));
    const players = fetched.players
    players.array.forEach(player => {
        if (player.name === getOwnUsername()){
            return player;
        }
        
    });

    return null;

}
function getOwnPrestigePoints(){

    const player = fetchOwnPlayerInfo();
    return player.totalPrestigePoints;


}