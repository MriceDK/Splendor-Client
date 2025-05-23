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
import {
    hookUpEventListenersOnCards
} from "./components/popup/confirmation-popup/confirmation-popup-event-listener-hookup.js";
import {immediateTokenCheckAfterTokenUpdate} from "./components/popup/too-much-gems-popup/handler.js";
import * as NotAuthorizedPopupRenderer from "./components/popup/not-authorized-popup/renderer.js";
import {setUpEventlisteners} from "./components/popup/settings-popup/set-up-eventlisteners.js";
import {nobleCheck} from "./components/gameplay/noble/pickable/handler.js";
let buyableDevCards = [];

function displayGame() {
    getGameInfo()
        .then(res => {
            handleGameOver(res.winner);
            ownPlayerCardRenderer(res);
            renderOpponentsStats(res.players);
            renderMarket(res);
            renderTokenBank(res);
            renderActivePlayer(res.currentPlayer);
            const ownPlayer = getOwnPlayerInfo(res);
            buyableDevCards = getListOfBuyableCards(res.market ,ownPlayer);
            renderBuyableCards();
            hookUpEventListenersOnCards();
            setUpEventlisteners();
            hookUpEventListenersOnCards()
            nobleCheck(res.gameState, res.unclaimedNobles, res.currentPlayer, ownPlayer);
            immediateTokenCheckAfterTokenUpdate(res.gameState, res.currentPlayer, ownPlayer);
            if (res.currentPlayer !== loadFromStorage("playerName")) {
                setTimeout(displayGame, 1000);
            }
        }).catch(err => {console.log(err);
            document.querySelector("main").innerHTML = "";
            NotAuthorizedPopupRenderer.renderNotAuthorizedPopup(err.message);
     })

}

 displayGame();


export {displayGame, buyableDevCards};
