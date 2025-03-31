import * as APIAbstractor from "./data-connector/api-communication-abstractor.js";
import {renderOpponentsStats} from "./opponent-card-component/renderer.js";
import {ownPlayerCardRenderer} from "./own-player-component/renderer.js";
import {renderActivePlayer} from "./active-player-component/renderer.js";
import * as LocalStorageAbstractor from "./data-connector/local-storage-abstractor.js";

function getGameInfo() {
    const gameId = LocalStorageAbstractor.loadFromStorage("gameId");
    return APIAbstractor.fetchFromServer(`/games/${parseInt(gameId)}`,"GET")

}



function init() {
    getGameInfo()
        .then(res => {
            renderOpponentsStats(res.players);
            ownPlayerCardRenderer(res); // TODO dit nog verder uitwerken
            // TODO render market:
                // TODO render development cards
                // TODO (not a must have) render nobles
            // TODO render token bank
            // TODO: Render current active player

            renderActivePlayer(res.currentPlayer)
        })

 }

 init();