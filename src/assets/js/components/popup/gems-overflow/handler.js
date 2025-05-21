import * as api from "../../../api/gameplay-api.js";
import * as LocalStorageAbstractor from "../../../data-connector/local-storage-abstractor.js";
import {getCurrentPlayer, uppercaseFirstLetterOfWord} from "../../../helper/utils.js";
import {renderTooManyGemsPopUp} from "./renderer.js";
import {displayGame} from "../../../game.js";
import {getGameInfo} from "../../../api/game-setup-api";

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

function countTotalTokens(allTokens) {
    let tokensOfPlayer = 0;

    Object.entries(allTokens).forEach(([_, value]) => {
        tokensOfPlayer += parseInt(value);
    });
    return tokensOfPlayer;
}

function checkTooMuchTokensHelp(player) {
    renderTooManyGemsPopUp(player.tokens);
    formGemChecker(player);
}

function formGemChecker(player) {
    const $form = document.querySelector("#too-many-gems-pop-up-form");
    const $popup = document.querySelector(".popup-container");

    $form.addEventListener("submit", e => {
        e.preventDefault();
        updateTokensAfterTooMany(LocalStorageAbstractor.loadFromStorage("gameId"), player).then(() => {
            $form.classList.add("hidden");
            $form.classList.remove("active");
            $popup.classList.add("hidden");
            displayGame()
        }).catch(() => {
            formGemChecker(player);
        })
    });
}

function countTokens() {
    const allGems = document.querySelectorAll(".gem-remover-input");
    let count = 0;
    allGems.forEach(gem => {
        count += parseInt(gem.value);
    });
    return count;
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

export {checkTooManyTokens, updateTokensAfterTooMany};