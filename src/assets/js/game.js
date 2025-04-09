import * as APIAbstractor from "./data-connector/api-communication-abstractor.js";
import {renderOpponentsStats} from "./opponent-card-component/renderer.js";
import {renderTokenBank} from "./bank-component/renderer.js";
import {ownPlayerCardRenderer} from "./own-player-component/renderer.js";
import {renderMarket, renderNobles} from "./market-component/renderer.js";
import {renderActivePlayer} from "./active-player-component/renderer.js";
import { handleDisabledPlayerFunctionalities } from "./inactive-player-component/handler.js"
import * as LocalStorageAbstractor from "./data-connector/local-storage-abstractor.js";
import { checkTooMuchGems, updateGemsAfterTooMuch } from "./own-player-component/gems-overflow-component/handler.js";

function getGameInfo() {
    const gameId = LocalStorageAbstractor.loadFromStorage("gameId");
    return APIAbstractor.fetchFromServer(`/games/${parseInt(gameId)}`,"GET")
}


function init() {
    getGameInfo()
        .then(res => {
            ownPlayerCardRenderer(res); // TODO dit nog verder uitwerken
            renderOpponentsStats(res.players);
            renderMarket(res);
            renderNobles(res.unclaimedNobles);
            checkTooMuchGems(res.players, res.currentPlayer);
            
            
            // TODO render token bank
            renderTokenBank(res);
            renderActivePlayer(res.currentPlayer);
            handleDisabledPlayerFunctionalities(res.currentPlayer, res.players);
            document.querySelector("#too-many-gems-pop-up-form").addEventListener("submit", updateGemsAfterTooMuch(res.gameId, res.currentPlayer, res.players));

        })

        
 }

 init();