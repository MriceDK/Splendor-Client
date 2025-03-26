import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import { loadFromStorage, saveToStorage } from "../data-connector/local-storage-abstractor.js";

function getOwnUsername(){
    saveToStorage("myUsername", "Bisson");

    return loadFromStorage("myUsername")
}

function fetchOwnPlayerInfo(){

    
    const ownPlayer = APIAbstractor.fetchFromServer("/games/1","GET").then(response => getOwnPlayerInfo(response));

    return ownPlayer;


}

function getOwnPlayerInfo(gameinfo){
    const players = gameinfo.players;
    players.forEach(player => {
        if (player.name === getOwnUsername()){
            return player
        }
    });

    return null;
}
const OWNPLAYER = fetchOwnPlayerInfo();

function getOwnPrestigePoints(){

    return OWNPLAYER.totalPrestigePoints;

}

function getOwnNobles(){
    return OWNPLAYER.acquiredNobles;
}

function getOwnGems(){
    return OWNPLAYER.tokens
}

function getOwnBonuses(){
    return OWNPLAYER.bonuses;
}

function getOwnReservatedCards(){

    return OWNPLAYER.reserve

}

export { getOwnUsername, getOwnPrestigePoints, getOwnBonuses, getOwnGems, getOwnNobles, getOwnReservatedCards, fetchOwnPlayerInfo}