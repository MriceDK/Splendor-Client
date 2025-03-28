import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import * as errorHandler from "../data-connector/error-handler.js";
import * as render from "./renderer.js";
import * as helper from "./helper.js";
import * as localStorageAbstractor from "../data-connector/local-storage-abstractor.js";


function getMatchingGames() {
    APIAbstractor.fetchFromServer("/games", "GET")
        .then((json) => {handleFilters(helper.addGameNames(json.games))
        setTimeout(getMatchingGames, 2000)})
        .catch(errorHandler.handleError);
}

function getFilterValues() {
    return {
        searchValue: document.querySelector("#searchbar").value.toLowerCase(),
        showStarted: document.querySelector("#show-started-filter").checked,
        showUnStarted: document.querySelector("#show-unstarted-filter").checked,
        showFull: document.querySelector("#show-full-filter").checked,
        showJoinable: document.querySelector("#show-joinable-filter").checked,
        showAmountOfPlayers: document.querySelector("#amount-of-players-in-lobby-filter").value
    };
}

function matchesSearch(game, searchValue) {
    return game.gameName.toLowerCase().includes(searchValue);
}

function matchesStartedFilter(game, showStarted, showUnStarted) {
    if (showStarted && !showUnStarted) {
        return game.started;

    } else if (!showStarted && showUnStarted) {
        return !game.started;
    } else {
        return true;
    }
}

function matchesJoinabilityFilter(game, showFull, showJoinable) {
    if (showFull && !showJoinable) {
        return game.players.length === game.numberOfPlayers;
    } else if (!showFull && showJoinable) {
        return game.players.length < game.numberOfPlayers;
    } else {
        return true;
    }
}

function matchesPlayerCountFilter(game, showAmountOfPlayers) {
    if (showAmountOfPlayers === "isAny") {
        return true;
    }else {
        return game.numberOfPlayers === parseInt(showAmountOfPlayers);
    }
}

function filterGames(games, filters) {
    return games.filter(game =>
        matchesSearch(game, filters.searchValue) &&
        matchesStartedFilter(game, filters.showStarted, filters.showUnStarted) &&
        matchesJoinabilityFilter(game, filters.showFull, filters.showJoinable) &&
        matchesPlayerCountFilter(game, filters.showAmountOfPlayers)
    );
}

function handleFilters(games) {
    const filters = getFilterValues();
    const filteredGames = filterGames(games, filters);
    render.renderGames(filteredGames);
}


function formSubmitPreventHandler(e) {
    e.preventDefault();
    getMatchingGames();
}

function handleLobbyJoinClick(e) {
    if (e.target.nodeName === "BUTTON" && e.target.classList.contains("join-button")) {
        const joinGameId = e.target.closest(".lobby").getAttribute("data-gameId");

        localStorageAbstractor.saveToStorage("gameId", parseInt(e.target.closest(".lobby").getAttribute("data-gameId")))
        addPlayerToGame(joinGameId);
    }

}

function addPlayerToGame(joinGameId) {
    const playerName = localStorageAbstractor.loadFromStorage("myUsername")
    APIAbstractor.fetchFromServer(`/games/${joinGameId}/players/${playerName}`, "POST")
}

export { getMatchingGames, handleFilters, formSubmitPreventHandler, handleLobbyJoinClick};