import * as Utils from "../helper/utils.js";
import * as ErrorHandler from "../data-connector/error-handler.js";
import * as API from "../API/api.js";
import {closePopUp} from "../confirmation-popup-component/renderer.js";

function buyDevelopmentCard(e) {
    e.preventDefault();

    const $form = document.querySelector("#token-selector-form");

    const devCardName = $form.querySelector("#token-selector-dev-card").value;
    const gemCost = getGemCostObject($form);

    const body = createBuyCardBody(devCardName, gemCost);
    API.buyDevelopmentCardRequest(body).then(() => {
        closePopUp();
    })
        .catch(err => {
            ErrorHandler.handleError(err);
        });
}

function buyReservedDevelopmentCard(e) {
    e.preventDefault();

    const $form = document.querySelector("#token-selector-form");

    const devCardName = $form.querySelector("#token-selector-dev-card").value;
    const gemCost = getGemCostObject($form);

    const body = createBuyReservedCardBody(gemCost);
    API.buyReservedCard(devCardName, body).then(() => {
        closePopUp();
    })
        .catch(err => {
            ErrorHandler.handleError(err);
        });
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

function getGemCostObject($form) {
    const $inputs = $form.querySelectorAll(".gem-selector-input");
    const obj = {};

    $inputs.forEach($input => {
        const gemName = Utils.UppercaseFirstLetterOfWord($input.name);

        obj[gemName] = parseInt($input.value);
    })

    return obj;
}

export { buyDevelopmentCard, buyReservedDevelopmentCard };