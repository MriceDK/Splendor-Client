import * as helper from "./helper.js";
import * as ErrorHandler from "../../../data-connector/error-handler.js";
import * as API from "../../../api/gameplay-api.js";
import {closePopUp} from "../confirmation-popup/renderer.js";
import {renderOwnTokenValue} from "../../gameplay/own-player/renderer.js";
import {displayGame} from "../../../game.js";

function buyDevelopmentCard(e) {
    e.preventDefault();

    const $form = document.querySelector("#token-selector-form");

    const devCardName = $form.querySelector("#token-selector-dev-card").value;
    const gemCost = helper.getGemCostObject($form);
    const body = helper.createBuyCardBody(devCardName, gemCost);
    API.buyDevelopmentCardRequest(body).then(buyResponse => {
        closePopUp();
        Object.entries(buyResponse.tokens).forEach((token) => {
            renderOwnTokenValue(token);
        });
    }).then(() => {
        displayGame();
    }).catch(err => {
        ErrorHandler.handleError(err);
     
    });

}

function buyReservedDevelopmentCard(e) {
    e.preventDefault();

    const $form = document.querySelector("#token-selector-form");

    const devCardName = $form.querySelector("#token-selector-dev-card").value;
    const gemCost = helper.getGemCostObject($form);

    const body = helper.createBuyReservedCardBody(gemCost);
    API.buyReservedCard(devCardName, body).then(buyResponse => {
        closePopUp();
        Object.entries(buyResponse.tokens).forEach((token) => {
            renderOwnTokenValue(token);
        });
    }).then(() => {
        displayGame();
    }).catch(err => {
        ErrorHandler.handleError(err);
    });
}

export {buyDevelopmentCard, buyReservedDevelopmentCard};