import * as getOwnInfo from "./helper.js";
import {getAllOwnPlayerTokens} from "./helper.js";
import * as NobleRenderer from "../noble/renderer.js";
import * as DevelopmentCardRenderer from "../development-card/renderer.js";
import {getPrestigePointsPercentage} from "../opponent-card/helper.js";
import {calculateTotalTokens} from "../../../helper/utils.js";

const MAX_ALLOWED_TOKENS = 10;

function ownPlayerCardRenderer(ownPlayer, spectating = false) {
    if (!spectating) {
        const $playerCard = document.querySelector("#own-player-card");

        document.querySelector("#own-username").textContent = ownPlayer.name;
        const $avatar = document.querySelector(".own-user-info img");
        $avatar.src= `assets/images/avatars/${ownPlayer.avatar.toLowerCase()}.jpg`;
        $avatar.title= ownPlayer.avatar;
        $avatar.alt= `Avatar with flag ${ownPlayer.avatar}`;
        document.querySelector("#own-prestige-points p").textContent = ownPlayer.totalPrestigePoints;
        document.querySelector("#own-player-card .points-bar").style.width = `${getPrestigePointsPercentage(ownPlayer.totalPrestigePoints)}%`;

        const $ownNobles = $playerCard.querySelector(".nobles-container");
        $ownNobles.innerHTML = "";
        NobleRenderer.renderNobles(ownPlayer.nobles, $ownNobles);
        NobleRenderer.renderEmptyNobleSpots($ownNobles);

        Object.entries(getAllOwnPlayerTokens(ownPlayer)).forEach(token => renderOwnTokenValue(token));
        Object.entries(ownPlayer.bonuses).forEach(bonus => renderOwnBonusValue(bonus));

        const $reservedCards = $playerCard.querySelector(".own-reserved-cards");
        $reservedCards.innerHTML = "";
        DevelopmentCardRenderer.renderDevelopmentCards(ownPlayer.reserve, $reservedCards, true);
        DevelopmentCardRenderer.renderEmptyDevelopmentCardSpots($reservedCards);

        checkIfMaxTokensNotificationNeedsToBeRendered(ownPlayer.tokens);
    } else {
        document.querySelector(".user-info-flexcontainer").classList.add("hidden");
    }
}

function renderOwnTokenValue(token) {
    document.querySelector(`.own-inventory .${token[0].toLowerCase()} .gem-value`).innerText = token[1];
}

function renderOwnBonusValue(bonus) {
    document.querySelector(`.own-inventory  .${bonus[0].toLowerCase()} .card-text`).innerText = bonus[1];
}

function checkIfMaxTokensNotificationNeedsToBeRendered(tokens) {
    if (calculateTotalTokens(tokens) >= MAX_ALLOWED_TOKENS) {
        document.querySelector(".max-tokens-reached-text").classList.remove("hidden");
    } else {
        document.querySelector(".max-tokens-reached-text").classList.add("hidden");
    }
}

export {ownPlayerCardRenderer, renderOwnTokenValue};