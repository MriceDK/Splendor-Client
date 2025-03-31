/*
things that need confirmation

- buy and reserve development 
- buy confirm after token selection (if necessary)
- reserve confirmation
*/

// TODO: THIS IS GLUE, order for it to work it needs to be glued to other function which are contained in other issues

import {renderBuyDevelopmentCardPopup, renderReserveDevelopmentCardPopup, renderBuyAndReserveDevelopmentCardPopUp } from "./renderer.js";

function getClickForPopUpOrigin(e){
    e.stopPropagation();
    e.preventDefault();
    if (e.target.getAttribute("id") === "buy-development-card"){
    if (e.target.classList.contains("reserved")){
        renderBuyDevelopmentCardPopup();
    } else if (e.target.classList.contains("deck")){
        renderReserveDevelopmentCardPopup();
    } else if (e.target.classList.contains("development-card")){
        renderBuyAndReserveDevelopmentCardPopUp();
    }
}

export { getClickForPopUpOrigin }