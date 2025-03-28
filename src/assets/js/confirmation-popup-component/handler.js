/*
things that need confirmation

- buy and reserve development 
- buy confirm after token selection (if necessary)
- reserve confirmation
*/

import {renderBuyDevelopmentCardPopup, renderReserveDevelopmentCardPopup, renderBuyAndReserveDevelopmentCardPopUp } from "./renderer.js";

function getClickForPopUpOrigin(e){
    e.stopPropagation();
    e.preventDefault();
    if (e.currentTarget.getAttribute("id") === "buy-development-card"){
        renderBuyDevelopmentCardPopup();
    } else if (e.currentTarget.getAttribute("id") === "reserve-development-card"){
        renderReserveDevelopmentCardPopup();
    } else if (e.currentTarget.getAttribute("id") === "buy-and-reserve-development-card"){
        renderBuyAndReserveDevelopmentCardPopUp();
    }
}

export { getClickForPopUpOrigin }