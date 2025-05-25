import {showEndGamePopup} from "./renderer.js";

function checkIfGameOver(winner) {
    return winner !== null;
}

function handleGameOver(res) {
    if (res.gameState === "WinnerFound") {
        showEndGamePopup(res.winner);
    }
}

export {handleGameOver};