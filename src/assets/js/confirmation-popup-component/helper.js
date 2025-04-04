import * as api from "../API/api.js";
import {closePopUp} from "./renderer.js";
function checkIfPopUpIsReserveType($popupContainer) {
    return $popupContainer.dataset.popUpType === "reserve-pop-up";
}

function checkIfPopUpIsBuyType($popupContainer) {
    return $popupContainer.dataset.popUpType === "buy-pop-up";
}

function checkIfPopUpIsBuyAndReserveType($popupContainer) {
    return $popupContainer.dataset.popUpType === "buy-and-reserve-pop-up";
}

function reserveCardFromDeck(cardLevel) {
    api.reserveCard(cardLevel, true)
        .then(response => {
            console.log(`Card from level ${cardLevel} reserved successfully`);
            closePopUp();
        })
        .catch(error => {
            console.log(error)
        });
}

function reserveCard(cardName) {
    api.reserveCard(cardName, false)
        .then(response => {
            console.log(`Card from level ${cardName} reserved successfully`);
            closePopUp();
        })
        .catch(error => {
            console.log(error)
        });
}

function removeSelectedCard() {
    const $selectedCard = document.querySelector(".selected-card");
    $selectedCard.classList.remove("selected-card");
}

export { checkIfPopUpIsReserveType, checkIfPopUpIsBuyType, checkIfPopUpIsBuyAndReserveType, reserveCardFromDeck, reserveCard, removeSelectedCard };