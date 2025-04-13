import * as renderer from "./renderer.js";
import * as api from "../../../API/api";
import {loadFromStorage} from "../../../data-connector/local-storage-abstractor";
import {checkTooManyTokens} from "../own-player-component/gems-overflow-component/handler";
import {renderOwnTokenValue} from "../own-player-component/renderer";

function hookUpEvents() {
    document.querySelector(".bank-buttons .take-gems-button").addEventListener("click", openBank);
    document.querySelector(".bank-buttons .cancel-button").addEventListener("click", closeBank);
    document.querySelector(".bank-buttons .collect-gems-button").addEventListener("click", collectTokens);
    document.querySelectorAll(".token-bank button").forEach(button => button.addEventListener("click", chooseBankToken));
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
    renderer.getChosenTokenColour(e);
    checkConfirmButton();
    checkAllowedTokens();
}

function removeChosenBankToken(e) {
    const className = e.target.classList[2];
    const classNameWithCapitalLetter = className.replace(className[0], className[0].toUpperCase());

    renderer.chosenBankTokens[classNameWithCapitalLetter]--;
    e.target.remove();

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

    api.updateTokens(gameId, playerName, tokenData).then(tokens => {
        checkTooManyTokens(tokens);
        Object.entries(tokens).forEach((token) => {
            renderOwnTokenValue(token);

        });

    });

    // TODO: Fix this implementation of the checkTooMuchGems function


    renderer.enableOrDisableBank(playerName);
    closeBank();
}

function checkConfirmButton() {
    const numberOfChosenTokens = document.querySelectorAll(".selected-tokens button").length;
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