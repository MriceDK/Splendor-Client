import * as LocalStorageAbstractor from "../../../data-connector/local-storage-abstractor.js";

import {handleClickability} from "../market/handler.js";


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
    handleClickability(true, "market-grid-container");
    handleClickability(true, "own-reserved-cards");
}

function disableOwnPlayer() {
    document.querySelector("#own-player-card").classList.remove("current-player");
    document.querySelector("#own-player-card").classList.add("disabled-player");
    handleClickability(false, "market-grid-container");
    handleClickability(false, "own-reserved-cards");
}

export {renderActivePlayer};