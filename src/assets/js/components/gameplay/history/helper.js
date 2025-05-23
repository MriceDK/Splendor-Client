function needsToScrollDown(amountOfLogs) {
    const amountOfRenderedLogs = document.querySelectorAll(".history-log").length;

    return amountOfLogs !== amountOfRenderedLogs;
}

export { needsToScrollDown };