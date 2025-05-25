import {toTwoDigit} from "../../../helper/utils.js";
import {closePopUp} from "../../popup/confirmation-popup/renderer.js";

const MILLISECONDS_IN_A_SECOND = 1000;
const AMOUNT_OF_SECONDS_TO_RENDER_TIME_IS_ALMOST_UP = 20;

function renderTimer(currentPlayer, timeEndTurn) {
    const $target = document.querySelector(".timer-container");

    const secondsLeft = calculateSecondsLeft(timeEndTurn) +1;
    makeTimerRedWhenTimeIsAlmostUp(secondsLeft, $target.querySelector(".timer"));

    $target.querySelector(".current-player-name").innerText = currentPlayer;
    $target.querySelector(".timer").innerText = convertToTimer(secondsLeft);

    if (secondsLeft <= 0) {
        closePopUp();
    }
}

function makeTimerRedWhenTimeIsAlmostUp(secondsLeft, $target) {
    if (secondsLeft <= AMOUNT_OF_SECONDS_TO_RENDER_TIME_IS_ALMOST_UP) {
        $target.classList.add("turn-almost-done");
    } else {
        $target.classList.remove("turn-almost-done");
    }
}

function convertToTimer(secondsLeft) {
    const timeLeftDateObject = new Date(secondsLeft * MILLISECONDS_IN_A_SECOND);

    const minutes = toTwoDigit(timeLeftDateObject.getMinutes());
    const seconds = toTwoDigit(timeLeftDateObject.getSeconds());

    return `${minutes}:${seconds}`;
}

// Hier houd ik enkel rekening met de minuten en de seconden, omdat Date.now() standaard de tijd terug geeft volgens timezone UTC
function calculateSecondsLeft(timeEndTurn) {
    const deadline = Date.parse(timeEndTurn);
    const timeLeftDateObject = new Date(deadline - Date.now());

    const minutes = timeLeftDateObject.getMinutes();

    return timeLeftDateObject.getSeconds() + (minutes * 60);
}

export {renderTimer};