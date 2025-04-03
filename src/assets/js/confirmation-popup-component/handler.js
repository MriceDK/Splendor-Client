/*
things that need confirmation

- buy and reserve development 
- buy confirm after token selection (if necessary)
- reserve confirmation
*/
import * as render from "./renderer.js";
import * as api from "../API/api.js";

function handleClickOnCard(e) {

    if (e.target.classList.contains("reserved") && !e.target.classList.contains("disabled")) {
        const cardName = e.target.dataset.cardName;
        render.renderBuyDevelopmentCardPopup(cardName);


    } else if (e.target.classList.contains("deck") && !e.target.classList.contains("disabled")) {
        const cardLevel = parseInt(e.target.dataset.level)
        render.renderReserveDevelopmentCardPopup(cardLevel);

    } else if (e.target.classList.contains("development-card") && !e.target.classList.contains("disabled")) {
        const cardName = e.target.dataset.cardName;
        render.renderBuyAndReserveDevelopmentCardPopUp(cardName);
    }
}

function handlePopUpClicks(e) {
    const $popupContainer = document.querySelector(".popup-container");
    if (e.target.closest("#confirm-pop-up-button")) {
        if ($popupContainer.dataset.popUpType === "reserve-pop-up") {
            const cardLevel = parseInt(document.querySelector("#confirmation-popup").dataset.level);
            api.reserveCard(cardLevel, true).then(response => {
                if (response.ok) {
                    console.log(`Card from deck level ${cardLevel} reserved successfully`);
                    closePopUp(e.target);
                } else {
                    console.error("Failed to reserve card");
                    closePopUp(e.target);
                }
            });
        }
        console.log("confirm");
    } else if (e.target.closest("#cancel-pop-up-button")) {
        if ($popupContainer.dataset.popUpType === "buy-and-reserve-pop-up") {
            const cardName = document.querySelector("#confirmation-popup").dataset.cardName;
            api.reserveCard(cardName, false).then(response => {console.log(response)});
            closePopUp(e.target);
        }
    } else if (e.target.closest("#close-popup-button")) {
        closePopUp(e.target);
    }
}

function closePopUp(button){
    document.querySelector("#confirmation-pop-up-result").classList.add("hidden");
    document.querySelector(".popup-container").removeAttribute("data-pop-up-type");

    button.outerHTML = "";
}

export {handleClickOnCard, handlePopUpClicks}