import * as errorHandler from "../../../data-connector/error-handler.js";
import * as RenderLobbyOverview from "./renderer.js";
import * as localStorageAbstractor from "../../../data-connector/local-storage-abstractor.js";
import {getAllLobbies, joinLobby, spectateLobby} from "../../../api/game-setup-api.js";
import {renderPasswordPopup} from "./renderer.js";


function loadUserInformation() {
    RenderLobbyOverview.renderOwnPlayerName(localStorageAbstractor.loadFromStorage("playerName"));
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
        showAmountOfPlayers: document.querySelector("#amount-of-players-in-lobby-filter").value,
        showPrivate: document.querySelector("#show-private-filter").checked,
        showPublic: document.querySelector("#show-public-filter").checked
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

function matchesPrivacyFilter(game, showPrivate, showPublic) {
    if (showPrivate && !showPublic) {
        return game.private;
    } else if (!showPrivate && showPublic) {
        return !game.private;
    } else {
        return true;
    }
}

function filterGames(games, filters) {
    return games.filter(game =>
        matchesSearch(game, filters.searchValue) &&
        matchesStartedFilter(game, filters.showStarted, filters.showUnStarted) &&
        matchesJoinabilityFilter(game, filters.showFull, filters.showJoinable) &&
        matchesPlayerCountFilter(game, filters.showAmountOfPlayers) &&
        matchesPrivacyFilter(game, filters.showPrivate, filters.showPublic)
    );
}

function handleFilters(games) {
    const filters = getFilterValues();
    const filteredGames = filterGames(games, filters);
    RenderLobbyOverview.renderGames(filteredGames);
}

function handleLobbyJoinClick(e) {
    if (e.target.nodeName === "BUTTON" && e.target.classList.contains("join-button")) {
        if (e.target.closest("section").querySelector(".lobbyname").classList.contains("private")) {
            // render the password popup
            RenderLobbyOverview.renderPasswordPopup(e.target.closest(".lobby").getAttribute("data-gamename"));
        } else {
            const joinGameId = e.target.closest(".lobby").getAttribute("data-gameId");
            localStorageAbstractor.saveToStorage("gameId", joinGameId);
            localStorageAbstractor.saveToStorage("spectate", false);
            addPlayerToGame(joinGameId);
        }
    } else if (e.target.nodeName === "BUTTON" && e.target.classList.contains("spectate-button")) {
        if (e.target.closest("section").querySelector(".lobbyname").classList.contains("private")) {
            // render the password popup
            renderPasswordPopup(e.target.closest(".lobby").getAttribute("data-gamename"));
        } else {
            const joinGameId = e.target.closest(".lobby").getAttribute("data-gameId");
            localStorageAbstractor.saveToStorage("gameId", joinGameId);
            localStorageAbstractor.saveToStorage("spectate", true);
            addSpectatorToGame(joinGameId);
        }
    }
}

function addSpectatorToGame(joinGameId, numberToAddNameUniqueness = 0) {
    const spectatorName = localStorageAbstractor.loadFromStorage("playerName");
    spectateLobby(joinGameId, spectatorName).then(res => {
        redirectToLobby(res)
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
        redirectToLobby(res);
    })
    .catch((err) => {
        if (err.cause === "There already exists a player with the same name in this game."){

            numberToAddNameUniqueness++;
            uniqueNameForcer(numberToAddNameUniqueness);
            addPlayerToGame(joinGameId, numberToAddNameUniqueness);

        } else {
            const gameName = document.querySelector(`[data-gameId = "${joinGameId}"]`).getAttribute("data-gameName");
            RenderLobbyOverview.renderLobbyFullPopup(gameName, playerName);
        }
    });
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

function redirectToLobby(res){
    localStorageAbstractor.saveToStorage("playerToken", res["playerToken"]);
    window.location.assign("./lobby.html");
}

function handlePopupClick(e) {
    e.preventDefault()
    if (e.target.nodeName === "BUTTON" && e.target.classList.contains("close-lobby-full-popup")) {
        hidePopup();
    } else if (e.target.nodeName === "INPUT" && e.target.classList.contains("close-password-popup")) {
        hidePopup();
    } else if (e.target.nodeName === "INPUT" && e.target.classList.contains("join-password-popup")) {
        handleJoinPrivateLobby();
    }
}

function handleJoinPrivateLobby() {
    const password = document.querySelector("#private-lobby-password-input").value;
    console.log(password);
}

function hidePopup() {
    const $popup = document.querySelector(".popup-container:first-of-type");
    $popup.classList.add("hidden");
    $popup.innerHTML = document.querySelector(".popup-templates").outerHTML;
}

function joinDisableCheck($button, started){
    if (started){
        $button.disabled = true;
    }

}


export {
    getMatchingGames,
    handleFilters,
    handleLobbyJoinClick,
    loadUserInformation,
    joinDisableCheck,
    handlePopupClick
};