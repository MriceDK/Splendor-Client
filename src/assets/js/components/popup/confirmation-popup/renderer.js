import {MAX_RESERVED_CARDS} from "../../gameplay/development-card/renderer.js";

function renderBuyDevelopmentCardPopup(cardName) {
    const $template = document.querySelector("#buy-popup-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".popup-container");
    const $devCard = document.querySelector(`article.development-card[data-card-name="${cardName}"]`);

    document.querySelector(".popup-container").classList.remove("hidden");
    document.querySelector(".popup-container").setAttribute("data-pop-up-type", "buy-pop-up");
    $template.querySelector(".title-popup").innerText = `Buy ${cardName}?`;

    $target.insertAdjacentHTML("beforeend", $template.outerHTML);

    if (!$devCard.classList.contains("buyable")) {
        $target.querySelector(".confirmation-popup .confirm-pop-up-button").disabled = true;
    }
}

function renderReserveDevelopmentCardPopup(cardLevel) {
    const $template = document.querySelector("#reserve-deck-popup-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".popup-container");
    const numberOfReservedCards = document.querySelectorAll(".own-reserved-cards .reserved");

    document.querySelector(".popup-container").classList.remove("hidden");
    document.querySelector(".popup-container").setAttribute("data-pop-up-type", "reserve-deck-pop-up");

    $template.querySelector(".title-popup").innerText = `Reserve card from level ${cardLevel}?`;
    $target.insertAdjacentHTML("beforeend", $template.outerHTML);

    if (numberOfReservedCards.length >= MAX_RESERVED_CARDS) {
        $target.querySelector(".confirmation-popup .confirm-pop-up-button").disabled = true;
    }
}

function renderBuyAndReserveDevelopmentCardPopUp(cardName) {
    const $template = document.querySelector("#buy-or-reserve-popup-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".popup-container");
    const $devCard = document.querySelector(`article.development-card[data-card-name="${cardName}"]`);
    const numberOfReservedCards = document.querySelectorAll(".own-reserved-cards .reserved");

    document.querySelector(".popup-container").classList.remove("hidden");
    document.querySelector(".popup-container").setAttribute("data-pop-up-type", "buy-and-reserve-pop-up");

    $template.querySelector(".title-popup").innerText = `Buy or Reserve ${cardName}?`;
    $target.insertAdjacentHTML("beforeend", $template.outerHTML);

    if (!$devCard.classList.contains("buyable")) {
        $target.querySelector(".confirmation-popup .confirm-pop-up-button").disabled = true;
    }

    if (numberOfReservedCards.length >= MAX_RESERVED_CARDS) {
        console.log($target);
        $target.querySelector(".confirmation-popup .cancel-pop-up-button").disabled = true;
    }
}

function closePopUp() {
    const $popupContainer = document.querySelector(".popup-container");
    $popupContainer.classList.add("hidden");
    if ($popupContainer.hasAttribute("data-pop-up-type")) {
        $popupContainer.removeAttribute("data-pop-up-type");
    }
    $popupContainer.innerHTML = document.querySelector("#popup-templates").outerHTML;
}

export {
    renderBuyAndReserveDevelopmentCardPopUp,
    renderBuyDevelopmentCardPopup,
    renderReserveDevelopmentCardPopup,
    closePopUp
};
