import {renderOpponentsStats} from "./components/gameplay-components/opponent-card-component/renderer.js";
import {renderTokenBank} from "./components/gameplay-components/bank-component/renderer.js";
import {ownPlayerCardRenderer} from "./components/gameplay-components/own-player-component/renderer.js";
import {renderMarket, renderNobles} from "./components/gameplay-components/market-component/renderer.js";
import {renderActivePlayer} from "./components/gameplay-components/active-player-component/renderer.js";
import {getGameInfo} from "./api/api.js";

// import {checkTooMuchGems} from "./components/gameplay-components/own-player-component/gems-overflow-component/handler.js";


function init() {
    getGameInfo()
        .then(res => {
            ownPlayerCardRenderer(res); // TODO dit nog verder uitwerken
            renderOpponentsStats(res.players);
            renderMarket(res);
            renderNobles(res.unclaimedNobles);
            renderTokenBank(res);
            renderActivePlayer(res.currentPlayer);
            // checkTooMuchGems(res.players, res.currentPlayer);
            // TODO: ask how to implement this function
        });

}

 init();
