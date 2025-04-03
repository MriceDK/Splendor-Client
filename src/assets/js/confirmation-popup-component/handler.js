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
    const cardName = document.querySelector("#confirmation-popup").dataset.cardName;
    const cardLevel = parseInt(document.querySelector("#confirmation-popup").dataset.level);


    if (e.target.closest("#confirm-pop-up-button")) {
        if (checkIfPopUpIsReserveType($popupContainer)) {
            api.reserveCard(cardLevel, true)
                .then(response => {
                    console.log(`Card from level ${cardLevel} reserved successfully`);
                    closePopUp(e.target);})
                .catch(error => {console.log(error)});
        } else
            if (checkIfPopUpIsBuyAndReserveType($popupContainer)) {
            api.buyCard(cardName).then(response => {
                    console.log(`Card ${cardName} bought successfully`);
                    closePopUp(e.target);
            })
                .catch(error => {console.log(error)});
        } else
            if (checkIfPopUpIsBuyType($popupContainer)) {
            api.buyCard(cardName).then(response => {
                    console.log(`Card ${cardName} bought successfully`);
                    closePopUp(e.target);
            })
                .catch(error => {console.log(error)});
        }
    } else if (e.target.closest("#cancel-pop-up-button")) {
        if (checkIfPopUpIsBuyAndReserveType($popupContainer)) {
            api.reserveCard(cardName, false)
                .then(response => {
                    console.log(`Card from level ${cardName} reserved successfully`);
                    closePopUp(e.target);})
                .catch(error => {console.log(error)});
        } else if (checkIfPopUpIsBuyType($popupContainer)) {
            closePopUp(e.target);
        }
    } else if (e.target.closest("#close-popup-button")) {
        closePopUp(e.target);
    }
}

// TODO: Move these checkIfPopUpIs...Type functions to helper file
function checkIfPopUpIsReserveType($popupContainer) {
    return $popupContainer.dataset.popUpType === "reserve-pop-up";
}

function checkIfPopUpIsBuyType($popupContainer) {
    return $popupContainer.dataset.popUpType === "buy-pop-up";
}

function checkIfPopUpIsBuyAndReserveType($popupContainer) {
    return $popupContainer.dataset.popUpType === "buy-and-reserve-pop-up";
}


function closePopUp(button){
    document.querySelector(".popup-container").classList.add("hidden");
    document.querySelector(".popup-container").removeAttribute("data-pop-up-type");

    button.outerHTML = "";
}

export {handleClickOnCard, handlePopUpClicks}