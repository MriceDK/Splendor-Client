import * as handler from "./handler.js";
import {loadFromStorage} from "../../../data-connector/local-storage-abstractor.js";
import {uppercaseFirstLetterOfWord} from "../../../helper/utils.js";
import {isLegalToken} from "./helper.js";
import {removeChosenPopupToken} from "../../popup/too-much-gems-popup/handler.js";
import * as renderer from "./renderer.js";

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
    if (document.querySelector(".bank-buttons .cancel-button").classList.contains("hidden")) {
        setTokenMarketValues(gameInfo.unclaimedTokens);
    }
    disableTokens();

    handler.hookUpEvents();
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
        if (document.querySelector(".bank-buttons .cancel-button").classList.contains("hidden")) {
            document.querySelector(".bank-buttons .take-gems-button").classList.remove("hidden");
        }
    } else {
        document.querySelectorAll(".bank-buttons button").forEach($button => $button.classList.add("hidden"));
        renderer.removeChosenTokens();
    }
}

function setDisable(boolean) {
    const $tokenListItems = document.querySelectorAll(".token-bank .gem");

    $tokenListItems.forEach($tokenListItem => {
        if (!$tokenListItem.classList.contains("gold")) {
            if (boolean) {
                makeDisabled($tokenListItem);
            } else {
                makeClickable($tokenListItem);
            }
        } else {
            if (boolean) {
                $tokenListItem.classList.remove("disabled");
            } else {
                $tokenListItem.classList.add("disabled")
            }
        }
    })
}

function makeDisabled($target) {
    $target.classList.remove("clickable");
    $target.classList.add("disabled");
}

function makeClickable($target) {
    $target.classList.add("clickable");
    $target.classList.remove("disabled");
}

function enableTokens() {
    setDisable(false);
}

function disableTokens() {
    setDisable(true);
    removeTokenBorders();
}

function removeTokenBorders() {
    const $tokenBanks = document.querySelectorAll(".token-bank li");
    $tokenBanks.forEach($tokenBank => {
        $tokenBank.classList.remove("clickable");
        $tokenBank.classList.remove("disabled");
    });
}

function initializeZeroes() {
    const $gems = document.querySelectorAll(".token-bank .gem");
    $gems.forEach($gem => {
        const $value = $gem.querySelector(".gem-value");
        $value.innerText = 0;
    })
}

function setTokenMarketValues(unclaimedTokens) {
    initializeZeroes();
    Object.entries(unclaimedTokens).forEach(([token, amount]) => setTokenValue(token, amount));
}

function setTokenValue(token, amount) {
    if (token !== "Gold") {
        currentBankTokens[token] = amount;
    }

    document.querySelector(`.token-bank .gem.${token.toLowerCase()} .gem-value`).innerText = amount;
}

function getChosenTokenColour($tokenFromBank) {

    if ($tokenFromBank.classList.contains("ruby")) {
        showChosenBankToken("Ruby");
    } else if ($tokenFromBank.classList.contains("emerald")) {
        showChosenBankToken("Emerald");
    } else if ($tokenFromBank.classList.contains("onyx")) {
        showChosenBankToken("Onyx");
    } else if ($tokenFromBank.classList.contains("sapphire")) {
        showChosenBankToken("Sapphire");
    } else if ($tokenFromBank.classList.contains("diamond")) {
        showChosenBankToken("Diamond");
    }

}

function showChosenBankToken(gem, toMuchGemsPopup = false) {
    const $chosenToken = document.querySelector("#token").content.firstElementChild.cloneNode(true);

    $chosenToken.classList.add(`selected-${gem.toLowerCase()}-token`);
    $chosenToken.classList.add("clickable");
    $chosenToken.classList.add(gem.toLowerCase());
    $chosenToken.classList.add("gem");
    $chosenToken.querySelector("span").outerHTML = "";

    if (!toMuchGemsPopup) {
        $chosenToken.addEventListener("click", handler.removeChosenBankToken);
        document.querySelector(".bank-flexcontainer .selected-tokens").appendChild($chosenToken);
        updateToken(gem, true);
        chosenBankTokens[gem]++;
    } else {
        $chosenToken.addEventListener("click", removeChosenPopupToken);
        document.querySelector("#too-many-gems-pop-up-form .selected-tokens").appendChild($chosenToken);
    }

}

function enableOrDisableToken(token) {
    const $tokenButton = document.querySelector(`.token-bank .gem.${token.toLowerCase()}`);
    if (isLegalToken(token)) {
        $tokenButton.classList.add("clickable");
        $tokenButton.classList.remove("disabled");
    } else {
        $tokenButton.classList.remove("clickable");
        $tokenButton.classList.add("disabled");
    }
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
    document.querySelector(`.token-bank .gem.${gem.toLowerCase()} .gem-value`).innerHTML = currentBankTokens[gem];
}

function resetBankButtons(){
    const cancelBtn = document.querySelector(".bank-buttons .cancel-button");
    const takeBtn = document.querySelector(".bank-buttons .take-gems-button");
    const collectBtn = document.querySelector(".bank-buttons .collect-gems-button");

    cancelBtn.classList.add("hidden");
    cancelBtn.classList.remove("clickable");

    takeBtn.classList.remove("hidden");
    takeBtn.classList.add("clickable");

    collectBtn.classList.add("hidden");
    collectBtn.classList.remove("clickable");
}

export {
    renderTokenBank,
    changeButtons,
    enableTokens,
    disableTokens,
    removeChosenTokens,
    updateToken,
    getChosenTokenColour,
    enableOrDisableBank,
    enableOrDisableToken,
    toggleCollectGemsButton,
    chosenBankTokens,
    currentBankTokens,
    resetBankButtons,
    showChosenBankToken
};