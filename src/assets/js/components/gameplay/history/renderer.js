import { needsToScrollDown } from "./helper.js";

let amountOfRenders = 0;

function renderHistoryLogs(history) {
    const $target = document.querySelector(".history-logs");
    $target.innerHTML = $target.querySelector("#history-log").outerHTML;

    history.forEach(log => {
        renderHistoryLog(log, $target);
    })

    scrollToBottom($target, history.length);
}

function renderHistoryLog(log, $target) {
    const $log = document.querySelector("#history-log").content.firstElementChild.cloneNode(true);

    $log.querySelector(".log-player").innerText = log.playerName;
    $log.querySelector(".log-message").innerText = log.action;
    $log.querySelector(".log-time").innerText = log.timeOfCreation;

    $target.insertAdjacentHTML("beforeend", $log.outerHTML);
}

function scrollToBottom($target, amountOfLogs) {
    if (needsToScrollDown(amountOfLogs) || firstTimeRender()) {
        $target.scrollTop = $target.scrollHeight;
    }
}

function firstTimeRender() {
    if (amountOfRenders === 0) {
        amountOfRenders = 1;
        return true;
    } else {
        return false;
    }
}

export { renderHistoryLogs };