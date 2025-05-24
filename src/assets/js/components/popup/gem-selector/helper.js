import * as Utils from "../../../helper/utils.js";
import {getCostFromDevelopmentCard} from "./renderer.js";

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
    const ownTokenValue = parseInt(document.querySelector(`.own-inventory .${token} .gem-value`).innerText);
    const neededTokenValue = calculateNeededDevelopmentCost(devCardValue, token)

    if (ownTokenValue < neededTokenValue) {
        return ownTokenValue;
    } else {
        return neededTokenValue;
    }
}

function calculateNeededDevelopmentCost(devCardValue, token) {
    const tokenBonus = parseInt(document.querySelector(`.own-inventory .${token} .card-text`).innerText);

    if (tokenBonus >= devCardValue) {
        return 0;
    }

    return devCardValue - tokenBonus;
}

function checkIfPaymentIsCorrect($devCard, payment) {
    const developmentCost = getCostFromDevelopmentCard($devCard);
    let totalCost = calculateTotalGemCost(developmentCost);

    Object.entries(developmentCost).forEach(([key, value]) => {
        const tokenName = key.replace(key[0], key[0].toUpperCase());
        const usedBonuses = developmentCost[key] - calculateNeededDevelopmentCost(developmentCost[key], key);

        if (payment[tokenName] > value) {
            return false;
        }
        totalCost -= payment[tokenName];
        totalCost -= usedBonuses;
    });

    return totalCost === payment["Gold"];
}

function calculateTotalGemCost(developmentCost) {
    let totalGemCost = 0;

    Object.values(developmentCost).forEach((value) => {
        totalGemCost += parseInt(value);
    });

    return totalGemCost;
}

export {getGemCostObject, createBuyCardBody, createBuyReservedCardBody, calculatePossibleDevelopmentCost, calculateNeededDevelopmentCost, checkIfPaymentIsCorrect};
