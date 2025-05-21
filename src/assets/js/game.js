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
import {handleGameOver} from "./components/popup/end-game-popup/handler.js";
import {returnTooManyTokens} from "./components/popup/gems-overflow/handler.js";
import { handleGemOverflow } from "./components/popup/gems-overflow/handler.js";

//import {checkTooMuchGems} from "./components/gameplay/own-player/gems-overflow/handler.js";
let buyableDevCards = [];

function displayGame() {
    getGameInfo()
        .then(res => {
            handleGameOver(res.winner);
            ownPlayerCardRenderer(res); // TODO dit nog verder uitwerken
            renderOpponentsStats(res.players);
            renderMarket(res);
            renderTokenBank(res);
            renderActivePlayer(res.currentPlayer);
            const ownPlayer = getOwnPlayerInfo(res);
            buyableDevCards = getListOfBuyableCards(res.market ,ownPlayer.tokens);
            renderBuyableCards();
            if (res.gameState === "ReturnGems"){
                returnTooManyTokens(ownPlayer);

            }
            //returnTooManyTokens(res.currentPlayer);
            if (res.currentPlayer !== loadFromStorage("playerName")) {
                setTimeout(displayGame, 1000);
            }
        });

}

 displayGame();


export {displayGame, buyableDevCards};
