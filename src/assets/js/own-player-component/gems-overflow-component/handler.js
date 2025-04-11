import {renderTooManyGemsPopUp} from "../renderer.js";
import * as APIAbstractor from "../../data-connector/api-communication-abstractor.js";
import * as LocalStorageAbstractor from "../../data-connector/local-storage-abstractor.js";
import {uppercaseFirstLetterOfWord} from "../../helper/utils.js";

const MAX_TOKENS = 10;

function checkTooManyTokens(playersInfos, currentPlayer) {
    playersInfos.forEach(player => {
        if (player.name === currentPlayer) {
            checkTooMuchTokensHelp(player);

        }
    });

}

// TODO: Implement this functionality later not important RN
function countTotalTokens(allTokens) {
    let tokensOfPlayer = 0;

    Object.entries(allTokens).forEach(([_, value]) => {
        tokensOfPlayer += parseInt(value);
    });
    return tokensOfPlayer;
}

function checkTooMuchTokensHelp(player) {
    const tokensOfPlayer = countTotalTokens(player.tokens);
    if (tokensOfPlayer > MAX_TOKENS) {
        renderTooManyGemsPopUp(player.tokens);
        formGemChecker(player);
    }
}

function formGemChecker(player) {
    const gemsCount = counTokens();
    if (gemsCount > MAX_TOKENS) {
        document.querySelector("#gem-remover-button").disabled = true;
    } else {
        document.querySelector("#gem-remover-button").disabled = false;
        document.querySelector("#too-many-gems-pop-up-form").addEventListener("submit", e => {
            e.preventDefault();
            updateTokensAfterTooMany(LocalStorageAbstractor.loadFromStorage("gameId"), player).then(() => {
                document.querySelector("#too-many-gems-pop-up-form").remove();
            });
        });
    }
    if (document.querySelector("#too-many-gems-pop-up-form")) {
        setTimeout(() => formGemChecker(player), 1000);
    }
}

function counTokens() {
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
    return APIAbstractor.fetchFromServer(`/games/${gameId}/players/${player.name}/tokens`, "PATCH", body);


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