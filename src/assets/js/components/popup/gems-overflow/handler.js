import * as api from "../../../api/gameplay-api.js";
import * as LocalStorageAbstractor from "../../../data-connector/local-storage-abstractor.js";
import {getCurrentPlayer, uppercaseFirstLetterOfWord} from "../../../helper/utils.js";
import {renderTooManyGemsPopUp} from "./renderer.js";
import {displayGame} from "../../../game.js";
import {getGameInfo} from "../../../api/game-setup-api.js";
import {handleError} from "../../../data-connector/error-handler.js";

const MAX_TOKENS = 10;

function immediateTokenCheckAfterTokenUpdate(){
    getGameInfo().then(result => {
        const gameState = result.gameState;
        if (gameState === "ReturnGems"){
            checkTooManyTokens(result.players, result.currentPlayer);
        }
    })
}
function checkTooManyTokens(playersInfos, currentPlayer) {
    const currentPlayerChecked = getCurrentPlayer(playersInfos, currentPlayer);
    if (LocalStorageAbstractor.loadFromStorage("playerName") === currentPlayerChecked.name) {
        checkTooMuchTokensHelp(currentPlayerChecked);
    }
}

function checkTooMuchTokensHelp(player) {
    const $form = renderTooManyGemsPopUp(player.tokens);
    hookUpEventListenerOnTooMuchGemsForm($form, player);

}

function hookUpEventListenerOnTooMuchGemsForm($form, player) {
    const $popup = document.querySelector(".popup-container");
    console.log(player.name);

    $form.addEventListener("submit", e => {updateAndDisplay(e, player, $form, $popup)});
}

function updateAndDisplay(e, player, $form, $popup) {
    e.preventDefault();
    console.log(player);
    updateTokensAfterTooMany(LocalStorageAbstractor.loadFromStorage("gameId"), player).then(() => {
        console.log("TEST");
        $popup.classList.add("hidden");
        $form.remove();
        displayGame()

    }).catch(error => {
        console.log(error);
        handleError(error);
    })
}

function updateTokensAfterTooMany(gameId, player) {
    const tokensToReturn = getDiffTokensObject(player.tokens);
    const body = returnTokensBody(tokensToReturn);
    console.log(body);
    return api.updateTokens(gameId, player.name, body).then(() => {displayGame();});
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