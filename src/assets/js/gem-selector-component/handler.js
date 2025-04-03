import * as Utils from "../helper/utils.js";
import * as ErrorHandler from "../data-connector/error-handler.js";
import {buyDevelopmentCardRequest} from "../API/api.js";

function buyDevelopmentCard(e) {
    e.preventDefault();

    const $form = document.querySelector("#token-selector-form");

    const devCardName = $form.querySelector("#token-selector-dev-card").value;
    const gemCost = getGemCostObject($form);

    const body = createBody(devCardName, gemCost);
    buyDevelopmentCardRequest(body).then(() => {
        Utils.hidePopupContainer();
    })
        .catch(err => {
            Utils.hidePopupContainer();
            ErrorHandler.handleError(err);
        });
}

function createBody(devCardName, gemCost) {
    return {
        development: {
            name: devCardName
        },
        payment: gemCost
    };
}

function getGemCostObject($form) {
    const $inputs = $form.querySelectorAll(".gem-selector-input");
    const obj = {};

    $inputs.forEach($input => {
        const gemName = Utils.UppercaseFirstLetterOfWord($input.name);

        obj[gemName] = parseInt($input.value);
    })

    return obj;
}

export { buyDevelopmentCard };