import {showEndGamePopup} from "./renderer.js";

function checkIfGameOver(winner) {
    return winner !== null;
}

function handleGameOver(winner) {
    const gameOver = checkIfGameOver(winner);
    if (gameOver) {
        showEndGamePopup(winner);
    }
}

export {handleGameOver};