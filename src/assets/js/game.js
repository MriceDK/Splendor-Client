import * as APIAbstractor from "./data-connector/api-communication-abstractor.js";
import {renderOpponentsStats} from "./opponent-card-component/renderer.js";
import {renderTokenBank} from "./bank-component/renderer.js";
import {ownPlayerCardRenderer} from "./own-player-component/renderer.js";
import {renderMarket} from "./market-component/renderer.js";
import {renderActivePlayer} from "./active-player-component/renderer.js";
import {getGameInfo} from "./API/api.js";




function init() {
    getGameInfo()
        .then(res => {
            ownPlayerCardRenderer(res); // TODO dit nog verder uitwerken
            renderOpponentsStats(res.players);
            renderMarket(res);
            checkTooMuchGems(res.players, res.currentPlayer);
                // TODO (not a must have) render nobles
            // TODO render token bank
            renderTokenBank(res);
            renderActivePlayer(res.currentPlayer);
            handleDisabledPlayerFunctionalities(res.currentPlayer, res.players);
            document.querySelector("#too-many-gems-pop-up-form").addEventListener("submit", updateGemsAfterTooMuch(res.gameId, res.currentPlayer, res.players));

        })

        
 }

 init();