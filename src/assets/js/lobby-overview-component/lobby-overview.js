import * as handler from "./handler.js";



function init() {
    handler.getMatchingGames();
    document.querySelector("#filter").addEventListener("submit", handler.formSubmitPreventHandler);

}

init();