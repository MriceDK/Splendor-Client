/*
things that need confirmation

- buy and reserve development 
- buy confirm after token selection (if necessary)
- reserve confirmation
*/
import * as render from "./renderer.js";
import * as helper from "./helper.js";
import {renderTokenSelectorForm} from "../gem-selector-component/renderer.js";

function handleClickOnCard(e) {
    document.querySelector(".popup-container").innerHTML = "";
    // TODO: make the rest of the card clickable
    if (e.target.classList.contains("reserved")) {
        const cardName = e.target.dataset.cardName;
        e.target.classList.add("selected-card");
        render.renderBuyDevelopmentCardPopup(cardName);

    } else if (e.target.classList.contains("deck")) {
        const cardLevel = parseInt(e.target.dataset.level)
        e.target.classList.add("selected-card");
        render.renderReserveDevelopmentCardPopup(cardLevel);

    } else if (e.target.classList.contains("development-card")) {
        const cardName = e.target.dataset.cardName;
        e.target.classList.add("selected-card");
        render.renderBuyAndReserveDevelopmentCardPopUp(cardName);
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

    if (e.target.closest(".confirm-pop-up-button")) {
        const cardName = document.querySelector(".selected-card").dataset.cardName;
        const cardLevel = parseInt(document.querySelector(".selected-card").dataset.level);
        const isReservedCard = document.querySelector(".selected-card").classList.contains("reserved");
        if (helper.checkIfPopUpIsReserveType($popupContainer)) {
            helper.reserveCardFromDeck(cardLevel);
        } else if (helper.checkIfPopUpIsBuyAndReserveType($popupContainer) || helper.checkIfPopUpIsBuyType($popupContainer)) {
            render.closePopUp();
            renderTokenSelectorForm(cardName, isReservedCard);
            helper.removeSelectedCard();
        }
    } else if (e.target.closest(".cancel-pop-up-button")) {
        const cardName = document.querySelector(".selected-card").dataset.cardName;
        if (helper.checkIfPopUpIsBuyAndReserveType($popupContainer)) {
            helper.reserveCard(cardName);
        }
    } else if (e.target.closest(".close-pop-up-button") || e.target.closest(".popup-container") && document.querySelector(".con")) {
        render.closePopUp();
    }
}


export {handleClickOnCard, handlePopUpClicks};