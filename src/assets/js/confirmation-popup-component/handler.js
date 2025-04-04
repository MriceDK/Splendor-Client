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
    // TODO: make the rest of the card clickable
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
    const isReservedCard = document.querySelector(".selected-card").classList.contains("reserved")


    if (e.target.closest("#confirm-pop-up-button")) {
        if (helper.checkIfPopUpIsReserveType($popupContainer)) {
            helper.reserveCardFromDeck(cardLevel);
        } else if (helper.checkIfPopUpIsBuyAndReserveType($popupContainer) || helper.checkIfPopUpIsBuyType($popupContainer)) {
            render.closePopUp();
            renderTokenSelectorForm(cardName, isReservedCard);
            console.log("buy and reserve");
        }
    } else if (e.target.closest("#cancel-pop-up-button")) {
        if (helper.checkIfPopUpIsBuyAndReserveType($popupContainer)) {
            helper.reserveCard(cardName);
        } else if (helper.checkIfPopUpIsBuyType($popupContainer)) {
            render.closePopUp();
        }
    } else if (e.target.closest("#close-popup-button")) {
        render.closePopUp();
    }
    helper.removeSelectedCard();

}






export {handleClickOnCard, handlePopUpClicks};