import * as api from "../API/api.js";
import {closePopUp} from "./renderer.js";
import {handleError} from "../data-connector/error-handler.js";
import {checkTooMuchGems} from "../own-player-component/gems-overflow-component/handler.js";
import {renderOwnTokenValue} from "../own-player-component/renderer.js";

function checkIfPopUpIsReserveType($popupContainer) {
    return $popupContainer.dataset.popUpType === "reserve-deck-pop-up";
}

function checkIfPopUpIsBuyType($popupContainer) {
    return $popupContainer.dataset.popUpType === "buy-pop-up";
}

function checkIfPopUpIsBuyAndReserveType($popupContainer) {
    return $popupContainer.dataset.popUpType === "buy-and-reserve-pop-up";
}

function handleReserveCardResponse(response) {
    closePopUp();
    removeSelectedCard();
    checkTooMuchGems(response.tokens);
    Object.entries(response.tokens).forEach((token) => {
        renderOwnTokenValue(token);
    });
}

function reserveCard(cardLevelorName, reserveFromLevel) {
        api.reserveCard(cardLevelorName, reserveFromLevel)
            .then(response => {
                if (reserveFromLevel) {
                    console.log(`Card from level ${cardLevelorName} reserved successfully`);
                } else {
                    console.log(`Card from level ${cardLevelorName} reserved successfully`);

                }
                handleReserveCardResponse(response);
            })
            .catch(error => {
                handleError(error);
            });


}



function removeSelectedCard() {
    const $selectedCard = document.querySelector(".selected-card");
    $selectedCard.classList.remove("selected-card");
}

export { checkIfPopUpIsReserveType, checkIfPopUpIsBuyType, checkIfPopUpIsBuyAndReserveType, reserveCard, removeSelectedCard };