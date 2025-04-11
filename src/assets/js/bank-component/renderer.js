import * as handler from "./handler.js";
import {loadFromStorage} from "../data-connector/local-storage-abstractor.js";
import * as APIAbstractor from "../data-connector/api-communication-abstractor.js";
import {uppercaseFirstLetterOfWord} from "../helper/utils.js";
import {checkTooMuchGems} from "../own-player-component/gems-overflow-component/handler.js";
import {renderOwnTokenValue} from "../own-player-component/renderer.js";

const chosenBankTokens = {
    Ruby: 0,
    Emerald: 0,
    Onyx: 0,
    Sapphire: 0,
    Diamond: 0,
};
const currentBankTokens = {
    Ruby: 0,
    Emerald: 0,
    Onyx: 0,
    Sapphire: 0,
    Diamond: 0,
};

function renderTokenBank(gameInfo) {
    enableOrDisableBank(gameInfo.currentPlayer);
    disableTokens();
    setTokenMarketValues(gameInfo);

    hoopUpEvents();
}

function hoopUpEvents() {
    document.querySelector(".bank-buttons .take-gems-button").addEventListener("click", handler.openBank);
    document.querySelector(".bank-buttons .cancel-button").addEventListener("click", handler.closeBank);
    document.querySelector(".bank-buttons .collect-gems-button").addEventListener("click", collectTokens);
    document.querySelectorAll(".token-bank button").forEach(button => button.addEventListener("click", handler.chooseBankToken));
}

function changeButtons() {
    document.querySelector(".bank-buttons .cancel-button").classList.toggle("hidden");
    document.querySelector(".bank-buttons .cancel-button").classList.toggle("clickable");
    document.querySelector(".bank-buttons .take-gems-button").classList.toggle("hidden");
    document.querySelector(".bank-buttons .take-gems-button").classList.toggle("clickable");
    document.querySelector(".bank-buttons .collect-gems-button").classList.toggle("hidden");
}

function toggleCollectGemsButton(boolean) {
    document.querySelector(".bank-buttons .collect-gems-button").disabled = boolean;

    if (boolean) {
        document.querySelector(".bank-buttons .collect-gems-button").classList.remove("clickable");
    } else {
        document.querySelector(".bank-buttons .collect-gems-button").classList.add("clickable");
    }
}

function enableOrDisableBank(playerName) {
    if (playerName === loadFromStorage("playerName")) {
        document.querySelector(".bank-buttons .take-gems-button").classList.remove("hidden");
    } else {
        document.querySelector(".bank-buttons .take-gems-button").classList.add("hidden");
    }
}

function setDisable(boolean) {
    document.querySelector(".token-bank .ruby").disabled = boolean;
    document.querySelector(".token-bank .emerald").disabled = boolean;
    document.querySelector(".token-bank .onyx").disabled = boolean;
    document.querySelector(".token-bank .sapphire").disabled = boolean;
    document.querySelector(".token-bank .diamond").disabled = boolean;
}

function enableTokens() {
    setDisable(false);
}

function disableTokens() {
    setDisable(true);
    removeTokenBorders();
}

function removeTokenBorders() {
    const $tokenBanks = document.querySelectorAll(".token-bank button");
    $tokenBanks.forEach($tokenBank => {
        $tokenBank.classList.remove("clickable");
    });
}

function setTokenMarketValues(gameInfo) {
    Object.entries(gameInfo.unclaimedTokens).forEach(([token, amount]) => setTokenValue(token, amount));
}

function setTokenValue(token, amount) {
    if (token !== "Gold") {
        currentBankTokens[token] = amount;
    }

    document.querySelector(`.token-bank .${token.toLowerCase()} `).innerText = amount;
}

function collectTokens() {
    const gameId = loadFromStorage("gameId");
    const playerName = loadFromStorage("playerName");
    const tokenData = {
        "take": chosenBankTokens
    };

    APIAbstractor.fetchFromServer(`/games/${gameId}/players/${playerName}/tokens`, "PATCH", tokenData).then(tokens => {
        checkTooMuchGems(tokens);
        Object.entries(tokens).forEach((token) => {
            renderOwnTokenValue(token);

        });

    });

    // TODO: Fix this implementation of the checkTooMuchGems function


    enableOrDisableBank(playerName);
    handler.closeBank();
}

