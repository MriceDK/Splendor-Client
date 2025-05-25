import * as renderer from "./renderer.js";
import * as api from "../../../api/gameplay-api.js";
import {loadFromStorage} from "../../../data-connector/local-storage-abstractor.js";

import {renderOwnTokenValue} from "../own-player/renderer.js";
import {displayGame} from "../../../game.js";
import {immediateTokenCheckAfterTokenUpdate} from "../../popup/too-much-gems-popup/handler.js";
import {getGameInfo} from "../../../api/game-setup-api.js";

function hookUpEvents() {
    document.querySelector(".bank-buttons .take-gems-button").addEventListener("click", openBank);
    document.querySelector(".bank-buttons .cancel-button").addEventListener("click", closeBank);
    document.querySelector(".bank-buttons .collect-gems-button").addEventListener("click", collectTokens);
    document.querySelectorAll(".bank-flexcontainer .token-bank li").forEach(li => li.addEventListener("click", chooseBankToken));
}

function openBank() {
    renderer.changeButtons();
    renderer.enableTokens();
    checkAllowedTokens();
}

function closeBank() {
    renderer.changeButtons();
    renderer.removeChosenTokens();
    checkConfirmButton();
    checkAllowedTokens();
    renderer.disableTokens();
}

function chooseBankToken(e) {
    const $tokenFromBank = e.target.closest(".gem");

    if ($tokenFromBank.classList.contains("clickable")) {
        renderer.getChosenTokenColour($tokenFromBank);
        checkConfirmButton();
        checkAllowedTokens();
    }

}

function removeChosenBankToken(e) {
    const $target = e.target.closest(".gem");
    const className = $target.classList[3];

    const classNameWithCapitalLetter = className.replace(className[0], className[0].toUpperCase());

    renderer.chosenBankTokens[classNameWithCapitalLetter]--;
    $target.remove();

    renderer.updateToken(classNameWithCapitalLetter, false);
    checkConfirmButton();
    checkAllowedTokens();
}

function collectTokens() {
    const gameId = loadFromStorage("gameId");
    const playerName = loadFromStorage("playerName");
    const tokenData = {
        "take": renderer.chosenBankTokens
    };

    api.updateTokens(gameId, playerName, tokenData).then(res => {

        Object.entries(res.tokens).forEach((token) => {
            renderOwnTokenValue(token);
        });
    }).then(() => {
        displayGame();
        renderer.resetBankButtons();
    });



    renderer.enableOrDisableBank(playerName);
    closeBank();
}

function checkConfirmButton() {
    const numberOfChosenTokens = document.querySelectorAll(".selected-tokens li").length;

    const maxTokensOfDiffColour = 3;

    if (numberOfChosenTokens === maxTokensOfDiffColour || Object.values(renderer.chosenBankTokens).includes(2)) {
        renderer.toggleCollectGemsButton(false);
    } else {
        renderer.toggleCollectGemsButton(true);
    }
}

function checkAllowedTokens() {
    Object.keys(renderer.currentBankTokens).forEach((token) => renderer.enableOrDisableToken(token));
}


export {openBank, closeBank, chooseBankToken, removeChosenBankToken, hookUpEvents};