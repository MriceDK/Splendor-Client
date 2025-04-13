import * as LocalStorageAbstractor from "../../../data-connector/local-storage-abstractor.js";
import {
    handleMarketClickability
} from "../inactive-player-component/market-util-inactive-component/market-inactive-handler.js";


function renderActivePlayer(currentPlayerName) {
    if (LocalStorageAbstractor.loadFromStorage("playerName") === currentPlayerName) {
        activateOwnPlayer();
        renderCurrentOrDisabledOpponent(currentPlayerName);
    } else {
        disableOwnPlayer();
        renderCurrentOrDisabledOpponent(currentPlayerName);
    }
}

function renderCurrentOrDisabledOpponent(currentPlayerName) {
    document.querySelectorAll(".opponent").forEach(opponent => {
        if (opponent.querySelector(".player").innerText === currentPlayerName) {
            opponent.classList.add("current-player");
            // opponent.classList.remove("disabled-player");

        } else {
            // opponent.classList.add("disabled-player");
            opponent.classList.remove("current-player");
        }
    });
}

function activateOwnPlayer() {
    document.querySelector("#own-player-card").classList.remove("disabled-player");
    document.querySelector("#own-player-card").classList.add("current-player");
    handleMarketClickability(true);
}

function disableOwnPlayer() {
    document.querySelector("#own-player-card").classList.remove("current-player");
    document.querySelector("#own-player-card").classList.add("disabled-player");
    handleMarketClickability(false);
}

export {renderActivePlayer};