function getChosenTokenColour(e) {
    if (e.target.classList.contains("ruby")) {
        showChosenBankToken("Ruby");
    } else if (e.target.classList.contains("emerald")) {
        showChosenBankToken("Emerald");
    } else if (e.target.classList.contains("onyx")) {
        showChosenBankToken("Onyx");
    } else if (e.target.classList.contains("sapphire")) {
        showChosenBankToken("Sapphire");
    } else if (e.target.classList.contains("diamond")) {
        showChosenBankToken("Diamond");
    }
}

function showChosenBankToken(gem) {
    updateToken(gem, true);
    const chosenToken = document.createElement("button");
    chosenToken.classList.add(`selected-${gem.toLowerCase()}-token`);
    chosenToken.classList.add("clickable");
    chosenToken.classList.add(gem.toLowerCase());
    chosenToken.addEventListener("click", handler.removeChosenBankToken);
    document.querySelector(".selected-tokens").appendChild(chosenToken);
    chosenBankTokens[gem]++;
}

function checkConfirmButton() {
    const numberOfChosenTokens = document.querySelectorAll(".selected-tokens button").length;

    if (numberOfChosenTokens === 3 || Object.values(chosenBankTokens).includes(2)) {
        toggleCollectGemsButton(false);
    } else {
        toggleCollectGemsButton(true);
    }
}

function checkAllowedTokens() {
    Object.keys(currentBankTokens).forEach((token) => enableOrDisableToken(token));
}

function enableOrDisableToken(token) {
    const $tokenButton = document.querySelector(`.token-bank .${token.toLowerCase()} `);
    if (isLegalToken(token)) {
        $tokenButton.disabled = false;
        $tokenButton.classList.add("clickable");
    } else {
        $tokenButton.disabled = true;
        $tokenButton.classList.remove("clickable");
    }
}

function isLegalToken(token) {
    const numberOfChosenTokens = document.querySelectorAll(".selected-tokens button").length;

    if (currentBankTokens[token] !== 0) {
        if (checkMaxThreeTokens(numberOfChosenTokens)) {
            if (checkMaxTwoOfSameColour()) {
                if (checkMaxTwoOfSameColourWhenTwoSelected(numberOfChosenTokens, token)) {
                    return checkOnlyTwoOfSameColourWhenValueOfMinFour(token);
                }
            }
        }
    }

    return false;
}

function checkMaxThreeTokens(numberOfChosenTokens) {
    const maxChosenTokens = 3;

    return numberOfChosenTokens < maxChosenTokens;
}

function checkMaxTwoOfSameColour() {
    const maxChosenTokensSameColour = 2;

    return !Object.values(chosenBankTokens).includes(maxChosenTokensSameColour);
}

function checkMaxTwoOfSameColourWhenTwoSelected(numberOfChosenTokens, gem) {
    return !(numberOfChosenTokens === 2 && chosenBankTokens[gem] !== 0);
}

function checkOnlyTwoOfSameColourWhenValueOfMinFour(gem) {
    const minValueTwoOfSameColourAllowed = 4;
    const maxTokensOfAColourWhenColourValuesLessThanFour = 1;

    return !(chosenBankTokens[gem] + currentBankTokens[gem] < minValueTwoOfSameColourAllowed && chosenBankTokens[gem] === maxTokensOfAColourWhenColourValuesLessThanFour);
}

function removeChosenTokens() {
    document.querySelector(".selected-tokens").innerHTML = "";
    for (const [key, value] of Object.entries(chosenBankTokens)) {
        for (let i = 0; i < value; i++) {
            const uppercasedKey = uppercaseFirstLetterOfWord(key);
            updateToken(uppercasedKey, false);
        }
    }

    Object.keys(chosenBankTokens).forEach(gem => chosenBankTokens[gem] = 0);
}

function updateToken(gem, remove) {
    if (remove) {
        currentBankTokens[gem]--;
    } else {
        currentBankTokens[gem]++;
    }
    document.querySelector(`.token-bank .${gem.toLowerCase()} `).innerHTML = currentBankTokens[gem];
}

export {
    renderTokenBank,
    changeButtons,
    enableTokens,
    disableTokens,
    getChosenTokenColour,
    removeChosenTokens,
    setTokenMarketValues,
    updateToken,
    checkConfirmButton,
    checkAllowedTokens,
    chosenBankTokens
};