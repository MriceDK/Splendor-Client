function renderLastRoundNotification(res) {
        const $template = document.querySelector("#last-round-notification-template").content.firstElementChild.cloneNode(true);
        const previousPlayer = res.players[((res.players.findIndex(player => player.name === res.currentPlayer)- 1 + res.numberOfPlayers) % res.numberOfPlayers)].name;
        $template.querySelector(".last-round-text").innerHTML = `${previousPlayer} has reached enough points to win <br> last turn starts now`;
        const $target = document.querySelector(".popup-container")
        $target.classList.remove("hidden");
        $target.innerHTML = document.querySelector("#last-round-notification-template").outerHTML;
        $target.insertAdjacentHTML("beforeend", $template.outerHTML);
}

function closeLastRoundNotification() {
    const $target = document.querySelector(".popup-container")
    $target.classList.add("hidden");
}
export {renderLastRoundNotification, closeLastRoundNotification};