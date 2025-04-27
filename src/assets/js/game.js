import {renderOpponentsStats} from "./components/gameplay/opponent-card/renderer.js";
import {renderTokenBank} from "./components/gameplay/bank/renderer.js";
import {ownPlayerCardRenderer} from "./components/gameplay/own-player/renderer.js";
import {renderMarket} from "./components/gameplay/market/renderer.js";
import {renderActivePlayer} from "./components/gameplay/active-player/renderer.js";

import {getGameInfo} from "./api/game-setup-api.js";
import {loadFromStorage} from "./data-connector/local-storage-abstractor.js";
import {getOwnPlayerInfo} from "./components/gameplay/own-player/helper.js";
import {getListOfBuyableCards} from "./components/gameplay/development-card/helper.js";
import {renderBuyableCards} from "./components/gameplay/development-card/renderer.js";

// import {checkTooMuchGems} from "./components/gameplay/own-player/gems-overflow/handler.js";
let buyableDevCards = [];

function displayGame() {
    getGameInfo()
        .then(res => {
            ownPlayerCardRenderer(res); // TODO dit nog verder uitwerken
            renderOpponentsStats(res.players);
            renderMarket(res);
            renderTokenBank(res);
            renderActivePlayer(res.currentPlayer);
            const ownPlayer = getOwnPlayerInfo(res);
            buyableDevCards = getListOfBuyableCards(res.market ,ownPlayer.tokens);
            renderBuyableCards();
            // checkTooMuchGems(res.players, res.currentPlayer);
            // TODO: ask how to implement this function
            if (res.currentPlayer !== loadFromStorage("playerName")) {
                setTimeout(displayGame, 1000);
            }
        });

}

 displayGame();


export {displayGame, buyableDevCards};
