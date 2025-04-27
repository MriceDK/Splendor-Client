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

export {getGemCostObject, createBuyCardBody, createBuyReservedCardBody};
