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
    document.querySelector("#confirmation-pop-up-result").classList.remove("hidden");

    if (e.target.classList.contains("reserved") && !e.target.classList.contains("disabled")) {
        const cardName = e.target.dataset.cardName;
        e.target.classList.add("selected-card");
        render.renderBuyDevelopmentCardPopup(cardName);

    } else if (e.target.classList.contains("deck") && !e.target.classList.contains("disabled")) {
        const cardLevel = parseInt(e.target.dataset.level)
        e.target.classList.add("selected-card");
        render.renderReserveDevelopmentCardPopup(cardLevel);

    } else if (e.target.classList.contains("development-card") && !e.target.classList.contains("disabled")) {
        const cardName = e.target.dataset.cardName;
        e.target.classList.add("selected-card");
        render.renderBuyAndReserveDevelopmentCardPopUp(cardName);
    }
}




function handlePopUpClicks(e) {
    const $popupContainer = document.querySelector(".popup-container");

    const cardName = document.querySelector(".selected-card").dataset.cardName;
    const cardLevel = parseInt(document.querySelector(".selected-card").dataset.level);

    if (e.target.closest("#confirm-pop-up-button")) {
        if (helper.checkIfPopUpIsReserveType($popupContainer)) {
            helper.reserveCardDeck(cardLevel);
            closePopUp();
        } else
            if (helper.checkIfPopUpIsBuyAndReserveType($popupContainer)) {
                closePopUp();
                renderTokenSelectorForm(cardName, document.querySelector(".selected-card").classList.contains("reserved"));
            } else
            if (helper.checkIfPopUpIsBuyType($popupContainer)) {
                closePopUp();
                renderTokenSelectorForm(cardName, document.querySelector(".selected-card").classList.contains("reserved"));
            }
    } else if (e.target.closest("#cancel-pop-up-button")) {
        if (helper.checkIfPopUpIsBuyAndReserveType($popupContainer)) {
            helper.reserveCard(cardName);
            closePopUp();
        } else if (helper.checkIfPopUpIsBuyType($popupContainer)) {
            closePopUp();
        }
    } else if (e.target.closest("#close-popup-button")) {
        closePopUp();
    }
    helper.removeSelectedCard();

}




function closePopUp(){
    document.querySelector(".popup-container").classList.add("hidden");
    document.querySelector(".popup-container").removeAttribute("data-pop-up-type");
    document.querySelector("#confirmation-pop-up-result").innerHTML = "";
    document.querySelector("#confirmation-pop-up-result").classList.add("hidden");

    if (document.querySelector(".popup-token-selector")) {
        document.querySelector(".popup-token-selector").outerHTML = "";
    }
}

export {handleClickOnCard, handlePopUpClicks, closePopUp};