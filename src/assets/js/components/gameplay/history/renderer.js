let amountOfRenders = 0;

function renderHistoryLogs(history) {
    const $target = document.querySelector(".history-logs");
    let amountOfLogsRendered = $target.querySelectorAll(".history-log").length;
    $target.innerHTML = $target.querySelector("#history-log").outerHTML;

    history.forEach(log => {
        renderHistoryLog(log, $target);
    })
    scrollToBottom(history.length, amountOfLogsRendered);

}

function renderHistoryLog(log, $target) {
    const $log = document.querySelector("#history-log").content.firstElementChild.cloneNode(true);

    $log.querySelector(".log-player").innerText = log.playerName;
    $log.querySelector(".log-message").innerText = log.action;
    $log.querySelector(".log-time").innerText = log.timeOfCreation;

    $target.insertAdjacentHTML("beforeend", $log.outerHTML);
}

function scrollToBottom(amountOfLogs, amountOfLogsRendered) {
    const $history = document.querySelector(".history-logs");
    if (needsToScrollDown(amountOfLogs, amountOfLogsRendered) || firstTimeRender()) {
        $history.scrollTop = $history.scrollHeight;
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

function needsToScrollDown(amountOfLogs, amountOfRenderedLogs) {
    return amountOfLogs !== amountOfRenderedLogs;
}

export { renderHistoryLogs };