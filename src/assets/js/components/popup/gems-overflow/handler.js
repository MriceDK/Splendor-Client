import * as api from "../../../api/gameplay-api.js";
import * as LocalStorageAbstractor from "../../../data-connector/local-storage-abstractor.js";
import {uppercaseFirstLetterOfWord} from "../../../helper/utils.js";
import {renderTooManyGemsPopUp} from "./renderer.js";
import {displayGame} from "../../../game.js";
import {getGameInfo} from "../../../api/game-setup-api.js";
import {handleError} from "../../../data-connector/error-handler.js";

const MAX_TOKENS = 10;

function immediateTokenCheckAfterTokenUpdate(gameState, currentPlayer, ownPlayer){
     if (gameState === "ReturnGems" && currentPlayer === ownPlayer.name) {
         checkTooManyTokens(ownPlayer);
     }
}

function checkTooManyTokens(player) {
    renderTooManyGemsPopUp(player.tokens);

    const $form = document.querySelector("#too-many-gems-pop-up-form");
    $form.addEventListener("submit", e => updateAndDisplay(e, player));
}

function updateAndDisplay(e, player) {
    e.preventDefault();
    const $form = document.querySelector("#too-many-gems-pop-up-form");
    const $popup = document.querySelector(".popup-container");

    updateTokensAfterTooMany(LocalStorageAbstractor.loadFromStorage("gameId"), player).then(() => {
        $popup.classList.add("hidden");
        $form.remove();
        displayGame()

    }).catch(error => {
        handleError(error);
    })
}

function updateTokensAfterTooMany(gameId, player) {
    const tokensToReturn = getDiffTokensObject(player.tokens);
    const body = returnTokensBody(tokensToReturn);
    return api.updateTokens(gameId, player.name, body);
}

function getDiffTokensObject(tokens) {
    const returnObject = {};
    const $tokensForm = document.querySelectorAll(".gem-remover-input");
    $tokensForm.forEach(token => {
        const tokenName = uppercaseFirstLetterOfWord(token.getAttribute("name"));
        returnObject[tokenName] = tokens[tokenName] - parseInt(token.value);
    });
    return returnObject;
}

function returnTokensBody(tokensToReturn) {
    const returnObj = {};
    Object.entries(tokensToReturn).forEach(token => {
        const tokenName = token[0];
        const tokenValue = tokensToReturn[tokenName];
        if (tokenValue > 0) {
            returnObj[tokenName.toString()] = tokenValue;
        }

    });
    return {
        "return": returnObj

    };
}

export {checkTooManyTokens, updateTokensAfterTooMany, updateAndDisplay, immediateTokenCheckAfterTokenUpdate};