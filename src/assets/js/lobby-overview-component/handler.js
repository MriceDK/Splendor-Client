import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import * as errorHandler from "../data-connector/error-handler.js";
import * as render from "./renderer.js";


function getAllGames() {
    APIAbstractor.fetchFromServer("/games", "GET")
        .then((json) => {render.renderGames(json.games)})
        .catch(errorHandler.handleError);
}

export { getAllGames }