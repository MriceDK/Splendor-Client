import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import * as errorHandler from "../data-connector/error-handler.js";
import * as render from "./renderer.js";
import * as helper from "./helper.js"


function getMatchingGames() {
    APIAbstractor.fetchFromServer("/games", "GET")
        .then((json) => {handleFilters(helper.addGameNames(json.games))})
        .catch(errorHandler.handleError);
}

function handleFilters(games) {
    const searchValue = document.querySelector("#searchbar").value.toLowerCase();

    const showStartedValue = document.querySelector("#show-started-filter").checked;
    const showUnStartedValue = document.querySelector("#show-unstarted-filter").checked;

    const showFullValue = document.querySelector("#show-full-filter").checked;
    const showJoinableValue = document.querySelector("#show-joinable-filter").checked;

    // const showPublicValue = document.querySelector("#show-public-filter").checked;
    // const showPrivateValue = document.querySelector("#show-private-filter").checked;

    const showAmountOfPlayers = document.querySelector("#amount-of-players-in-lobby-filter").value;

    console.log(games)
    const filteredGames = games.filter(game => {
        let matchesFilters = true;
         matchesFilters = game.gameName.includes(searchValue) && matchesFilters;
        if (showStartedValue) {
            matchesFilters = game.started && matchesFilters;
        }
        if (showUnStartedValue) {
            matchesFilters = !game.started && matchesFilters;
        }
        if (showFullValue) {
            matchesFilters = game.players.length === game.numberOfPlayers && matchesFilters;
        }
        if (showJoinableValue) {
            matchesFilters = game.players.length < game.numberOfPlayers && matchesFilters;
        }
        // TODO: get from the api if a lobby is public or secret. don't know how to do this yet
        // if (showPublicValue) {
        //     matchesFilters = true && matchesFilters;
        // }
        // if (showPrivateValue) {
        //     matchesFilters = true && matchesFilters;
        // }

        if (showAmountOfPlayers === "isAny") {
            matchesFilters = true && matchesFilters;
        } else if (parseInt(showAmountOfPlayers) === 2) {
            matchesFilters = game.numberOfPlayers === 2 && matchesFilters;
        } else if (parseInt(showAmountOfPlayers) === 3) {
            matchesFilters = game.numberOfPlayers === 3 && matchesFilters;
        } else if (parseInt(showAmountOfPlayers) === 4) {
            matchesFilters = game.numberOfPlayers === 4 && matchesFilters;

        }
        return matchesFilters;
    })
    console.log(filteredGames);
    render.renderGames(filteredGames);
}

function formSubmitPreventHandler(e) {
    e.preventDefault();
    getMatchingGames();
}

export { getMatchingGames, handleFilters, formSubmitPreventHandler}