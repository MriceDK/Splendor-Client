import {showEndGamePopup} from "./renderer.js";

function handleGameOver(res) {
    if (res.gameState === "WinnerFound") {
        showEndGamePopup(res.winner);
    }
}

export {handleGameOver};