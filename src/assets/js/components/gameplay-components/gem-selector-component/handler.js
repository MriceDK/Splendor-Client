import * as helper from "./helper.js";
import * as ErrorHandler from "../../../data-connector/error-handler.js";
import * as API from "../../../api/gameplay-api.js";

import {getCurrentPlayer} from "../../../helper/utils.js";
import {closePopUp} from "../confirmation-popup-component/renderer.js";
// import {checkTooManyTokens} from "../own-player-component/gems-overflow-component/handler.js";
import {renderOwnTokenValue} from "../own-player-component/renderer.js";
import {nobleCheck} from "../market-component/handler.js";
import {getGameInfo} from "../../../api/game-setup-api.js";

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
    const gemCost = helper.getGemCostObject($form);

    const body = helper.createBuyCardBody(devCardName, gemCost);
    API.buyDevelopmentCardRequest(body).then(buyResponse => {
        closePopUp();
        //checkTooManyTokens(buyResponse.tokens); TODO deze functie werkt nog niet optimaal
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
    const gemCost = helper.getGemCostObject($form);

    const body = helper.createBuyReservedCardBody(gemCost);
    API.buyReservedCard(devCardName, body).then(() => {
        closePopUp();
        //checkTooManyTokens(tokens); Deze functie werkt nogn iet optimaal
        Object.entries(tokens).forEach((token) => {
            renderOwnTokenValue(token);
        });

        immediateNobleCheckAfterBuy();

    }).catch(err => {
        ErrorHandler.handleError(err);
    });
    // TODO: Fix this implementation of the checkTooMuchGems function
}

function hookupEventListeners(reservedCard) {
    if (reservedCard) {
        document.querySelector("#token-selector-form").addEventListener("submit", buyReservedDevelopmentCard);

    } else if (!reservedCard) {
        document.querySelector("#token-selector-form").addEventListener("submit", buyDevelopmentCard);
    }
    document.querySelector("#token-selector-close-button").addEventListener("click", closePopUp);
}

export {buyDevelopmentCard, buyReservedDevelopmentCard, hookupEventListeners};