
function renderTimer(currentPlayer, timeEndTurn) {
    const $target = document.querySelector(".timer-container");

    $target.querySelector(".current-player-name").innerText = currentPlayer;
    $target.querySelector(".timer").innerText = calculateTimeLeft(timeEndTurn);
}

function calculateTimeLeft(timeEndTurn) {
    const deadline = Date.parse(timeEndTurn);
    const timeLeftDateObject = new Date(deadline - Date.now());
    return `${timeLeftDateObject.getMinutes()}:${timeLeftDateObject.getSeconds()}`;

}

export {renderTimer};