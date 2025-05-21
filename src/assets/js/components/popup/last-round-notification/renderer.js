function renderLastRoundNotification() {
        const $template = document.querySelector("#last-round-notification-template").content.firstElementChild.cloneNode(true);
        $template.querySelector(".last-round-text").innerHTML = `$Player has reached enough points to win <br> last turn starts now`;
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