
function renderBuyDevelopmentCardPopup(cardName){
    const $template = document.querySelector("#buy-popup-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".popup-container");

    document.querySelector(".popup-container").classList.remove("hidden");
    document.querySelector(".popup-container").setAttribute("data-pop-up-type", "buy-pop-up");
    $template.querySelector(".title-popup").innerText = `Buy ${cardName}?`;
    $target.insertAdjacentHTML("beforeend", $template.outerHTML);

}

function renderReserveDevelopmentCardPopup(cardLevel){
    const $template = document.querySelector("#reserve-deck-popup-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".popup-container");

    document.querySelector(".popup-container").classList.remove("hidden");
    document.querySelector(".popup-container").setAttribute("data-pop-up-type", "reserve-deck-pop-up");

    $template.querySelector(".title-popup").innerText = `Reserve card from level ${cardLevel}?`;
    $target.insertAdjacentHTML("beforeend", $template.outerHTML);
}

function renderBuyAndReserveDevelopmentCardPopUp(cardName){
    const $template = document.querySelector("#buy-or-reserve-popup-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".popup-container");

    document.querySelector(".popup-container").classList.remove("hidden");
    document.querySelector(".popup-container").setAttribute("data-pop-up-type", "buy-and-reserve-pop-up");

    $template.querySelector(".title-popup").innerText = `Buy or Reserve ${cardName}?`;
    $target.insertAdjacentHTML("beforeend", $template.outerHTML);

}

function closePopUp(){
    const $popupContainer = document.querySelector(".popup-container");
    $popupContainer.classList.add("hidden");
    if ($popupContainer.hasAttribute("data-pop-up-type")) {
        $popupContainer.removeAttribute("data-pop-up-type");
    }
    $popupContainer.innerHTML = "";
}

export { renderBuyAndReserveDevelopmentCardPopUp, renderBuyDevelopmentCardPopup, renderReserveDevelopmentCardPopup, closePopUp}
