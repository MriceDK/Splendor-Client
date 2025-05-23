import * as helper from "./helper.js";
import * as ErrorHandler from "../../../data-connector/error-handler.js";
import * as API from "../../../api/gameplay-api.js";

import {getCurrentPlayer} from "../../../helper/utils.js";
import {closePopUp} from "../confirmation-popup/renderer.js";
import {renderOwnTokenValue} from "../../gameplay/own-player/renderer.js";
import {nobleCheck} from "../../gameplay/market/handler.js";
import {getGameInfo} from "../../../api/game-setup-api.js";
import {displayGame} from "../../../game.js";
import {resetBankButtons} from "../../gameplay/bank/renderer.js";
import {checkIfPaymentIsCorrect} from "./helper.js";

function immediateNobleCheckAfterBuy(){
    getGameInfo().then(res => {

        const currentPlayer = getCurrentPlayer(res.players, res.currentPlayer);
        nobleCheck(res.pickNobleRequired, res.unclaimedNobles, currentPlayer);
    }
    );
}

function buyDevelopmentCard(e) {
    e.preventDefault();

    const $form = document.querySelector("#token-selector-form");

    const devCardName = $form.querySelector("#token-selector-dev-card").value;
    const devCard = document.querySelector(`article.development-card[data-card-name="${devCardName}"]`);
    const gemCost = helper.getGemCostObject($form);
    const body = helper.createBuyCardBody(devCardName, gemCost);

    if (checkIfPaymentIsCorrect(devCard, gemCost)) {
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
}

function buyReservedDevelopmentCard(e) {
    e.preventDefault();

    const $form = document.querySelector("#token-selector-form");

    const devCardName = $form.querySelector("#token-selector-dev-card").value;
    const devCard = document.querySelector(`article.development-card[data-card-name="${devCardName}"]`);
    const gemCost = helper.getGemCostObject($form);
    const body = helper.createBuyReservedCardBody(gemCost);

    if (checkIfPaymentIsCorrect(devCard, gemCost)) {
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
}

function checkIfPaymentIsValidForConfirm() {
    const $form = document.querySelector("#token-selector-form");
    const $confirmButton = document.querySelector("#token-selector-form .button-row input");

    const devCardName = $form.querySelector("#token-selector-dev-card").value;
    const devCard = document.querySelector(`article.development-card[data-card-name="${devCardName}"]`);
    const gemCost = helper.getGemCostObject($form);

    $confirmButton.disabled = !checkIfPaymentIsCorrect(devCard, gemCost);
}

export {buyDevelopmentCard, buyReservedDevelopmentCard, checkIfPaymentIsValidForConfirm};