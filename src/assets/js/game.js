import {renderOpponentsStats} from "./opponent-card-component/renderer.js";
import {renderTokenBank} from "./bank-component/renderer.js";
import {ownPlayerCardRenderer} from "./own-player-component/renderer.js";
import {renderMarket, renderNobles} from "./market-component/renderer.js";
import {nobleCheck} from "./market-component/handler.js";
import {renderActivePlayer} from "./active-player-component/renderer.js";
import {getGameInfo} from "./API/api.js";

// import {checkTooMuchGems} from "./own-player-component/gems-overflow-component/handler.js";


function init() {
    getGameInfo()
        .then(res => {
            const currentPlayer = getCurrentPlayer(res.players, res.currentPlayer);
            ownPlayerCardRenderer(res); // TODO dit nog verder uitwerken
            renderOpponentsStats(res.players);
            renderMarket(res);
            renderNobles(res.unclaimedNobles);
            
            nobleCheck(res.pickNobleRequired, res.unclaimedNobles, currentPlayer);
            checkTooMuchGems(res.players, res.currentPlayer);
            
            
            // TODO render token bank
            renderTokenBank(res);
            renderActivePlayer(res.currentPlayer);
            // checkTooMuchGems(res.players, res.currentPlayer);
            // TODO: ask how to implement this function
        });

}

function getCurrentPlayer(players, currentPlayer){
    players.forEach(player => {
        if (player.name === currentPlayer){
            return player;
        }
        
    });
 }

 init();
