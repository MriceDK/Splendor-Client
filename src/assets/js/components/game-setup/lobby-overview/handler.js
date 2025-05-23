import * as errorHandler from "../../../data-connector/error-handler.js";
import * as render from "./renderer.js";
import * as localStorageAbstractor from "../../../data-connector/local-storage-abstractor.js";
import {getAllLobbies, joinLobby, spectateLobby} from "../../../api/game-setup-api.js";


function loadUserInformation() {
    render.renderOwnPlayerName(localStorageAbstractor.loadFromStorage("playerName"));
}

function getMatchingGames() {
    getAllLobbies()
        .then((res) => {
            handleFilters(addGameName(res.games));
            setTimeout(getMatchingGames, 1000);
        })
        .catch(errorHandler.handleError);
}

function addGameName(games) {
    games.forEach(game => {
        if (game.gameName === null || game.gameName === "") {
            game.gameName = game.players[0] + "'s lobby";
        }
    });
    return games;
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
    } else {
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

function handleLobbyJoinClick(e) {
    if (e.target.nodeName === "BUTTON" && e.target.classList.contains("join-button")) {
        const joinGameId = e.target.closest(".lobby").getAttribute("data-gameId");
        localStorageAbstractor.saveToStorage("gameId", joinGameId);
        localStorageAbstractor.saveToStorage("spectate", false);
        addPlayerToGame(joinGameId);        
    } else if (e.target.nodeName === "BUTTON" && e.target.classList.contains("spectate-button")) {
        const joinGameId = e.target.closest(".lobby").getAttribute("data-gameId");
        localStorageAbstractor.saveToStorage("gameId", joinGameId);
        localStorageAbstractor.saveToStorage("spectate", true);
        addSpectatorToGame(joinGameId);
    }

}

function addSpectatorToGame(joinGameId, numberToAddNameUniqueness = 0) {
    const spectatorName = localStorageAbstractor.loadFromStorage("playerName");
    spectateLobby(joinGameId, spectatorName).then(res => {
        joinLobbyHelp(res)
    }).catch(() => {
        numberToAddNameUniqueness++;
        uniqueNameForcer(numberToAddNameUniqueness);
        addSpectatorToGame(joinGameId, numberToAddNameUniqueness);
    })
}

function addPlayerToGame(joinGameId, numberToAddNameUniqueness = 0) {
    const playerName = localStorageAbstractor.loadFromStorage("playerName");
    joinLobby(joinGameId, playerName)
    .then(res => {
        joinLobbyHelp(res);
    })
    .catch(() => {
        numberToAddNameUniqueness++;
        uniqueNameForcer(numberToAddNameUniqueness);
        addPlayerToGame(joinGameId, numberToAddNameUniqueness);
        }
    );
}


function uniqueNameForcer(n){

    const playerName = localStorageAbstractor.loadFromStorage("playerName");
    const resettedPlayerName = playerName.substring(0, playerName.length - 1);
    let newPlayerName = `${resettedPlayerName}${n}`;
    if (n === 1){
        newPlayerName = `${playerName}${n}`;

    }
    localStorageAbstractor.saveToStorage("playerName", newPlayerName);
}

function joinLobbyHelp(res){

    localStorageAbstractor.saveToStorage("playerToken", res["playerToken"]);
    window.location.assign("./lobby.html");


}

export {getMatchingGames, handleFilters, handleLobbyJoinClick, loadUserInformation};