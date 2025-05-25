function renderLastRoundNotification(res) {
    const $template = document.querySelector("#last-round-notification-template").content.firstElementChild.cloneNode(true);
    const indexOfCurrentPlayer = res.players.findIndex(player => player.name === res.currentPlayer);
    const indexOfPreviousPlayer = (indexOfCurrentPlayer - 1 + res.numberOfPlayers) % res.numberOfPlayers;
    const previousPlayer = res.players[indexOfPreviousPlayer].name;

    $template.querySelector(".last-round-text").innerText = `${previousPlayer} has reached enough points to win, the last round starts now`;
    const $target = document.querySelector(".popup-container");
    $target.classList.remove("hidden");
    $target.innerHTML = document.querySelector("#popup-templates").outerHTML;
    $target.insertAdjacentHTML("beforeend", $template.outerHTML);
}

function closeLastRoundNotification() {
    const $target = document.querySelector(".popup-container");
    document.querySelector(".popup-notification").remove();
    $target.classList.add("hidden");
}
export {renderLastRoundNotification, closeLastRoundNotification};