function renderHistoryLogs(history) {
    const $target = document.querySelector(".history-logs");
    $target.innerHTML = $target.querySelector("#history-log").outerHTML;

    console.log(history);
    history.forEach(log => {
        renderHistoryLog(log, $target);
    })
}

function renderHistoryLog(log, $target) {
    const $log = document.querySelector("#history-log").content.firstElementChild.cloneNode(true);

    $log.querySelector(".log-player").innerText = log.playerName;
    $log.querySelector(".log-message").innerText = log.action;
    $log.querySelector(".log-time").innerText = log.timeOfCreation;

    $target.insertAdjacentHTML("beforeend", $log.outerHTML);
}

export { renderHistoryLogs };