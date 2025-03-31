import * as APIAbstractor from "./data-connector/api-communication-abstractor.js";
import {renderOpponentsStats} from "./opponent-card-component/renderer.js";
import {ownPlayerCardRenderer} from "./own-player-component/renderer.js";
import {renderMarket} from "./market-component/renderer.js";
import {renderActivePlayer} from "./active-player-component/renderer.js";
import * as LocalStorageAbstractor from "./data-connector/local-storage-abstractor.js";

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
                // TODO (not a must have) render nobles
            // TODO render token bank
            // TODO: Render current active player
            renderActivePlayer(res.currentPlayer)
        })

 }

 init();