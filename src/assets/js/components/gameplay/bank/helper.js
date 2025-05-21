import * as render from "./renderer.js";
import {currentBankTokens} from "./renderer.js";

function isLegalToken(token) {
    console.log(currentBankTokens);
    const numberOfChosenTokens = document.querySelectorAll(".selected-tokens button").length;

    if (render.currentBankTokens[token] !== 0) {
        if (checkMaxThreeTokens(numberOfChosenTokens)) {
            if (checkMaxTwoOfSameColour()) {
                if (checkMaxTwoOfSameColourWhenTwoSelected(numberOfChosenTokens, token)) {
                    return checkOnlyTwoOfSameColourWhenValueOfMinFour(token);
                }
            }
        }
    }

    return false;
}

function checkMaxThreeTokens(numberOfChosenTokens) {
    const maxChosenTokens = 3;

    return numberOfChosenTokens < maxChosenTokens;
}

function checkMaxTwoOfSameColour() {
    const maxChosenTokensSameColour = 2;

    return !Object.values(render.chosenBankTokens).includes(maxChosenTokensSameColour);
}

function checkMaxTwoOfSameColourWhenTwoSelected(numberOfChosenTokens, gem) {
    const maxChosenTokensSameColour = 2;
    return !(numberOfChosenTokens === maxChosenTokensSameColour && render.chosenBankTokens[gem] !== 0);
}

function checkOnlyTwoOfSameColourWhenValueOfMinFour(gem) {
    const minValueTwoOfSameColourAllowed = 4;
    const maxTokensOfAColourWhenColourValuesLessThanFour = 1;

    return !(render.chosenBankTokens[gem] + render.currentBankTokens[gem] < minValueTwoOfSameColourAllowed && render.chosenBankTokens[gem] === maxTokensOfAColourWhenColourValuesLessThanFour);
}

export { isLegalToken};