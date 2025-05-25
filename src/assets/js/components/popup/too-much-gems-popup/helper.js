import {uppercaseFirstLetterOfWord} from "../../../helper/utils.js";

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

export {returnTokensBody, getDiffTokensObject, disableOrEnableGems}