import * as api from "../../../api/gameplay-api.js";
import * as LocalStorageAbstractor from "../../../data-connector/local-storage-abstractor.js";
import {uppercaseFirstLetterOfWord} from "../../../helper/utils.js";
import {renderTooManyGemsPopUp} from "./renderer.js";
import {displayGame} from "../../../game.js";
import {closePopUp} from "../confirmation-popup/renderer";

const MAX_TOKENS = 10;

function returnTooManyTokens(currentPlayer) {
    const tokens = countTotalTokens(currentPlayer.tokens);
    renderTooManyGemsPopUp(currentPlayer.tokens);
    const $form = document.querySelector("#too-many-gems-pop-up-form");
    $form.classList.add("active");
    if ($form.classList.contains("active")) {
        formGemChecker(currentPlayer);
    }

    if (countTotalTokens(tokens) === MAX_TOKENS) {
        updateTokensAfterTooMany().then(() => {
            document.querySelector("#too-many-gems-pop-up-form").remove();
        }).then(() => {
            displayGame();
            $form.remove();
            $form.classList.remove("active");
        });
    }



}

function checkTooManyTokens(gameState, currentPlayer) {
    if (gameState === "RETURN_GEMS" && countTotalTokens(currentPlayer.tokens) > MAX_TOKENS) {
        triggerTooMuchGemsPopup(currentPlayer);

    }


}


function countTotalTokens(allTokens) {
    let tokensOfPlayer = 0;

    Object.entries(allTokens).forEach(([_, value]) => {
        tokensOfPlayer += parseInt(value);
    });
    return tokensOfPlayer;
}

function triggerTooMuchGemsPopup(player) {
    renderTooManyGemsPopUp();
    const $form = document.querySelector("#too-many-gems-pop-up-form");
    $form.classList.add("active");
    const $submitButton = document.querySelector("#gem-remover-button");
    const interval = setInterval(() => {
        const totalSelected = countTokensFromForm();
        $submitButton.disabled = totalSelected !== MAX_TOKENS;
    }, 500)
    document.querySelector("#gem-remover-button").disabled = false;
    $form.addEventListener("submit", e => {
        e.preventDefault();
        const gameId = LocalStorageAbstractor.loadFromStorage("gameId");

        if (countTokensFromForm() === MAX_TOKENS) {
            updateTokensAfterTooMany(gameId, player).then( () => {
                clearInterval(interval);
                closePopUp($form);
                displayGame();
            });
        }
    });
}

function countTokensFromForm() {
    const inputs = document.querySelectorAll(".gem-remover-input");
    return Array.from(inputs).reduce((sum, input) => sum + parseInt(input.value || 0), 0);
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
        returnObject[tokenName] = tokens[tokenName] - parseInt(token.value || 0);
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

export {checkTooManyTokens, updateTokensAfterTooMany, returnTooManyTokens};