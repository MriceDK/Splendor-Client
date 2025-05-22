import * as Utils from "../../../helper/utils.js";

function getGemCostObject($form) {
    const $inputs = $form.querySelectorAll(".gem-selector-input");
    const obj = {};

    $inputs.forEach($input => {
        const gemName = Utils.uppercaseFirstLetterOfWord($input.name);
        if ($input.value > 0) {
            obj[gemName] = parseInt($input.value);
        } else {
            obj[gemName] = 0;
        }
    });
    return obj;
}

function createBuyCardBody(devCardName, gemCost) {
    return {
        development: {
            name: devCardName
        },
        payment: gemCost
    };
}

function createBuyReservedCardBody(gemCost) {
    return {
        payment: gemCost
    };
}

function calculatePossibleDevelopmentCost(devCardValue, token) {
    const ownTokenValue = parseInt(document.querySelector(`.own-inventory .${token} .gem-value`).innerHTML);
    const neededTokenValue = calculateNeededDevelopmentCost(devCardValue, token)

    if (ownTokenValue < neededTokenValue) {
        return ownTokenValue;
    } else {
        return neededTokenValue;
    }
}

function calculateNeededDevelopmentCost(devCardValue, token) {
    const tokenBonus = parseInt(document.querySelector(`.own-inventory .${token} .card-text`).innerHTML);

    if (tokenBonus >= devCardValue) {
        return 0;
    }

    return devCardValue - tokenBonus;
}

export {getGemCostObject, createBuyCardBody, createBuyReservedCardBody, calculatePossibleDevelopmentCost, calculateNeededDevelopmentCost};
