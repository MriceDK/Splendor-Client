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
    const $nobleContainer = $opponentContainer.querySelector(".nobles-container")

    $nobleContainer.classList.toggle("hidden");

}

export {getOpponents, toggleVisibilityNobles};
