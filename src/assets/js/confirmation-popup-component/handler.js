/*
things that need confirmation

- buy and reserve development 
- buy confirm after token selection (if necessary)
- reserve confirmation
*/
import * as render from "./renderer.js";

function handleClickOnCard(e) {

    if (e.target.classList.contains("reserved") && !e.target.classList.contains("disabled")) {
        const cardName = e.target.dataset.cardName;
        render.renderBuyDevelopmentCardPopup(cardName);

    } else if (e.target.classList.contains("deck") && !e.target.classList.contains("disabled")) {
        render.renderReserveDevelopmentCardPopup();

    } else if (e.target.classList.contains("development-card") && !e.target.classList.contains("disabled")) {
        const cardName = e.target.dataset.cardName;
        render.renderBuyAndReserveDevelopmentCardPopUp(cardName);
    }
}

function handlePopUpClicks(e) {
    if (e.target.closest("#confirm-pop-up-button")) {
        console.log("confirm");
    } else if (e.target.closest("#cancel-pop-up-button")) {
        console.log("cancel");
    } else if (e.target.closest("#close-popup-button")) {
        closePopUp(e.target);
    }
}

function closePopUp(button){
    document.querySelector(".popup-container").classList.add("hidden");
    document.querySelector(".popup-container").removeAttribute("data-pop-up-type");

    button.outerHTML = "";
}

export {handleClickOnCard, handlePopUpClicks}