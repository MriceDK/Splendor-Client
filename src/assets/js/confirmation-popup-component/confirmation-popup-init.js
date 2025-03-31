import { getClickForPopUpOrigin } from "./handler.js";

    /*
things that need confirmation

- buy and reserve development 
- buy confirm after token selection (if necessary)
- reserve confirmation


*/

function init(){

    //every case (3 in total) needs an eventlistener with document.querySelector("selector").("onclick", getClickForPopUpOrigin);
    document.querySelector(".market-grid-container").addEventListener("click", getClickForPopUpOrigin)
}

init();