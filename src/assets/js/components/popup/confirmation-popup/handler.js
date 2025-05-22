import * as render from "./renderer.js";
import * as helper from "./helper.js";
import {renderTokenSelectorForm} from "../gem-selector/renderer.js";

function handleClickOnCard(e) {
    document.querySelector(".popup-container").innerHTML = document.querySelector("#popup-templates").outerHTML;

    const $target = e.target.closest("article");

    if (!$target.classList.contains("disabled") && !$target.classList.contains("empty")) {

        if ($target.classList.contains("reserved")) {
            const cardName = $target.dataset.cardName;
            e.target.classList.add("selected-card");
            render.renderBuyDevelopmentCardPopup(cardName);

        } else if ($target.classList.contains("deck")) {
            const cardLevel = parseInt($target.dataset.level);
            $target.classList.add("selected-card");
            render.renderReserveDevelopmentCardPopup(cardLevel);

        } else if ($target.classList.contains("development-card")) {
            const cardName = $target.dataset.cardName;
            $target.classList.add("selected-card");
            render.renderBuyAndReserveDevelopmentCardPopUp(cardName);
        }

    }

}

// function checkIfReservedCardWasClicked(e) {
//    TODO: Make these functions work for each type of card
// }
//
// function checkIfDeckCardWasClicked(e) {
//
// }
//
// function checkIfDevelopmentCardWasClicked(e) {
//
// }


function handlePopUpClicks(e) {
    const $popupContainer = document.querySelector(".popup-container");
    let isCardLevel = false;
    if (e.target.closest(".confirm-pop-up-button")) {
        isCardLevel = true;
        handleConfirmClick($popupContainer, isCardLevel);
    } else if (e.target.closest(".cancel-pop-up-button")) {
        handleCancelClick($popupContainer, isCardLevel);
    } else if (e.target.closest(".close-pop-up-button") || e.target.closest(".popup-container") && document.querySelector(".con")) {
        handleCloseClick();
    }
}

function handleConfirmClick($popupContainer, isCardLevel) {
    const cardName = document.querySelector(".selected-card").dataset.cardName;
    const cardLevel = parseInt(document.querySelector(".selected-card").dataset.level);
    const isReservedCard = document.querySelector(".selected-card").classList.contains("reserved");

    if (helper.checkIfPopUpIsReserveType($popupContainer)) {
        helper.reserveCard(cardLevel, isCardLevel);
    } else if (helper.checkIfPopUpIsBuyAndReserveType($popupContainer) || helper.checkIfPopUpIsBuyType($popupContainer)) {
        render.closePopUp();
        renderTokenSelectorForm(cardName, isReservedCard);
        helper.removeSelectedCard();
    }
    return isCardLevel;
}

function handleCancelClick($popupContainer, isCardLevel) {
    const cardName = document.querySelector(".selected-card").dataset.cardName;
    if (helper.checkIfPopUpIsBuyAndReserveType($popupContainer)) {
        helper.reserveCard(cardName, isCardLevel);
    }
}

function handleCloseClick() {
    render.closePopUp();
    helper.removeSelectedCard();
}


export {handleClickOnCard, handlePopUpClicks};