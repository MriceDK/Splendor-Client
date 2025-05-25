import {renderOpponentsStats} from "./components/gameplay/opponent-card/renderer.js";
import {renderTokenBank} from "./components/gameplay/bank/renderer.js";
import {ownPlayerCardRenderer} from "./components/gameplay/own-player/renderer.js";
import {renderMarket} from "./components/gameplay/market/renderer.js";
import {renderActivePlayer} from "./components/gameplay/active-player/renderer.js";
import {renderHistoryLogs} from "./components/gameplay/history/renderer.js";
import {renderTimer} from "./components/gameplay/timer/renderer.js";
import {getGameInfo} from "./api/game-setup-api.js";
import {loadFromStorage} from "./data-connector/local-storage-abstractor.js";
import {getCurrentPlayerInfo, getOwnPlayerInfo} from "./components/gameplay/own-player/helper.js";
import {getListOfBuyableCards} from "./components/gameplay/development-card/helper.js";
import {renderBuyableCards} from "./components/gameplay/development-card/renderer.js";
import {handleGameOver} from "./components/popup/end-game-popup/handler.js";
import {hookUpEventListenersOnCards} from "./components/popup/confirmation-popup/confirmation-popup-event-listener-hookup.js";
import {immediateTokenCheckAfterTokenUpdate} from "./components/popup/too-much-gems-popup/handler.js";
import * as NotAuthorizedPopupRenderer from "./components/popup/not-authorized-popup/renderer.js";
import {setUpEventlisteners} from "./components/popup/settings-popup/set-up-eventlisteners.js";
import {chooseNobleCheck} from "./components/gameplay/noble/pickable/handler.js";
import * as OpponentCardHandler from "./components/gameplay/opponent-card/handler.js";
import {getCorrectMessageFromError} from "./data-connector/error-handler.js";
import {closePopUp} from "./components/popup/confirmation-popup/renderer.js";
import {renderSpectators} from "./components/gameplay/info/spectators/renderer.js";
import {lastRoundCheck} from "./components/popup/last-round-notification/handler.js";

let buyableDevCards = [];

function displayGame(renderAll = true) {
    const username = loadFromStorage("playerName");
    getGameInfo()
        .then(res => {
            renderTimer(res.currentPlayer, res.timeEndTurn);
            renderSpectators(res.spectators);
            document.title = `Splendor ${res.gameName}`;

            if (renderAll) {
                let ownPlayer = getOwnPlayerInfo(res);
                let isSpectating = false;
                if (res.spectators.includes(username)) {
                    ownPlayer = getCurrentPlayerInfo(res);
                    isSpectating = true;
                }
                document.querySelector(".lobby-name").innerText = res.gameName;
                handleGameOver(res.winner);
                ownPlayerCardRenderer(ownPlayer, isSpectating);
                renderOpponentsStats(res.players);
                renderMarket(res);
                renderTokenBank(res);
                renderActivePlayer(res.currentPlayer);
                renderHistoryLogs(res.history);
                hookUpEventListenersOnCards();
                setUpEventlisteners();
                hookUpEventListenersOnCards();
                chooseNobleCheck(res.gameState, res.unclaimedNobles, res.currentPlayer, ownPlayer);
                immediateTokenCheckAfterTokenUpdate(res.gameState, res.currentPlayer, ownPlayer);
                document.querySelectorAll(".opponent").forEach($opponent => {
                    $opponent.addEventListener("click", OpponentCardHandler.toggleVisibilityNobles);
                });
            }

            buyableDevCards = getListOfBuyableCards(res.market, ownPlayer);
            renderBuyableCards();
            lastRoundCheck(res.lastRound, res);

            if (res.currentPlayer !== loadFromStorage("playerName")) {
                setTimeout(() => displayGame(true), 1000);
            } else {
                setTimeout(() => displayGame(false), 1000);
            }
        })
        .catch(err => {
            closePopUp();
            document.querySelector("main").innerHTML = "";
            const message = getCorrectMessageFromError(err);
            NotAuthorizedPopupRenderer.renderNotAuthorizedPopup(message);
     })

}

 displayGame();


export {displayGame, buyableDevCards};
