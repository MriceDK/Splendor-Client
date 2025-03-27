import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import * as errorHandler from "../data-connector/error-handler.js";
import * as render from "./renderer.js";


function getMatchingGames() {
    APIAbstractor.fetchFromServer("/games", "GET")
        .then((json) => {handleFilters(json.games)})
        .catch(errorHandler.handleError);
}

function handleFilters(games) {
    const searchValue = document.querySelector("#searchbar").value;
    console.log(games)
    // render.renderGames();
}

function formSubmitPreventHandler(e) {
    e.preventDefault();
    getMatchingGames();
}

export { getMatchingGames, handleFilters, formSubmitPreventHandler}