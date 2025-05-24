import * as helper from "./helper.js";
import * as ErrorHandler from "../../../data-connector/error-handler.js";
import * as API from "../../../api/gameplay-api.js";

import {closePopUp} from "../confirmation-popup/renderer.js";
import {renderOwnTokenValue} from "../../gameplay/own-player/renderer.js";
import {displayGame} from "../../../game.js";
import {resetBankButtons} from "../../gameplay/bank/renderer.js";
import {checkIfPaymentIsCorrect} from "./helper.js";

function getDevelopment(e, reserved) {
    e.preventDefault();

    const $form = document.querySelector("#token-selector-form");

    const devCardName = $form.querySelector("#token-selector-dev-card").value;
    const devCard = document.querySelector(`article.development-card[data-card-name="${devCardName}"]`);
    const gemCost = helper.getGemCostObject($form);
    const body = helper.createBuyCardBody(devCardName, gemCost);

    if (checkIfPaymentIsCorrect(devCard, gemCost)) {
        if (reserved) {
            buyReservedDevelopmentCard(body, devCardName);
        } else {
            buyDevelopmentCard(body)
        }
    }
}

function buyDevelopmentCard(body) {
    API.buyDevelopmentCardRequest(body).then(buyResponse => {
        closePopUp();
        Object.entries(buyResponse.tokens).forEach((token) => {
            renderOwnTokenValue(token);
        });
        immediateNobleCheckAfterBuy();
    }).then(() => {
        displayGame();
        resetBankButtons();
    }).catch(err => {
        ErrorHandler.handleError(err);

    });
}

function buyReservedDevelopmentCard(body, devCardName) {
    API.buyReservedCard(devCardName, body).then(buyResponse => {
        closePopUp();
        Object.entries(buyResponse.tokens).forEach((token) => {
            renderOwnTokenValue(token);
        });
        immediateNobleCheckAfterBuy();
    }).then(() => {
        displayGame();
        resetBankButtons();
    }).catch(err => {
        ErrorHandler.handleError(err);
    });
}

function checkIfPaymentIsValidForConfirm() {
    const $form = document.querySelector("#token-selector-form");
    const $confirmButton = document.querySelector("#token-selector-form .button-row input");

    const devCardName = $form.querySelector("#token-selector-dev-card").value;
    const devCard = document.querySelector(`article.development-card[data-card-name="${devCardName}"]`);
    const gemCost = helper.getGemCostObject($form);

    $confirmButton.disabled = !checkIfPaymentIsCorrect(devCard, gemCost);
}

export {getDevelopment, checkIfPaymentIsValidForConfirm};