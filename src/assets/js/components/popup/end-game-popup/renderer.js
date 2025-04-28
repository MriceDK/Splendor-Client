function showEndGamePopup(winnerName) {
    const $template = document.querySelector('#end-of-game-template').content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".popup-container");

    $target.innerHTML = document.querySelector("#popup-templates").outerHTML;

    $template.querySelector(".winnner").textContent = winnerName;
    $target.insertAdjacentHTML("beforeend", $template.outerHTML);
    $target.classList.remove("hidden");
}

export {showEndGamePopup};