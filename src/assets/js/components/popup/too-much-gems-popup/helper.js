import {uppercaseFirstLetterOfWord} from "../../../helper/utils.js";

function getDiffTokensObject(tokens) {
    const returnObject = {};
    const $tokenValues = document.querySelectorAll("#too-many-gems-pop-up-form .token-bank li");
    $tokenValues.forEach(token => {
        const tokenName = uppercaseFirstLetterOfWord(token.classList[1]);
        returnObject[tokenName] = tokens[tokenName] - parseInt(token.querySelector(".gem-value").innerText);
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

function disableOrEnableGems() {
    const $ownTokens = document.querySelectorAll("#too-many-gems-pop-up-form .token-bank li");

    $ownTokens.forEach($ownToken => {
        if ($ownToken.querySelector(".gem-value").innerText === "0") {
            $ownToken.classList.remove("clickable");
            $ownToken.classList.add("disabled");
        } else {
            $ownToken.classList.add("clickable");
            $ownToken.classList.remove("disabled");
        }
    })
}

function checkIfReturnIsAllowed() {
    let totalRemainingTokens = 0;
    const $remainingTokensSelector = document.querySelectorAll("#too-many-gems-pop-up-form .token-bank .gem-value");

    $remainingTokensSelector.forEach(token => {
        totalRemainingTokens += parseInt(token.innerText);
    });

    document.querySelector("#too-many-gems-pop-up-form #gem-remover-button").disabled = totalRemainingTokens !== 10;
}

export {returnTokensBody, getDiffTokensObject, disableOrEnableGems, checkIfReturnIsAllowed};