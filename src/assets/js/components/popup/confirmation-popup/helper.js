import * as api from "../../../api/gameplay-api.js";
import {closePopUp} from "./renderer.js";
import {handleError} from "../../../data-connector/error-handler.js";
import {renderOwnTokenValue} from "../../gameplay/own-player/renderer.js";
import {displayGame} from "../../../game.js";
import {immediateTokenCheckAfterTokenUpdate} from "../too-much-gems-popup/handler.js";
import {getGameInfo} from "../../../api/game-setup-api.js";
import * as renderer from "../../../components/gameplay/bank/renderer.js"

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
                console.log(`${cardLevelorName} reserved successfully`);

            }
            handleReserveCardResponse(response);
        }).then(() => {
            getGameInfo().then(res => {
                displayGame();
                renderer.resetBankButtons();
            })

        }).catch(error => {
            handleError(error);
        });


}


function removeSelectedCard() {
    const $selectedCard = document.querySelector(".selected-card");
    $selectedCard.classList.remove("selected-card");
}

export {
    checkIfPopUpIsReserveType,
    checkIfPopUpIsBuyType,
    checkIfPopUpIsBuyAndReserveType,
    reserveCard,
    removeSelectedCard
};