import * as LocalStorageAbstractor from "../data-connector/local-storage-abstractor.js";

function renderActivePlayer(currentPlayerName) {
    if (LocalStorageAbstractor.loadFromStorage("playerName") === currentPlayerName) {
        document.querySelector("#own-player-card").classList.add("current-player")
    } else {
        document.querySelectorAll(".opponent").forEach(opponent => {
            if (opponent.querySelector(".player").innerText === currentPlayerName) {
                opponent.classList.add("current-player");
            }
        })
    }
}

export {renderActivePlayer}