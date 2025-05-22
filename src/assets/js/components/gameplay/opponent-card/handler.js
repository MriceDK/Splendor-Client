import {loadFromStorage} from "../../../data-connector/local-storage-abstractor.js";

const MAX_UNHIDDEN_NOBLE_CONTAINERS = 1;
let unhiddenNobleContainer = 0;

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
    toggleHidden($nobleContainer);
}

function toggleHidden($target) {
    if ($target.classList.contains("hidden")) {

        if (unhiddenNobleContainer === MAX_UNHIDDEN_NOBLE_CONTAINERS) {
            makeEverythingHidden();
        }

        showNobleContainer($target);

    } else {
        hideNobleContainer($target);
    }
}

function makeEverythingHidden() {
    const $nobleContainers = document.querySelectorAll(".opponent .nobles-container");

    $nobleContainers.forEach($nobleContainer => {
        hideNobleContainer($nobleContainer);
    });
}

function hideNobleContainer($target) {
    $target.classList.add("hidden");
    unhiddenNobleContainer = 0;
}

function showNobleContainer($target) {
    $target.classList.remove("hidden");
    unhiddenNobleContainer = 1;
}

export {getOpponents, toggleVisibilityNobles};
