import * as Utils from "../helper/utils.js";
import * as ErrorHandler from "../data-connector/error-handler.js";
import * as API from "../API/api.js";
import {closePopUp} from "../confirmation-popup-component/renderer.js";
import {checkTooManyTokens} from "../own-player-component/gems-overflow-component/handler.js";
import {renderOwnTokenValue} from "../own-player-component/renderer.js";
import { getCurrentPlayer } from "../helper/utils.js";
import { nobleCheck } from "../market-component/handler.js";

function immediateNobleCheckAfterBuy(){
    API.getGameInfo().then(res => {

        const currentPlayer = getCurrentPlayer(res.players, res.currentPlayer);
        nobleCheck(res.pickNobleRequired, res.unclaimedNobles, currentPlayer);
    }
    );
}

function buyDevelopmentCard(e) {
    e.preventDefault();

    const $form = document.querySelector("#token-selector-form");

    const devCardName = $form.querySelector("#token-selector-dev-card").value;
    const gemCost = getGemCostObject($form);

    const body = createBuyCardBody(devCardName, gemCost);
    API.buyDevelopmentCardRequest(body).then(buyResponse => {
        closePopUp();
        checkTooManyTokens(buyResponse.tokens);
        Object.entries(buyResponse.tokens).forEach((token) => {
            renderOwnTokenValue(token);
        });

        immediateNobleCheckAfterBuy();



    }).catch(err => {
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
        checkTooManyTokens(tokens);
        Object.entries(tokens).forEach((token) => {
            renderOwnTokenValue(token);
        });

        immediateNobleCheckAfterBuy();

    }).catch(err => {
        ErrorHandler.handleError(err);
    });
    // TODO: Fix this implementation of the checkTooMuchGems function
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
        const gemName = Utils.uppercaseFirstLetterOfWord($input.name);

        obj[gemName] = parseInt($input.value);
    });

    return obj;
}

export {buyDevelopmentCard, buyReservedDevelopmentCard};