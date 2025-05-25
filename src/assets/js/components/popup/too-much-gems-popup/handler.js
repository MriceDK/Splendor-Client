import * as api from "../../../api/gameplay-api.js";
import * as LocalStorageAbstractor from "../../../data-connector/local-storage-abstractor.js";
import {renderTooManyGemsPopUp, updatePopupTokens} from "./renderer.js";
import {displayGame} from "../../../game.js";
import {handleError} from "../../../data-connector/error-handler.js";
import {getDiffTokensObject, returnTokensBody, disableOrEnableGems} from "./helper.js";
import {showChosenBankToken} from "../../gameplay/bank/renderer.js";
import {uppercaseFirstLetterOfWord} from "../../../helper/utils.js";

function immediateTokenCheckAfterTokenUpdate(gameState, currentPlayer, ownPlayer){
     if (gameState === "RETURN_GEMS" && currentPlayer === ownPlayer.name) {
         checkTooManyTokens(ownPlayer);
     }
}

function checkTooManyTokens(player) {
    renderTooManyGemsPopUp(player.tokens);

    const $form = document.querySelector("#too-many-gems-pop-up-form");
    $form.addEventListener("submit", e => updateAndDisplay(e, player));

    $form.querySelectorAll(".token-bank li").forEach(li => li.addEventListener("click", removeOwnToken));
    disableOrEnableGems();

}

function updateAndDisplay(e, player) {
    e.preventDefault();
    const $form = document.querySelector("#too-many-gems-pop-up-form");
    const $popup = document.querySelector(".popup-container");

    updateTokensAfterTooMany(LocalStorageAbstractor.loadFromStorage("gameId"), player).then(() => {
        $popup.classList.add("hidden");
        $form.remove();
        displayGame();

    }).catch(error => {
        handleError(error);
    })
}

function updateTokensAfterTooMany(gameId, player) {
    const tokensToReturn = getDiffTokensObject(player.tokens);
    const body = returnTokensBody(tokensToReturn);
    return api.updateTokens(gameId, player.name, body);
}

function removeOwnToken(e) {
    const $tokenType = e.target.closest(".gem");
    const $tokenValue = $tokenType.querySelector(".gem-value");

    if ($tokenType.classList.contains("clickable")) {
        showChosenBankToken(uppercaseFirstLetterOfWord($tokenType.classList[1]), true);
        updatePopupTokens($tokenValue);
    }


}

export {checkTooManyTokens, updateTokensAfterTooMany, updateAndDisplay, immediateTokenCheckAfterTokenUpdate};