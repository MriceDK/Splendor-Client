import {loadFromStorage} from "../../../data-connector/local-storage-abstractor.js";

const MAX_UNHIDDEN_NOBLE_CONTAINERS = 1;
let unhiddenNobleContainer = 0;

const opponentsNotHidden = [];

function getOpponents(players) {
    const ownName = loadFromStorage("playerName");
    return players.filter(player => {
        return player.name !== ownName;
    });
}

function toggleVisibilityNobles(e) {
    e.preventDefault();

    const $opponentContainer = e.target.closest(".opponent");
    const $nobleContainer = $opponentContainer.querySelector(".nobles-container");
    const opponentName = $opponentContainer.querySelector(".player").innerText;

    toggleHidden($nobleContainer, opponentName);
}

function toggleHidden($target, opponentName) {
    if ($target.classList.contains("hidden")) {

        if (unhiddenNobleContainer === MAX_UNHIDDEN_NOBLE_CONTAINERS) {
            makeEverythingHidden();
        }

        showNobleContainer($target, opponentName);

    } else {
        hideNobleContainer($target);
    }
}

function makeEverythingHidden() {
    const $nobleContainers = document.querySelectorAll(".opponent .nobles-container");

    $nobleContainers.forEach($nobleContainer => {
        hideNobleContainer($nobleContainer);
        opponentsNotHidden.pop();
    });
}

function hideNobleContainer($target) {
    $target.classList.add("hidden");
    opponentsNotHidden.pop();
    unhiddenNobleContainer = 0;
}

function showNobleContainer($target, playerName) {
    $target.classList.remove("hidden");
    opponentsNotHidden.push(playerName);
    unhiddenNobleContainer = 1;
}

export {getOpponents, toggleVisibilityNobles, opponentsNotHidden};
