import * as handler from "./handler.js";
import * as NobleRenderer from "../noble/renderer.js";
import {getPrestigePointsPercentage} from "./helper.js";
import {opponentsNotHidden} from "../../../game.js";

function renderOpponentsStats(players) {
    const opponents = handler.getOpponents(players);
    document.querySelector(".username-flexcontainer").innerHTML = document.querySelector("#opponent-template").outerHTML;
    opponents.forEach(opponent => renderOpponentStats(opponent));
}

function renderOpponentStats(opponent) {
    const $template = document.querySelector("#opponent-template").content.firstElementChild.cloneNode(true);
    const $target = document.querySelector(".username-flexcontainer");

    fillOpponentStat($template, opponent);
    $target.insertAdjacentHTML("beforeend", $template.outerHTML);
}

function fillOpponentStat($template, opponent) {
    $template.querySelector(".player").innerText = opponent.name;
    $template.querySelector(".points-text").innerText = opponent.totalPrestigePoints;
    $template.querySelector(".points-bar").style.width = `${getPrestigePointsPercentage(opponent.totalPrestigePoints)}%`;
    $template.querySelector(".reserved-count").innerText = opponent.reserve.length;

    fillTokens($template, opponent.tokens);
    fillBonuses($template, opponent.bonuses);

    const $nobleContainer = $template.querySelector(".nobles-container");
    NobleRenderer.renderNobles(opponent.nobles, $nobleContainer);
    NobleRenderer.renderEmptyNobleSpots($nobleContainer);

    makeNobleContainerVisible($nobleContainer, opponent.name);
}

function makeNobleContainerVisible($nobleContainer, opponentNameToBeChecked) {
    opponentsNotHidden.forEach(opponentName => {

        if (opponentNameToBeChecked === opponentName) {
            $nobleContainer.classList.remove("hidden");
        }

    })
}

function fillTokens($template, tokens) {
    Object.entries(tokens).forEach((obj) => {
        const tokenName = obj[0];
        $template.querySelector(`.gem.${tokenName.toLowerCase()} .gem-value`).innerText = obj[1];
    })
}

function fillBonuses($template, bonuses) {
    Object.entries(bonuses).forEach((obj) => {
        const tokenName = obj[0];
        $template.querySelector(`.card.${tokenName.toLowerCase()} .card-text`).innerText = obj[1];
    })
}

export {renderOpponentsStats};

