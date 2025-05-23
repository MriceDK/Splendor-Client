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

function handleClickOnPopup(e) {
    // if (e.target.classList.contains("return-to-main-menu-button")) {
    //     window.location.href = "index.html";
    // }
}

export {handleGameOver, handleClickOnPopup};