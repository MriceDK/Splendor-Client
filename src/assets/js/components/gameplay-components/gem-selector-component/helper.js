import * as Utils from "../../../helper/utils";

function getGemCostObject($form) {
    const $inputs = $form.querySelectorAll(".gem-selector-input");
    const obj = {};

    $inputs.forEach($input => {
        const gemName = Utils.uppercaseFirstLetterOfWord($input.name);

        obj[gemName] = parseInt($input.value);
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
