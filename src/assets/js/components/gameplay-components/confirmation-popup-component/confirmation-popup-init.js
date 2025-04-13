import * as handler from "./handler.js";

function init(){

    //every case (3 in total) needs an eventlistener with document.querySelector("selector").("onclick", getClickForPopUpOrigin);
    document.querySelector(".market-grid-container").addEventListener("click", handler.handleClickOnCard);
    document.querySelector(".popup-container").addEventListener("click", handler.handlePopUpClicks);
}

init();