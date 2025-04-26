import {renderOpponentsStats} from "./components/gameplay/opponent-card/renderer.js";
import {renderTokenBank} from "./components/gameplay/bank/renderer.js";
import {ownPlayerCardRenderer} from "./components/gameplay/own-player/renderer.js";
import {renderMarket} from "./components/gameplay/market/renderer.js";
import {renderActivePlayer} from "./components/gameplay/active-player/renderer.js";

import {getGameInfo} from "./api/game-setup-api.js";
import {checkTooManyTokens} from "./components/popup/gems-overflow/handler";

// import {checkTooMuchGems} from "./components/gameplay/own-player/gems-overflow/handler.js";


function init() {
    getGameInfo()
        .then(res => {
            ownPlayerCardRenderer(res); // TODO dit nog verder uitwerken
            renderOpponentsStats(res.players);
            renderMarket(res);
            renderTokenBank(res);
            renderActivePlayer(res.currentPlayer);
            checkTooManyTokens(res.players, res.currentPlayer);
            // TODO: ask how to implement this function
        });

}

 init();
