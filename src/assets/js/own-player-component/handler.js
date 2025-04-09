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

function nobleCheck(nobles, playerInfo){
    const playerBonuses = playerInfo.bonuses;
    const qualifiedNobles = [];
    nobles.forEach(noble => {
        const bonusNeeded = noble.neededBonuses;
        
    });
    

}

function nobleQualification(nobleRequirements, playerBonuses){
    for (const [bonus, requiredAmount] of Object.entries(nobleRequirements)){

        if (playerBonuses[bonus] < requiredAmount) {
            return false; 
        }
    }
    return true; 

}

export { getOwnPlayerInfo};