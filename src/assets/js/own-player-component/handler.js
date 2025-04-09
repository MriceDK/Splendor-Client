import { loadFromStorage } from "../data-connector/local-storage-abstractor.js";

function getOwnUsername(){
    return loadFromStorage("playerName");
}

function getOwnPlayerInfo(gameinfo){
    const players = gameinfo.players;

    for (const player of players) {
        console.log(player.name + getOwnUsername());
        if (player.name === getOwnUsername()){
            return player;
        }
    }

    return null;
}

export { getOwnPlayerInfo, nobleCheck};